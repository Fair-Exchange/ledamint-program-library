use anchor_lang::{prelude::*, solana_program::pubkey::Pubkey};
use lpl_token_metadata::{
    state::{MAX_MASTER_EDITION_LEN, MAX_METADATA_LEN},
    utils::try_from_slice_checked,
};

use std::ops::Deref;

#[derive(Clone, AnchorDeserialize, AnchorSerialize)]
pub struct MasterEdition(lpl_token_metadata::state::MasterEditionV2);

impl anchor_lang::AccountDeserialize for MasterEdition {
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {
        try_from_slice_checked::<lpl_token_metadata::state::MasterEditionV2>(
            buf,
            lpl_token_metadata::state::Key::MasterEditionV2,
            MAX_MASTER_EDITION_LEN,
        )
        .map(MasterEdition)
        .map_err(Into::into)
    }
}

impl anchor_lang::AccountSerialize for MasterEdition {}

impl anchor_lang::Owner for MasterEdition {
    fn owner() -> Pubkey {
        lpl_token_metadata::id()
    }
}

impl Deref for MasterEdition {
    type Target = lpl_token_metadata::state::MasterEditionV2;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Clone, AnchorDeserialize, AnchorSerialize)]
pub struct TokenMetadata(lpl_token_metadata::state::Metadata);

impl anchor_lang::AccountDeserialize for TokenMetadata {
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> Result<Self> {
        try_from_slice_checked::<lpl_token_metadata::state::Metadata>(
            buf,
            lpl_token_metadata::state::Key::MetadataV1,
            MAX_METADATA_LEN,
        )
        .map(TokenMetadata)
        .map_err(Into::into)
    }
}

impl anchor_lang::AccountSerialize for TokenMetadata {}

impl anchor_lang::Owner for TokenMetadata {
    fn owner() -> Pubkey {
        lpl_token_metadata::id()
    }
}

impl Deref for TokenMetadata {
    type Target = lpl_token_metadata::state::Metadata;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Clone)]
pub struct MplTokenMetadata;

impl anchor_lang::Id for MplTokenMetadata {
    fn id() -> Pubkey {
        lpl_token_metadata::id()
    }
}
