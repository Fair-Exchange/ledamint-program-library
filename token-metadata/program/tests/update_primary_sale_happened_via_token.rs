#![cfg(feature = "test-bpf")]
pub mod utils;

use lpl_token_metadata::{
    error::MetadataError,
    id, instruction,
    state::{Key, MAX_NAME_LENGTH, MAX_SYMBOL_LENGTH, MAX_URI_LENGTH},
    utils::puffed_out_string,
};
use num_traits::FromPrimitive;
use solana_program_test::*;
use safecoin_sdk::{
    instruction::InstructionError,
    signature::{Keypair, Signer},
    transaction::{Transaction, TransactionError},
};
use utils::*;

mod update_primary_sale_happened_via_token {

    use super::*;
    #[tokio::test]
    async fn success() {
        let mut context = program_test().start_with_context().await;
        let test_metadata = Metadata::new();
        let name = "Test".to_string();
        let symbol = "TST".to_string();
        let uri = "uri".to_string();

        let puffed_name = puffed_out_string(&name, MAX_NAME_LENGTH);
        let puffed_symbol = puffed_out_string(&symbol, MAX_SYMBOL_LENGTH);
        let puffed_uri = puffed_out_string(&uri, MAX_URI_LENGTH);

        test_metadata
            .create(&mut context, name, symbol, uri, None, 10, false, 0)
            .await
            .unwrap();

        test_metadata
            .update_primary_sale_happened_via_token(&mut context)
            .await
            .unwrap();

        let metadata = test_metadata.get_data(&mut context).await;

        assert_eq!(metadata.data.name, puffed_name,);
        assert_eq!(metadata.data.symbol, puffed_symbol);
        assert_eq!(metadata.data.uri, puffed_uri);
        assert_eq!(metadata.data.seller_fee_basis_points, 10);
        assert_eq!(metadata.data.creators, None);

        assert!(metadata.primary_sale_happened);
        assert!(!metadata.is_mutable,);
        assert_eq!(metadata.mint, test_metadata.mint.pubkey());
        assert_eq!(metadata.update_authority, context.payer.pubkey());
        assert_eq!(metadata.key, Key::MetadataV1);
    }

    #[tokio::test]
    async fn fail_invalid_mint() {
        let mut context = program_test().start_with_context().await;
        let test_metadata = Metadata::new();

        let fake_mint = Keypair::new();
        let fake_token_account = Keypair::new();
        let payer_pubkey = context.payer.pubkey();
        create_mint(&mut context, &fake_mint, &payer_pubkey, None, 0)
            .await
            .unwrap();
        create_token_account(
            &mut context,
            &fake_token_account,
            &fake_mint.pubkey(),
            &payer_pubkey,
        )
        .await
        .unwrap();
        mint_tokens(
            &mut context,
            &fake_mint.pubkey(),
            &fake_token_account.pubkey(),
            10000000,
            &payer_pubkey,
            None,
        )
        .await
        .unwrap();

        test_metadata
            .create(
                &mut context,
                "Test".to_string(),
                "TST".to_string(),
                "uri".to_string(),
                None,
                10,
                true,
                0,
            )
            .await
            .unwrap();

        let tx = Transaction::new_signed_with_payer(
            &[instruction::update_primary_sale_happened_via_token(
                id(),
                test_metadata.pubkey,
                context.payer.pubkey(),
                fake_token_account.pubkey(),
            )],
            Some(&context.payer.pubkey()),
            &[&context.payer],
            context.last_blockhash,
        );

        let result = context
            .banks_client
            .process_transaction(tx)
            .await
            .unwrap_err();

        assert_custom_error!(result, MetadataError::MintMismatch);
    }
}
