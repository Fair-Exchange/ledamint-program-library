#![cfg(feature = "test-bpf")]
mod utils;

use mpl_nft_packs::{
    error::NFTPacksError,
    instruction::{AddCardToPackArgs, InitPackSetArgs},
    state::PackDistributionType,
};
use num_traits::FromPrimitive;
use solana_program::{clock::Clock, instruction::InstructionError, system_instruction};
use solana_program_test::*;
use safecoin_sdk::{
    signature::Keypair,
    signer::Signer,
    transaction::{Transaction, TransactionError},
    transport::TransportError,
};
use utils::*;

async fn setup() -> (
    ProgramTestContext,
    TestPackSet,
    TestPackCard,
    TestMetadata,
    TestMasterEditionV2,
    User,
) {
    let mut context = nft_packs_program_test().start_with_context().await;

    let name = [7; 32];
    let uri = String::from("some link to storage");
    let description = String::from("Pack description");

    let clock = context.banks_client.get_sysvar::<Clock>().await.unwrap();

    let redeem_start_date = Some(clock.unix_timestamp as u64);
    let redeem_end_date = None;

    let store_admin = Keypair::new();
    let store_key = create_store(&mut context, &store_admin, true)
        .await
        .unwrap();

    let test_pack_set = TestPackSet::new(store_key);
    test_pack_set
        .init(
            &mut context,
            InitPackSetArgs {
                name,
                uri: uri.clone(),
                description: description.clone(),
                mutable: true,
                distribution_type: PackDistributionType::Unlimited,
                allowed_amount_to_redeem: 10,
                redeem_start_date,
                redeem_end_date,
            },
        )
        .await
        .unwrap();

    let test_metadata = TestMetadata::new();
    let test_master_edition = TestMasterEditionV2::new(&test_metadata);

    let user_token_acc = Keypair::new();
    let user = User {
        owner: Keypair::new(),
        token_account: user_token_acc.pubkey(),
    };

    test_metadata
        .create(
            &mut context,
            "Test".to_string(),
            "TST".to_string(),
            "uri".to_string(),
            None,
            10,
            false,
            &user_token_acc,
            &test_pack_set.authority.pubkey(),
        )
        .await
        .unwrap();

    test_master_edition
        .create(&mut context, None)
        .await
        .unwrap();

    // Add pack card
    let test_pack_card = TestPackCard::new(&test_pack_set, 1);
    test_pack_set
        .add_card(
            &mut context,
            &test_pack_card,
            &test_master_edition,
            &test_metadata,
            &user,
            AddCardToPackArgs {
                max_supply: 0,
                weight: 100,
                index: test_pack_card.index,
            },
        )
        .await
        .unwrap();

    (
        context,
        test_pack_set,
        test_pack_card,
        test_metadata,
        test_master_edition,
        user,
    )
}

#[tokio::test]
async fn success() {
    let (mut context, test_pack_set, test_pack_card, test_metadata, _test_master_edition, user) =
        setup().await;

    let new_token_owner_acc = Keypair::new();
    create_token_account(
        &mut context,
        &new_token_owner_acc,
        &test_metadata.mint.pubkey(),
        &test_pack_set.authority.pubkey(),
    )
    .await
    .unwrap();

    let pack_set = test_pack_set.get_data(&mut context).await;
    assert_eq!(pack_set.pack_cards, 1);

    test_pack_set.close(&mut context).await.unwrap();

    test_pack_set
        .delete_card(
            &mut context,
            &test_pack_card,
            &user.pubkey(),
            &new_token_owner_acc.pubkey(),
        )
        .await
        .unwrap();

    let pack_set = test_pack_set.get_data(&mut context).await;
    assert_eq!(pack_set.pack_cards, 0);
}

#[tokio::test]
async fn fail_invalid_state() {
    let (mut context, test_pack_set, test_pack_card, _test_metadata, _test_master_edition, _user) =
        setup().await;

    let test_metadata2 = TestMetadata::new();
    let test_master_edition2 = TestMasterEditionV2::new(&test_metadata2);
    let fake_keypair = Keypair::new();
    let payer_pubkey = context.payer.pubkey();

    let user_token_acc2 = Keypair::new();
    let user2 = User {
        owner: Keypair::new(),
        token_account: user_token_acc2.pubkey(),
    };

    // Create 2nd metadata and master edition
    test_metadata2
        .create(
            &mut context,
            "Test2".to_string(),
            "TST2".to_string(),
            "uri2".to_string(),
            None,
            10,
            false,
            &user_token_acc2,
            &test_pack_set.authority.pubkey(),
        )
        .await
        .unwrap();

    test_master_edition2
        .create(&mut context, Some(10))
        .await
        .unwrap();

    let voucher_edition = TestEditionMarker::new(&test_metadata2, &test_master_edition2, 1);

    let edition_authority = Keypair::new();

    let tx = Transaction::new_signed_with_payer(
        &[system_instruction::create_account(
            &context.payer.pubkey(),
            &edition_authority.pubkey(),
            100000000000000,
            0,
            &solana_program::system_program::id(),
        )],
        Some(&context.payer.pubkey()),
        &[&context.payer, &edition_authority],
        context.last_blockhash,
    );

    unwrap_ignoring_io_error_in_ci(context.banks_client.process_transaction(tx).await);

    voucher_edition
        .create(
            &mut context,
            &edition_authority,
            &test_pack_set.authority,
            &user_token_acc2.pubkey(),
        )
        .await
        .unwrap();

    // Add pack voucher
    let test_pack_voucher = TestPackVoucher::new(&test_pack_set, 1);
    test_pack_set
        .add_voucher(
            &mut context,
            &test_pack_voucher,
            &test_master_edition2,
            &test_metadata2,
            &user2,
        )
        .await
        .unwrap();

    test_pack_set.activate(&mut context).await.unwrap();

    context.warp_to_slot(3).unwrap();

    let result = test_pack_set
        .delete_card(
            &mut context,
            &test_pack_card,
            &payer_pubkey,
            &fake_keypair.pubkey(),
        )
        .await
        .unwrap_err();

    assert_custom_error!(result, NFTPacksError::WrongPackState, 0);
}

#[tokio::test]
async fn success_delete_before_activated_state() {
    let (mut context, test_pack_set, test_pack_card, test_metadata, _test_master_edition, user) =
        setup().await;

    let new_token_owner_acc = Keypair::new();
    create_token_account(
        &mut context,
        &new_token_owner_acc,
        &test_metadata.mint.pubkey(),
        &test_pack_set.authority.pubkey(),
    )
    .await
    .unwrap();

    let pack_set = test_pack_set.get_data(&mut context).await;
    assert_eq!(pack_set.pack_cards, 1);

    test_pack_set
        .delete_card(
            &mut context,
            &test_pack_card,
            &user.pubkey(),
            &new_token_owner_acc.pubkey(),
        )
        .await
        .unwrap();

    let pack_set = test_pack_set.get_data(&mut context).await;
    assert_eq!(pack_set.pack_cards, 0);
}
