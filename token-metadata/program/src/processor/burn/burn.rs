use super::*;

use crate::{
    processor::burn::{fungible::burn_fungible, nonfungible_edition::burn_nonfungible_edition},
    state::{AuthorityRequest, AuthorityType, TokenDelegateRole, TokenRecord, TokenState},
    utils::{check_token_standard, thaw},
};

/// Burn an asset, closing associated accounts.
///
/// Supports burning the following asset types:
/// - ProgrammableNonFungible
/// - NonFungible
/// - NonFungigbleEdition
/// - Fungible
/// - FungibleAsset
///
/// Parent accounts only required for burning print editions are the accounts for the master edition
/// associated with the print edition.
/// The Token Record account is required for burning a ProgrammableNonFungible asset.
///
/// This handler closes the following accounts:
///
/// For ProgrammableNonFungible assets:
/// - Metadata, Edition, Token, TokenRecord
///
/// For NonFungible assets:
/// - Metadata, Edition, Token
///
/// For NonFungibleEdition assets:
/// - Metadata, Edition, Token, and the EditionMarker, if all prints for it are burned.
///
/// For Fungible assets:
/// - Only the token account, if all tokens are burned.
pub fn burn<'a>(
    program_id: &Pubkey,
    accounts: &'a [AccountInfo<'a>],
    args: BurnArgs,
) -> ProgramResult {
    let context = Burn::to_context(accounts)?;

    match args {
        BurnArgs::V1 { .. } => burn_v1(program_id, context, args),
    }
}

// V1 implementation of the burn instruction.
fn burn_v1(program_id: &Pubkey, ctx: Context<Burn>, args: BurnArgs) -> ProgramResult {
    msg!("Burn V1");
    let BurnArgs::V1 { amount } = args;

    // Validate accounts

    // Assert signer
    assert_signer(ctx.accounts.authority_info)?;

    // Assert program ownership.
    assert_owned_by(ctx.accounts.metadata_info, program_id)?;
    assert_owned_by(ctx.accounts.mint_info, &safe_token::ID)?;
    assert_owned_by(ctx.accounts.token_info, &safe_token::ID)?;

    if let Some(edition_info) = ctx.accounts.edition_info {
        assert_owned_by(edition_info, program_id)?;
    }
    if let Some(master_edition) = ctx.accounts.master_edition_info {
        assert_owned_by(master_edition, program_id)?;
    }
    if let Some(master_edition_mint) = ctx.accounts.master_edition_mint_info {
        assert_owned_by(master_edition_mint, &safe_token::ID)?;
    }
    if let Some(master_edition_token) = ctx.accounts.master_edition_token_info {
        assert_owned_by(master_edition_token, &safe_token::ID)?;
    }
    if let Some(edition_marker) = ctx.accounts.edition_marker_info {
        assert_owned_by(edition_marker, program_id)?;
    }
    if let Some(token_record) = ctx.accounts.token_record_info {
        assert_owned_by(token_record, program_id)?;
    }

    // Check program IDs.
    if ctx.accounts.system_program_info.key != &system_program::ID {
        return Err(ProgramError::IncorrectProgramId);
    }

    if ctx.accounts.sysvar_instructions_info.key != &sysvar::instructions::ID {
        return Err(ProgramError::IncorrectProgramId);
    }

    if ctx.accounts.safe_token_program_info.key != &safe_token::ID {
        return Err(ProgramError::IncorrectProgramId);
    }

    // Deserialize accounts.
    let metadata = Metadata::from_account_info(ctx.accounts.metadata_info)?;
    let token: TokenAccount = assert_initialized(ctx.accounts.token_info)?;

    let authority_response = AuthorityType::get_authority_type(AuthorityRequest {
        authority: ctx.accounts.authority_info.key,
        update_authority: &metadata.update_authority,
        mint: ctx.accounts.mint_info.key,
        token: Some(ctx.accounts.token_info.key),
        token_account: Some(&token),
        token_record_info: ctx.accounts.token_record_info,
        token_delegate_roles: vec![TokenDelegateRole::Utility],
        precedence: &[AuthorityType::Holder, AuthorityType::TokenDelegate],
        ..Default::default()
    })?;

    // Must be either the holder or a token delegate.
    if !matches!(
        authority_response.authority_type,
        AuthorityType::Holder | AuthorityType::TokenDelegate
    ) {
        return Err(MetadataError::InvalidAuthorityType.into());
    }

    // Validate relationships between accounts.

    // Mint account passed in matches the mint of the token account.
    if &token.mint != ctx.accounts.mint_info.key {
        return Err(MetadataError::MintMismatch.into());
    }

    // Token account must have sufficient balance for burn.
    if token.amount < amount {
        return Err(MetadataError::InsufficientTokenBalance.into());
    }

    // Metadata account must match the mint.
    if token.mint != metadata.mint {
        return Err(MetadataError::MintMismatch.into());
    }

    let token_standard = if let Some(token_standard) = metadata.token_standard {
        token_standard
    } else {
        check_token_standard(ctx.accounts.mint_info, ctx.accounts.edition_info)?
    };

    // NonFungible types can only burn one item and must have the edition
    // account present.
    if matches!(
        token_standard,
        TokenStandard::NonFungibleEdition
            | TokenStandard::NonFungible
            | TokenStandard::ProgrammableNonFungible
    ) {
        if amount != 1 {
            return Err(MetadataError::InvalidAmount.into());
        }

        if ctx.accounts.edition_info.is_none() {
            return Err(MetadataError::MissingEdition.into());
        }
    } else if amount < 1 {
        return Err(MetadataError::InvalidAmount.into());
    }

    match token_standard {
        TokenStandard::NonFungible => {
            let args = BurnNonFungibleArgs { metadata };

            burn_nonfungible(&ctx, args)?;
        }
        TokenStandard::NonFungibleEdition => {
            burn_nonfungible_edition(&ctx)?;
        }
        TokenStandard::ProgrammableNonFungible => {
            // All the checks are the same as burning a NonFungible token
            // except we also have to check the token state.
            let token_record = ctx
                .accounts
                .token_record_info
                .ok_or_else(|| MetadataError::MissingTokenRecord.into())
                .and_then(TokenRecord::from_account_info)?;

            // Locked and Listed states cannot be burned.
            if token_record.state != TokenState::Unlocked {
                return Err(MetadataError::IncorrectTokenState.into());
            }

            thaw(
                ctx.accounts.mint_info.clone(),
                ctx.accounts.token_info.clone(),
                ctx.accounts.edition_info.unwrap().clone(),
                ctx.accounts.safe_token_program_info.clone(),
            )?;

            let args = BurnNonFungibleArgs { metadata };

            burn_nonfungible(&ctx, args)?;

            // Also close the token_record account.
            close_program_account(
                &ctx.accounts.token_record_info.unwrap().clone(),
                &ctx.accounts.authority_info.clone(),
            )?;
        }
        TokenStandard::Fungible | TokenStandard::FungibleAsset => {
            burn_fungible(&ctx, amount)?;
        }
    }

    Ok(())
}
