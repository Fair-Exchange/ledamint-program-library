use solana_program_test::{BanksClientError, ProgramTestContext};
use safecoin_sdk::pubkey::Pubkey;
use safecoin_sdk::signature::Keypair;
use safecoin_sdk::signer::Signer;
use safecoin_sdk::system_instruction;
use safecoin_sdk::transaction::Transaction;
use safecoin_sdk::{account::Account, program_pack::Pack};
use safe_token::state::Mint;
/// Perform native lamports transfer.
pub async fn transfer_lamports(
    client: &mut ProgramTestContext,
    wallet: &Keypair,
    to: &Pubkey,
    amount: u64,
) -> Result<(), BanksClientError> {
    let tx = Transaction::new_signed_with_payer(
        &[system_instruction::transfer(&wallet.pubkey(), to, amount)],
        Some(&wallet.pubkey()),
        &[wallet],
        client.last_blockhash,
    );

    client.banks_client.process_transaction(tx).await?;

    Ok(())
}

pub async fn get_token_account(
    client: &mut ProgramTestContext,
    token_account: &Pubkey,
) -> Result<safe_token::state::Account, BanksClientError> {
    let account = client.banks_client.get_account(*token_account).await?;
    Ok(safe_token::state::Account::unpack(&account.unwrap().data).unwrap())
}

pub async fn airdrop(
    context: &mut ProgramTestContext,
    receiver: &Pubkey,
    amount: u64,
) -> Result<(), BanksClientError> {
    let tx = Transaction::new_signed_with_payer(
        &[system_instruction::transfer(
            &context.payer.pubkey(),
            receiver,
            amount,
        )],
        Some(&context.payer.pubkey()),
        &[&context.payer],
        context.last_blockhash,
    );

    context.banks_client.process_transaction(tx).await.unwrap();
    Ok(())
}

pub async fn create_associated_token_account(
    context: &mut ProgramTestContext,
    wallet: &Keypair,
    token_mint: &Pubkey,
) -> Result<Pubkey, BanksClientError> {
    let recent_blockhash = context.last_blockhash;

    let tx = Transaction::new_signed_with_payer(
        &[
            safe_associated_token_account::instruction::create_associated_token_account(
                &context.payer.pubkey(),
                &wallet.pubkey(),
                token_mint,
                &safe_token::ID,
            ),
        ],
        Some(&context.payer.pubkey()),
        &[&context.payer],
        recent_blockhash,
    );

    // connection.send_and_confirm_transaction(&tx)?;
    context.banks_client.process_transaction(tx).await.unwrap();

    Ok(safe_associated_token_account::get_associated_token_address(
        &wallet.pubkey(),
        token_mint,
    ))
}

pub fn clone_keypair(keypair: &Keypair) -> Keypair {
    Keypair::from_bytes(&keypair.to_bytes()).unwrap()
}

pub async fn get_account(context: &mut ProgramTestContext, pubkey: &Pubkey) -> Account {
    context
        .banks_client
        .get_account(*pubkey)
        .await
        .expect("account not found")
        .expect("account empty")
}

pub async fn get_mint(context: &mut ProgramTestContext, pubkey: &Pubkey) -> Mint {
    let account = get_account(context, pubkey).await;
    Mint::unpack(&account.data).unwrap()
}

pub async fn mint_tokens(
    context: &mut ProgramTestContext,
    mint: &Pubkey,
    account: &Pubkey,
    amount: u64,
    owner: &Pubkey,
    additional_signer: Option<&Keypair>,
) -> Result<(), BanksClientError> {
    let mut signing_keypairs = vec![&context.payer];
    if let Some(signer) = additional_signer {
        signing_keypairs.push(signer);
    }

    let tx = Transaction::new_signed_with_payer(
        &[
            safe_token::instruction::mint_to(&safe_token::id(), mint, account, owner, &[], amount)
                .unwrap(),
        ],
        Some(&context.payer.pubkey()),
        &signing_keypairs,
        context.last_blockhash,
    );

    context.banks_client.process_transaction(tx).await
}

pub async fn create_token_account(
    context: &mut ProgramTestContext,
    account: &Keypair,
    mint: &Pubkey,
    manager: &Pubkey,
) -> Result<(), BanksClientError> {
    let rent = context.banks_client.get_rent().await.unwrap();

    let tx = Transaction::new_signed_with_payer(
        &[
            system_instruction::create_account(
                &context.payer.pubkey(),
                &account.pubkey(),
                rent.minimum_balance(safe_token::state::Account::LEN),
                safe_token::state::Account::LEN as u64,
                &safe_token::id(),
            ),
            safe_token::instruction::initialize_account(
                &safe_token::id(),
                &account.pubkey(),
                mint,
                manager,
            )
            .unwrap(),
        ],
        Some(&context.payer.pubkey()),
        &[&context.payer, account],
        context.last_blockhash,
    );

    context.banks_client.process_transaction(tx).await
}

pub async fn create_mint(
    context: &mut ProgramTestContext,
    mint: &Keypair,
    manager: &Pubkey,
    freeze_authority: Option<&Pubkey>,
) -> Result<(), BanksClientError> {
    let rent = context.banks_client.get_rent().await.unwrap();

    let tx = Transaction::new_signed_with_payer(
        &[
            system_instruction::create_account(
                &context.payer.pubkey(),
                &mint.pubkey(),
                rent.minimum_balance(safe_token::state::Mint::LEN),
                safe_token::state::Mint::LEN as u64,
                &safe_token::id(),
            ),
            safe_token::instruction::initialize_mint(
                &safe_token::id(),
                &mint.pubkey(),
                manager,
                freeze_authority,
                0,
            )
            .unwrap(),
        ],
        Some(&context.payer.pubkey()),
        &[&context.payer, mint],
        context.last_blockhash,
    );

    context.banks_client.process_transaction(tx).await
}

pub async fn transfer(
    context: &mut ProgramTestContext,
    mint: &Pubkey,
    from: &Keypair,
    to: &Keypair,
) -> Result<(), BanksClientError> {
    let to_token_account = create_associated_token_account(context, to, mint).await?;

    let from_token_account =
        safe_associated_token_account::get_associated_token_address(&from.pubkey(), mint);

    let tx = Transaction::new_signed_with_payer(
        &[safe_token::instruction::transfer(
            &safe_token::id(),
            &from_token_account,
            &to_token_account,
            &from.pubkey(),
            &[&from.pubkey()],
            1,
        )
        .unwrap()],
        Some(&from.pubkey()),
        &[from],
        context.last_blockhash,
    );

    context.banks_client.process_transaction(tx).await
}
