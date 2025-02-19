use super::{create_mint, create_token_account, ExternalPrice, Metadata};
use lpl_token_vault::{instruction, state::PREFIX};
use solana_program::{pubkey::Pubkey, system_instruction};
use solana_program_test::*;
use safecoin_sdk::{
    signature::{Keypair, Signer},
    transaction::Transaction,
    transport,
};

pub struct Vault {
    pub keypair: Keypair,
    pub mint: Keypair,
    pub redeem_treasury: Keypair,
    pub fraction_treasury: Keypair,
}

impl Default for Vault {
    fn default() -> Self {
        Self::new()
    }
}

impl Vault {
    pub fn new() -> Self {
        Vault {
            keypair: Keypair::new(),
            mint: Keypair::new(),
            redeem_treasury: Keypair::new(),
            fraction_treasury: Keypair::new(),
        }
    }

    pub async fn add_token_to_inactive_vault(
        &self,
        context: &mut ProgramTestContext,
        amount: u64,
        metadata: &Metadata,
    ) -> transport::Result<(Pubkey, Pubkey)> {
        let vault_pubkey = self.keypair.pubkey();
        let metaplex_token_vault_id = lpl_token_vault::id();

        let store = Keypair::new();
        let token_mint_pubkey = metadata.mint.pubkey();

        let seeds = &[
            PREFIX.as_bytes(),
            vault_pubkey.as_ref(),
            token_mint_pubkey.as_ref(),
        ];
        let (safety_deposit_box, _) = Pubkey::find_program_address(seeds, &metaplex_token_vault_id);
        let seeds = &[
            PREFIX.as_bytes(),
            metaplex_token_vault_id.as_ref(),
            vault_pubkey.as_ref(),
        ];
        let (authority, _) = Pubkey::find_program_address(seeds, &metaplex_token_vault_id);
        create_token_account(context, &store, &token_mint_pubkey, &authority).await?;

        let tx = Transaction::new_signed_with_payer(
            &[instruction::create_add_token_to_inactive_vault_instruction(
                lpl_token_vault::id(),
                safety_deposit_box,
                metadata.token.pubkey(),
                store.pubkey(),
                self.keypair.pubkey(),
                context.payer.pubkey(),
                context.payer.pubkey(),
                context.payer.pubkey(),
                amount,
            )],
            Some(&context.payer.pubkey()),
            &[&context.payer, &context.payer, &context.payer],
            context.last_blockhash,
        );
        context.banks_client.process_transaction(tx).await?;

        Ok((safety_deposit_box, store.pubkey()))
    }

    pub async fn activate(
        &self,
        context: &mut ProgramTestContext,
        number_of_shares: u64,
    ) -> Result<(), BanksClientError> {
        let metaplex_token_vault_id = lpl_token_vault::id();
        let vault_pubkey = self.keypair.pubkey();

        let seeds = &[
            PREFIX.as_bytes(),
            metaplex_token_vault_id.as_ref(),
            vault_pubkey.as_ref(),
        ];
        let (authority, _) = Pubkey::find_program_address(seeds, &metaplex_token_vault_id);

        let tx = Transaction::new_signed_with_payer(
            &[instruction::create_activate_vault_instruction(
                lpl_token_vault::id(),
                self.keypair.pubkey(),
                self.mint.pubkey(),
                self.fraction_treasury.pubkey(),
                authority,
                context.payer.pubkey(),
                number_of_shares,
            )],
            Some(&context.payer.pubkey()),
            &[&context.payer],
            context.last_blockhash,
        );

        context.banks_client.process_transaction(tx).await
    }

    pub async fn combine(
        &self,
        context: &mut ProgramTestContext,
        external_price: &ExternalPrice,
    ) -> Result<(), BanksClientError> {
        let outstanding_token_account = Keypair::new();
        let paying_token_account = Keypair::new();

        let metaplex_token_vault_id = lpl_token_vault::id();
        let vault_pubkey = self.keypair.pubkey();

        create_token_account(
            context,
            &outstanding_token_account,
            &self.mint.pubkey(),
            &context.payer.pubkey(),
        )
        .await?;
        create_token_account(
            context,
            &paying_token_account,
            &external_price.price_mint.pubkey(),
            &context.payer.pubkey(),
        )
        .await?;

        let seeds = &[
            PREFIX.as_bytes(),
            metaplex_token_vault_id.as_ref(),
            vault_pubkey.as_ref(),
        ];
        let (authority, _) = Pubkey::find_program_address(seeds, &metaplex_token_vault_id);

        let tx = Transaction::new_signed_with_payer(
            &[instruction::create_combine_vault_instruction(
                lpl_token_vault::id(),
                self.keypair.pubkey(),
                outstanding_token_account.pubkey(),
                paying_token_account.pubkey(),
                self.mint.pubkey(),
                self.fraction_treasury.pubkey(),
                self.redeem_treasury.pubkey(),
                context.payer.pubkey(),
                context.payer.pubkey(),
                context.payer.pubkey(),
                authority,
                external_price.keypair.pubkey(),
            )],
            Some(&context.payer.pubkey()),
            &[&context.payer, &context.payer, &context.payer],
            context.last_blockhash,
        );

        context.banks_client.process_transaction(tx).await
    }

    pub async fn create(
        &self,
        context: &mut ProgramTestContext,
        external_price: &ExternalPrice,
    ) -> Result<(), BanksClientError> {
        let metaplex_token_vault_id = lpl_token_vault::id();
        let vault_pubkey = self.keypair.pubkey();

        let seeds = &[
            PREFIX.as_bytes(),
            metaplex_token_vault_id.as_ref(),
            vault_pubkey.as_ref(),
        ];
        let (authority, _) = Pubkey::find_program_address(seeds, &metaplex_token_vault_id);

        create_mint(context, &self.mint, &authority, Some(&authority)).await?;
        create_token_account(
            context,
            &self.redeem_treasury,
            &external_price.price_mint.pubkey(),
            &authority,
        )
        .await?;
        create_token_account(
            context,
            &self.fraction_treasury,
            &self.mint.pubkey(),
            &authority,
        )
        .await?;

        let rent = context.banks_client.get_rent().await.unwrap();
        let tx = Transaction::new_signed_with_payer(
            &[
                system_instruction::create_account(
                    &context.payer.pubkey(),
                    &self.keypair.pubkey(),
                    rent.minimum_balance(lpl_token_vault::state::MAX_VAULT_SIZE),
                    lpl_token_vault::state::MAX_VAULT_SIZE as u64,
                    &lpl_token_vault::id(),
                ),
                instruction::create_init_vault_instruction(
                    lpl_token_vault::id(),
                    self.mint.pubkey(),
                    self.redeem_treasury.pubkey(),
                    self.fraction_treasury.pubkey(),
                    self.keypair.pubkey(),
                    context.payer.pubkey(),
                    external_price.keypair.pubkey(),
                    false,
                ),
            ],
            Some(&context.payer.pubkey()),
            &[&context.payer, &context.payer, &self.keypair],
            context.last_blockhash,
        );

        context.banks_client.process_transaction(tx).await
    }
}
