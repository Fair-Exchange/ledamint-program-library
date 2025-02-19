#![cfg(feature = "test-bpf")]
pub mod utils;

use lpl_token_metadata::{error::MetadataError, id, instruction, state::Key};
use num_traits::FromPrimitive;
use solana_program_test::*;
use safecoin_sdk::{
    instruction::InstructionError,
    signature::{Keypair, Signer},
    transaction::{Transaction, TransactionError},
};
use utils::*;

mod create_master_edition {
    use super::*;

    #[tokio::test]
    #[allow(deprecated)]
    async fn success() {
        let mut context = program_test().start_with_context().await;
        let test_metadata = Metadata::new();
        let test_master_edition = MasterEditionV2::new(&test_metadata);

        test_metadata
            .create(
                &mut context,
                "Test".to_string(),
                "TST".to_string(),
                "uri".to_string(),
                None,
                10,
                false,
                0,
            )
            .await
            .unwrap();

        let mint = get_mint(&mut context, &test_master_edition.mint_pubkey).await;
        let old_authority = mint.mint_authority.unwrap();

        test_master_edition
            .create(&mut context, Some(10))
            .await
            .unwrap();

        let master_edition = test_master_edition.get_data(&mut context).await;

        let mint = get_mint(&mut context, &test_master_edition.mint_pubkey).await;
        let new_authority = mint.mint_authority.unwrap();

        assert_eq!(new_authority, new_authority);
        assert_ne!(old_authority, new_authority);
        assert_eq!(master_edition.supply, 0);
        assert_eq!(master_edition.max_supply.unwrap(), 10);
        assert_eq!(master_edition.key, Key::MasterEditionV2);
    }

    #[tokio::test]
    async fn success_v3() {
        let mut context = program_test().start_with_context().await;
        let test_metadata = Metadata::new();
        let test_master_edition = MasterEditionV2::new(&test_metadata);

        test_metadata
            .create_v2(
                &mut context,
                "Test".to_string(),
                "TST".to_string(),
                "uri".to_string(),
                None,
                10,
                false,
                None,
                None,
            )
            .await
            .unwrap();

        let mint = get_mint(&mut context, &test_master_edition.mint_pubkey).await;
        let old_authority = mint.mint_authority.unwrap();

        test_master_edition
            .create_v3(&mut context, Some(10))
            .await
            .unwrap();

        let master_edition = test_master_edition.get_data(&mut context).await;

        let mint = get_mint(&mut context, &test_master_edition.mint_pubkey).await;
        let new_authority = mint.mint_authority.unwrap();

        assert_eq!(new_authority, new_authority);
        assert_ne!(old_authority, new_authority);
        assert_eq!(master_edition.supply, 0);
        assert_eq!(master_edition.max_supply.unwrap(), 10);
        assert_eq!(master_edition.key, Key::MasterEditionV2);
    }

    #[tokio::test]
    #[allow(deprecated)]
    async fn fail_invalid_mint_authority() {
        let mut context = program_test().start_with_context().await;
        let test_metadata = Metadata::new();
        let test_master_edition = MasterEditionV2::new(&test_metadata);
        let fake_mint_authority = Keypair::new();

        test_metadata
            .create(
                &mut context,
                "Test".to_string(),
                "TST".to_string(),
                "uri".to_string(),
                None,
                10,
                false,
                0,
            )
            .await
            .unwrap();

        let tx = Transaction::new_signed_with_payer(
            &[instruction::create_master_edition(
                id(),
                test_master_edition.pubkey,
                test_master_edition.mint_pubkey,
                context.payer.pubkey(),
                fake_mint_authority.pubkey(),
                test_master_edition.metadata_pubkey,
                context.payer.pubkey(),
                Some(10),
            )],
            Some(&context.payer.pubkey()),
            &[&context.payer, &context.payer, &fake_mint_authority],
            context.last_blockhash,
        );

        let result = context
            .banks_client
            .process_transaction(tx)
            .await
            .unwrap_err();

        assert_custom_error!(result, MetadataError::InvalidMintAuthority);
    }

    #[tokio::test]
    async fn fail_invalid_token_program() {
        let mut context = program_test().start_with_context().await;
        let test_metadata = Metadata::new();
        let test_master_edition = MasterEditionV2::new(&test_metadata);

        test_metadata
            .create(
                &mut context,
                "Test".to_string(),
                "TST".to_string(),
                "uri".to_string(),
                None,
                10,
                false,
                0,
            )
            .await
            .unwrap();

        let result = test_master_edition
            .create_with_invalid_token_program(&mut context, Some(10))
            .await
            .unwrap_err();
        assert_custom_error!(result, MetadataError::InvalidTokenProgram);
    }

    #[tokio::test]
    async fn fail_invalid_mint() {
        let mut context = program_test().start_with_context().await;
        let test_metadata = Metadata::new();

        let fake_mint = Keypair::new();
        let fake_account = Keypair::new();
        let payer_pubkey = context.payer.pubkey();

        test_metadata
            .create(
                &mut context,
                "Test".to_string(),
                "TST".to_string(),
                "uri".to_string(),
                None,
                10,
                false,
                0,
            )
            .await
            .unwrap();

        create_mint(&mut context, &fake_mint, &payer_pubkey, None, 0)
            .await
            .unwrap();
        create_token_account(
            &mut context,
            &fake_account,
            &fake_mint.pubkey(),
            &payer_pubkey,
        )
        .await
        .unwrap();
        mint_tokens(
            &mut context,
            &fake_mint.pubkey(),
            &fake_account.pubkey(),
            1000000,
            &payer_pubkey,
            None,
        )
        .await
        .unwrap();

        let test_master_edition = MasterEditionV2::new(&Metadata {
            mint: fake_mint,
            pubkey: test_metadata.pubkey,
            token: fake_account,
        });

        let result = test_master_edition
            .create(&mut context, Some(10))
            .await
            .unwrap_err();

        assert_custom_error!(result, MetadataError::MintMismatch);
    }

    #[tokio::test]
    #[allow(deprecated)]
    async fn fail_invalid_update_authority() {
        let mut context = program_test().start_with_context().await;
        let test_metadata = Metadata::new();
        let test_master_edition = MasterEditionV2::new(&test_metadata);
        let fake_update_authority = Keypair::new();

        test_metadata
            .create(
                &mut context,
                "Test".to_string(),
                "TST".to_string(),
                "uri".to_string(),
                None,
                10,
                false,
                0,
            )
            .await
            .unwrap();

        let tx = Transaction::new_signed_with_payer(
            &[instruction::create_master_edition(
                id(),
                test_master_edition.pubkey,
                test_master_edition.mint_pubkey,
                fake_update_authority.pubkey(),
                context.payer.pubkey(),
                test_master_edition.metadata_pubkey,
                context.payer.pubkey(),
                Some(10),
            )],
            Some(&context.payer.pubkey()),
            &[&context.payer, &context.payer, &fake_update_authority],
            context.last_blockhash,
        );

        let result = context
            .banks_client
            .process_transaction(tx)
            .await
            .unwrap_err();

        assert_custom_error!(result, MetadataError::UpdateAuthorityIncorrect);
    }

    #[tokio::test]
    async fn fail_v3_invalid_update_authority() {
        let mut context = program_test().start_with_context().await;
        let test_metadata = Metadata::new();
        let test_master_edition = MasterEditionV2::new(&test_metadata);
        let fake_update_authority = Keypair::new();

        test_metadata
            .create_v2(
                &mut context,
                "Test".to_string(),
                "TST".to_string(),
                "uri".to_string(),
                None,
                10,
                false,
                None,
                None,
            )
            .await
            .unwrap();

        let tx = Transaction::new_signed_with_payer(
            &[instruction::create_master_edition_v3(
                id(),
                test_master_edition.pubkey,
                test_master_edition.mint_pubkey,
                fake_update_authority.pubkey(),
                context.payer.pubkey(),
                test_master_edition.metadata_pubkey,
                context.payer.pubkey(),
                Some(10),
            )],
            Some(&context.payer.pubkey()),
            &[&context.payer, &context.payer, &fake_update_authority],
            context.last_blockhash,
        );

        let result = context
            .banks_client
            .process_transaction(tx)
            .await
            .unwrap_err();

        assert_custom_error!(result, MetadataError::UpdateAuthorityIncorrect);
    }

    #[tokio::test]
    async fn fail_v3_invalid_mint() {
        let mut context = program_test().start_with_context().await;
        let test_metadata = Metadata::new();

        let fake_mint = Keypair::new();
        let fake_account = Keypair::new();
        let payer_pubkey = context.payer.pubkey();

        test_metadata
            .create_v2(
                &mut context,
                "Test".to_string(),
                "TST".to_string(),
                "uri".to_string(),
                None,
                10,
                false,
                None,
                None,
            )
            .await
            .unwrap();

        create_mint(&mut context, &fake_mint, &payer_pubkey, None, 0)
            .await
            .unwrap();
        create_token_account(
            &mut context,
            &fake_account,
            &fake_mint.pubkey(),
            &payer_pubkey,
        )
        .await
        .unwrap();
        mint_tokens(
            &mut context,
            &fake_mint.pubkey(),
            &fake_account.pubkey(),
            1000000,
            &payer_pubkey,
            None,
        )
        .await
        .unwrap();

        let test_master_edition = MasterEditionV2::new(&Metadata {
            mint: fake_mint,
            pubkey: test_metadata.pubkey,
            token: fake_account,
        });

        let result = test_master_edition
            .create_v3(&mut context, Some(10))
            .await
            .unwrap_err();

        assert_custom_error!(result, MetadataError::MintMismatch);
    }
}
