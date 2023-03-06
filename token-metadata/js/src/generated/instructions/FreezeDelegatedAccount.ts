/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from '@safecoin/safe-token';
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@safecoin/web3.js';

/**
 * @category Instructions
 * @category FreezeDelegatedAccount
 * @category generated
 */
export const FreezeDelegatedAccountStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number;
}>([['instructionDiscriminator', beet.u8]], 'FreezeDelegatedAccountInstructionArgs');
/**
 * Accounts required by the _FreezeDelegatedAccount_ instruction
 *
 * @property [_writable_, **signer**] delegate Delegate
 * @property [_writable_] tokenAccount Token account to freeze
 * @property [] edition Edition
 * @property [] mint Token mint
 * @category Instructions
 * @category FreezeDelegatedAccount
 * @category generated
 */
export type FreezeDelegatedAccountInstructionAccounts = {
  delegate: web3.PublicKey;
  tokenAccount: web3.PublicKey;
  edition: web3.PublicKey;
  mint: web3.PublicKey;
  tokenProgram?: web3.PublicKey;
};

export const freezeDelegatedAccountInstructionDiscriminator = 26;

/**
 * Creates a _FreezeDelegatedAccount_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category FreezeDelegatedAccount
 * @category generated
 */
export function createFreezeDelegatedAccountInstruction(
  accounts: FreezeDelegatedAccountInstructionAccounts,
  programId = new web3.PublicKey('metXT2PkoCBucKkvmeQoYDNmncrPXGVCGacwqEHxcM5'),
) {
  const [data] = FreezeDelegatedAccountStruct.serialize({
    instructionDiscriminator: freezeDelegatedAccountInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.delegate,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.tokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.edition,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.mint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
