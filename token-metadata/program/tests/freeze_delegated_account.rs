#![cfg(feature = "test-bpf")]
pub mod utils;

use lpl_token_metadata::error::MetadataError;
use num_traits::FromPrimitive;
use solana_program_test::*;
use safecoin_sdk::{
    instruction::InstructionError,
    signature::{Keypair, Signer},
    transaction::{Transaction, TransactionError},
};
use utils::*;
mod freeze_delegated {

    use super::*;
    #[tokio::test]
    async fn freeze_delegated_token_success() {
        let mut context = program_test().start_with_context().await;
        let delegate = Keypair::new();

        // create metadata
        let test_metadata = Metadata::new();
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

        // create master edition
        let test_master_edition = MasterEditionV2::new(&test_metadata);
        test_master_edition
            .create_v3(&mut context, Some(1))
            .await
            .unwrap();

        let approve_ix = safe_token::instruction::approve(
            &safe_token::id(),
            &test_metadata.token.pubkey(),
            &delegate.pubkey(),
            &context.payer.pubkey(),
            &[],
            1,
        )
        .unwrap();
        let approve_tx = Transaction::new_signed_with_payer(
            &[approve_ix],
            Some(&context.payer.pubkey()),
            &[&context.payer],
            context.last_blockhash,
        );
        context
            .banks_client
            .process_transaction(approve_tx)
            .await
            .unwrap();

        // delegate freezes token
        let freeze_tx = Transaction::new_signed_with_payer(
            &[lpl_token_metadata::instruction::freeze_delegated_account(
                lpl_token_metadata::id(),
                delegate.pubkey(),
                test_metadata.token.pubkey(),
                test_master_edition.pubkey,
                test_master_edition.mint_pubkey,
            )],
            Some(&context.payer.pubkey()),
            &[&context.payer, &delegate],
            context.last_blockhash,
        );
        context
            .banks_client
            .process_transaction(freeze_tx)
            .await
            .unwrap();

        // transfer fails because frozen
        let transfer_ix = safe_token::instruction::transfer(
            &safe_token::id(),
            &test_metadata.token.pubkey(),
            &test_metadata.token.pubkey(),
            &context.payer.pubkey(),
            &[],
            1,
        )
        .unwrap();
        let transfer_tx = Transaction::new_signed_with_payer(
            &[transfer_ix],
            Some(&context.payer.pubkey()),
            &[&context.payer],
            context.last_blockhash,
        );
        let err = context
            .banks_client
            .process_transaction(transfer_tx)
            .await
            .unwrap_err();

        assert_custom_error!(err, safe_token::error::TokenError::AccountFrozen);
    }

    #[tokio::test]
    async fn freeze_delegated_no_freeze_authority() {
        let mut context = program_test().start_with_context().await;
        let delegate = Keypair::new();

        // create metadata
        let test_metadata = Metadata::new();
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

        // delegate token to delegate
        safe_token::instruction::approve(
            &safe_token::id(),
            &test_metadata.token.pubkey(),
            &delegate.pubkey(),
            &context.payer.pubkey(),
            &[],
            1,
        )
        .unwrap();

        // delegate freezes token
        let freeze_ix = lpl_token_metadata::instruction::freeze_delegated_account(
            lpl_token_metadata::id(),
            delegate.pubkey(),
            test_metadata.token.pubkey(),
            test_metadata.pubkey,
            test_metadata.mint.pubkey(),
        );
        let freeze_tx = Transaction::new_signed_with_payer(
            &[freeze_ix],
            Some(&context.payer.pubkey()),
            &[&context.payer, &delegate],
            context.last_blockhash,
        );
        // fails because not delegate
        let err = context
            .banks_client
            .process_transaction(freeze_tx)
            .await
            .unwrap_err();

        assert_custom_error!(err, MetadataError::InvalidFreezeAuthority);
    }

    #[tokio::test]
    async fn freeze_delegated_token_not_delegated() {
        let mut context = program_test().start_with_context().await;
        let _delegate = Keypair::new();

        // create metadata
        let test_metadata = Metadata::new();
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

        // create master edition
        let test_master_edition = MasterEditionV2::new(&test_metadata);
        test_master_edition
            .create_v3(&mut context, None)
            .await
            .unwrap();

        // attempt to freeze delegated account
        let freeze_ix = lpl_token_metadata::instruction::freeze_delegated_account(
            lpl_token_metadata::id(),
            context.payer.pubkey(),
            test_metadata.token.pubkey(),
            test_master_edition.pubkey,
            test_master_edition.mint_pubkey,
        );
        let freeze_tx = Transaction::new_signed_with_payer(
            &[freeze_ix],
            Some(&context.payer.pubkey()),
            &[&context.payer],
            context.last_blockhash,
        );

        // expected error because token not delegated
        let err = context
            .banks_client
            .process_transaction(freeze_tx)
            .await
            .unwrap_err();

        assert_custom_error!(err, MetadataError::InvalidDelegate);
    }

    #[tokio::test]
    async fn freeze_delegated_token_try_thaw() {
        let mut context = program_test().start_with_context().await;
        let delegate = Keypair::new();

        // create metadata
        let test_metadata = Metadata::new();
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

        // create master edition
        let test_master_edition = MasterEditionV2::new(&test_metadata);
        test_master_edition
            .create_v3(&mut context, None)
            .await
            .unwrap();

        // delegate token to delegate
        safe_token::instruction::approve(
            &safe_token::id(),
            &test_metadata.token.pubkey(),
            &delegate.pubkey(),
            &context.payer.pubkey(),
            &[],
            1,
        )
        .unwrap();

        // delegate freezes token
        let freeze_ix = lpl_token_metadata::instruction::freeze_delegated_account(
            lpl_token_metadata::id(),
            delegate.pubkey(),
            test_metadata.token.pubkey(),
            test_master_edition.pubkey,
            test_master_edition.mint_pubkey,
        );
        let _freeze_tx = Transaction::new_signed_with_payer(
            &[freeze_ix],
            Some(&context.payer.pubkey()),
            &[&context.payer, &delegate],
            context.last_blockhash,
        );

        // owner attempt to thaw account
        let thaw_ix = lpl_token_metadata::instruction::thaw_delegated_account(
            lpl_token_metadata::id(),
            context.payer.pubkey(),
            test_metadata.token.pubkey(),
            test_master_edition.pubkey,
            test_master_edition.mint_pubkey,
        );
        let thaw_tx = Transaction::new_signed_with_payer(
            &[thaw_ix],
            Some(&context.payer.pubkey()),
            &[&context.payer],
            context.last_blockhash,
        );

        // fails because not delegate
        let err = context
            .banks_client
            .process_transaction(thaw_tx)
            .await
            .unwrap_err();

        assert_custom_error!(err, MetadataError::InvalidDelegate);
    }
}
