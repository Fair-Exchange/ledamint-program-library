use borsh::BorshSerialize;
use lpl_token_metadata::{
    id,
    instruction::{
        self, builders::BurnBuilder, BurnArgs, InstructionBuilder, MetadataInstruction,
        MintNewEditionFromMasterEditionViaTokenArgs,
    },
    state::{EDITION, EDITION_MARKER_BIT_SIZE, PREFIX},
};
use solana_program::{
    borsh::try_from_slice_unchecked,
    instruction::{AccountMeta, Instruction},
    sysvar,
};
use solana_program_test::BanksClientError;
use safecoin_sdk::{
    pubkey::Pubkey, signature::Signer, signer::keypair::Keypair, transaction::Transaction,
};
use safe_associated_token_account::{
    get_associated_token_address, instruction::create_associated_token_account,
};

use crate::*;

#[derive(Clone, Debug)]
pub struct BurnPrintArgs<'a> {
    pub authority: &'a Keypair,
    pub metadata: Option<Pubkey>,
    pub edition: Option<Pubkey>,
    pub mint: Option<Pubkey>,
    pub token: Option<Pubkey>,
    pub master_edition_mint: Option<Pubkey>,
    pub master_edition_token: Option<Pubkey>,
    pub master_edition: Option<Pubkey>,
    pub edition_marker: Option<Pubkey>,
}

impl<'a> BurnPrintArgs<'a> {
    pub fn default(authority: &'a Keypair) -> BurnPrintArgs<'a> {
        Self {
            authority,
            metadata: None,
            edition: None,
            mint: None,
            token: None,
            master_edition_mint: None,
            master_edition_token: None,
            master_edition: None,
            edition_marker: None,
        }
    }
}

#[derive(Debug)]
pub struct EditionMarker {
    pub new_metadata_pubkey: Pubkey,
    pub new_edition_pubkey: Pubkey,
    pub master_edition_pubkey: Pubkey,
    pub metadata_mint_pubkey: Pubkey,
    pub mint: Keypair,
    pub metadata_pubkey: Pubkey,
    pub pubkey: Pubkey,
    pub edition: u64,
    pub token: Keypair,
    pub metadata_token_pubkey: Pubkey,
}

impl EditionMarker {
    pub fn new(metadata: &Metadata, master_edition: &MasterEditionV2, edition: u64) -> Self {
        let mint = Keypair::new();
        let mint_pubkey = mint.pubkey();
        let metadata_mint_pubkey = metadata.mint.pubkey();
        let program_id = id();

        let edition_number = edition.checked_div(EDITION_MARKER_BIT_SIZE).unwrap();
        let as_string = edition_number.to_string();
        let (pubkey, _) = Pubkey::find_program_address(
            &[
                PREFIX.as_bytes(),
                program_id.as_ref(),
                metadata_mint_pubkey.as_ref(),
                EDITION.as_bytes(),
                as_string.as_bytes(),
            ],
            &program_id,
        );

        let metadata_seeds = &[PREFIX.as_bytes(), program_id.as_ref(), mint_pubkey.as_ref()];
        let (new_metadata_pubkey, _) = Pubkey::find_program_address(metadata_seeds, &id());

        let master_edition_seeds = &[
            PREFIX.as_bytes(),
            program_id.as_ref(),
            mint_pubkey.as_ref(),
            EDITION.as_bytes(),
        ];
        let (new_edition_pubkey, _) = Pubkey::find_program_address(master_edition_seeds, &id());

        EditionMarker {
            pubkey,
            edition,
            mint,
            metadata_mint_pubkey,
            metadata_pubkey: metadata.pubkey,
            master_edition_pubkey: master_edition.pubkey,
            new_metadata_pubkey,
            new_edition_pubkey,
            metadata_token_pubkey: metadata.token.pubkey(),
            token: Keypair::new(),
        }
    }

    pub async fn get_data(
        &self,
        context: &mut ProgramTestContext,
    ) -> lpl_token_metadata::state::EditionMarker {
        let account = get_account(context, &self.pubkey).await;
        try_from_slice_unchecked(&account.data).unwrap()
    }

    pub async fn create(&self, context: &mut ProgramTestContext) -> Result<(), BanksClientError> {
        create_mint(
            context,
            &self.mint,
            &context.payer.pubkey(),
            Some(&context.payer.pubkey()),
            0,
        )
        .await?;
        create_token_account(
            context,
            &self.token,
            &self.mint.pubkey(),
            &context.payer.pubkey(),
        )
        .await?;
        mint_tokens(
            context,
            &self.mint.pubkey(),
            &self.token.pubkey(),
            1,
            &context.payer.pubkey(),
            None,
        )
        .await?;

        let tx = Transaction::new_signed_with_payer(
            &[instruction::mint_new_edition_from_master_edition_via_token(
                id(),
                self.new_metadata_pubkey,
                self.new_edition_pubkey,
                self.master_edition_pubkey,
                self.mint.pubkey(),
                context.payer.pubkey(),
                context.payer.pubkey(),
                context.payer.pubkey(),
                self.metadata_token_pubkey,
                context.payer.pubkey(),
                self.metadata_pubkey,
                self.metadata_mint_pubkey,
                self.edition,
            )],
            Some(&context.payer.pubkey()),
            &[&context.payer, &context.payer],
            context.last_blockhash,
        );

        context
            .banks_client
            .process_transaction_with_commitment(
                tx,
                safecoin_sdk::commitment_config::CommitmentLevel::Confirmed,
            )
            .await
    }

    pub async fn create_with_invalid_token_program(
        &self,
        context: &mut ProgramTestContext,
    ) -> Result<(), BanksClientError> {
        let fake_token_program = Keypair::new();
        let program_id = lpl_token_metadata::id();

        let edition_number = self.edition.checked_div(EDITION_MARKER_BIT_SIZE).unwrap();
        let as_string = edition_number.to_string();
        let (edition_mark_pda, _) = Pubkey::find_program_address(
            &[
                PREFIX.as_bytes(),
                program_id.as_ref(),
                self.metadata_mint_pubkey.as_ref(),
                EDITION.as_bytes(),
                as_string.as_bytes(),
            ],
            &program_id,
        );

        let accounts = vec![
            AccountMeta::new(self.new_metadata_pubkey, false),
            AccountMeta::new(self.new_edition_pubkey, false),
            AccountMeta::new(self.master_edition_pubkey, false),
            AccountMeta::new(self.mint.pubkey(), false),
            AccountMeta::new(edition_mark_pda, false),
            AccountMeta::new_readonly(context.payer.pubkey(), true),
            AccountMeta::new(context.payer.pubkey(), true),
            AccountMeta::new_readonly(context.payer.pubkey(), true),
            AccountMeta::new_readonly(self.token.pubkey(), false),
            AccountMeta::new_readonly(context.payer.pubkey(), false),
            AccountMeta::new_readonly(self.metadata_pubkey, false),
            AccountMeta::new_readonly(fake_token_program.pubkey(), false),
            AccountMeta::new_readonly(solana_program::system_program::id(), false),
            AccountMeta::new_readonly(sysvar::rent::id(), false),
        ];

        let fake_instruction = Instruction {
            program_id,
            accounts,
            data: MetadataInstruction::MintNewEditionFromMasterEditionViaToken(
                MintNewEditionFromMasterEditionViaTokenArgs {
                    edition: self.edition,
                },
            )
            .try_to_vec()
            .unwrap(),
        };

        let tx = Transaction::new_signed_with_payer(
            &[fake_instruction],
            Some(&context.payer.pubkey()),
            &[&context.payer],
            context.last_blockhash,
        );

        context.banks_client.process_transaction(tx).await
    }

    pub async fn transfer(
        &mut self,
        context: &mut ProgramTestContext,
        new_owner: &Pubkey,
    ) -> Result<(), BanksClientError> {
        let new_owner_token_account = get_associated_token_address(new_owner, &self.mint.pubkey());
        let create_token_account_ix = create_associated_token_account(
            &context.payer.pubkey(),
            new_owner,
            &self.mint.pubkey(),
            &safe_token::ID,
        );

        let transfer_ix = safe_token::instruction::transfer(
            &safe_token::id(),
            &self.token.pubkey(),
            &new_owner_token_account,
            &context.payer.pubkey(),
            &[],
            1,
        )
        .unwrap();

        let transfer_tx = Transaction::new_signed_with_payer(
            &[create_token_account_ix, transfer_ix],
            Some(&context.payer.pubkey()),
            &[&context.payer],
            context.last_blockhash,
        );

        context.banks_client.process_transaction(transfer_tx).await
    }

    pub async fn burn<'a>(
        &self,
        context: &mut ProgramTestContext,
        args: BurnPrintArgs<'a>,
    ) -> Result<(), BanksClientError> {
        let burn_args = BurnArgs::V1 { amount: 1 };

        let mut builder = BurnBuilder::new();
        builder
            .authority(args.authority.pubkey())
            .metadata(args.metadata.unwrap_or(self.new_metadata_pubkey))
            .edition(args.edition.unwrap_or(self.new_edition_pubkey))
            .mint(args.mint.unwrap_or_else(|| self.mint.pubkey()))
            .token(args.token.unwrap_or_else(|| self.token.pubkey()))
            .master_edition_mint(
                args.master_edition_mint
                    .unwrap_or(self.metadata_mint_pubkey),
            )
            .master_edition_token(
                args.master_edition_token
                    .unwrap_or(self.metadata_token_pubkey),
            )
            .master_edition(args.master_edition.unwrap_or(self.master_edition_pubkey))
            .edition_marker(args.edition_marker.unwrap_or(self.pubkey));

        let burn_ix = builder.build(burn_args).unwrap().instruction();

        let transaction = Transaction::new_signed_with_payer(
            &[burn_ix],
            Some(&context.payer.pubkey()),
            &[&context.payer, (args.authority)],
            context.last_blockhash,
        );

        context.banks_client.process_transaction(transaction).await
    }

    pub async fn exists_on_chain(&self, context: &mut ProgramTestContext) -> bool {
        // Metadata, Print Edition and token account exist.
        let md_account = context
            .banks_client
            .get_account(self.new_metadata_pubkey)
            .await
            .unwrap();
        let token_account = context
            .banks_client
            .get_account(self.token.pubkey())
            .await
            .unwrap();
        let print_edition_account = context
            .banks_client
            .get_account(self.new_edition_pubkey)
            .await
            .unwrap();

        md_account.is_some() && token_account.is_some() && print_edition_account.is_some()
    }
}
