/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@safecoin/web3.js';
import {
  RequestCardToRedeemArgs,
  requestCardToRedeemArgsBeet,
} from '../types/RequestCardToRedeemArgs';

/**
 * @category Instructions
 * @category RequestCardForRedeem
 * @category generated
 */
export type RequestCardForRedeemInstructionArgs = {
  requestCardToRedeemArgs: RequestCardToRedeemArgs;
};
/**
 * @category Instructions
 * @category RequestCardForRedeem
 * @category generated
 */
export const RequestCardForRedeemStruct = new beet.BeetArgsStruct<
  RequestCardForRedeemInstructionArgs & {
    instructionDiscriminator: number;
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ['requestCardToRedeemArgs', requestCardToRedeemArgsBeet],
  ],
  'RequestCardForRedeemInstructionArgs',
);
/**
 * Accounts required by the _RequestCardForRedeem_ instruction
 *
 * @property [] packSet
 * @property [_writable_] packConfig PDA, ['config', pack]
 * @property [] store
 * @property [] edition
 * @property [] editionMint
 * @property [] packVoucher
 * @property [_writable_] provingProcess PDA, ['proving', pack, user_wallet]
 * @property [**signer**] userWallet
 * @property [] recentSlothashes Safecoin Slot Hashes
 * @property [] clock Safecoin Clock
 * @property [] userToken (optional)
 * @category Instructions
 * @category RequestCardForRedeem
 * @category generated
 */
export type RequestCardForRedeemInstructionAccounts = {
  packSet: web3.PublicKey;
  packConfig: web3.PublicKey;
  store: web3.PublicKey;
  edition: web3.PublicKey;
  editionMint: web3.PublicKey;
  packVoucher: web3.PublicKey;
  provingProcess: web3.PublicKey;
  userWallet: web3.PublicKey;
  recentSlothashes: web3.PublicKey;
  clock: web3.PublicKey;
  rent?: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  userToken?: web3.PublicKey;
};

export const requestCardForRedeemInstructionDiscriminator = 12;

/**
 * Creates a _RequestCardForRedeem_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category RequestCardForRedeem
 * @category generated
 */
export function createRequestCardForRedeemInstruction(
  accounts: RequestCardForRedeemInstructionAccounts,
  args: RequestCardForRedeemInstructionArgs,
  programId = new web3.PublicKey('packFeFNZzMfD9aVWL7QbGz1WcU7R9zpf6pvNsw2BLu'),
) {
  const [data] = RequestCardForRedeemStruct.serialize({
    instructionDiscriminator: requestCardForRedeemInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.packSet,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.packConfig,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.store,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.edition,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.editionMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.packVoucher,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.provingProcess,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.userWallet,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.recentSlothashes,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.clock,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.rent ?? web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ];

  if (accounts.userToken != null) {
    keys.push({
      pubkey: accounts.userToken,
      isWritable: false,
      isSigner: false,
    });
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
