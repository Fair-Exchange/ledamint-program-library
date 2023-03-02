/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@safecoin/web3.js';
import { MetadataArgs, metadataArgsBeet } from '../types/MetadataArgs';

/**
 * @category Instructions
 * @category VerifyCreator
 * @category generated
 */
export type VerifyCreatorInstructionArgs = {
  root: number[] /* size: 32 */;
  dataHash: number[] /* size: 32 */;
  creatorHash: number[] /* size: 32 */;
  nonce: beet.bignum;
  index: number;
  message: MetadataArgs;
};
/**
 * @category Instructions
 * @category VerifyCreator
 * @category generated
 */
export const verifyCreatorStruct = new beet.FixableBeetArgsStruct<
  VerifyCreatorInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['root', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['dataHash', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['creatorHash', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['nonce', beet.u64],
    ['index', beet.u32],
    ['message', metadataArgsBeet],
  ],
  'VerifyCreatorInstructionArgs',
);
/**
 * Accounts required by the _verifyCreator_ instruction
 *
 * @property [] treeAuthority
 * @property [] leafOwner
 * @property [] leafDelegate
 * @property [_writable_] merkleTree
 * @property [**signer**] payer
 * @property [**signer**] creator
 * @property [] logWrapper
 * @property [] compressionProgram
 * @category Instructions
 * @category VerifyCreator
 * @category generated
 */
export type VerifyCreatorInstructionAccounts = {
  treeAuthority: web3.PublicKey;
  leafOwner: web3.PublicKey;
  leafDelegate: web3.PublicKey;
  merkleTree: web3.PublicKey;
  payer: web3.PublicKey;
  creator: web3.PublicKey;
  logWrapper: web3.PublicKey;
  compressionProgram: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const verifyCreatorInstructionDiscriminator = [52, 17, 96, 132, 71, 4, 85, 194];

/**
 * Creates a _VerifyCreator_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category VerifyCreator
 * @category generated
 */
export function createVerifyCreatorInstruction(
  accounts: VerifyCreatorInstructionAccounts,
  args: VerifyCreatorInstructionArgs,
  programId = new web3.PublicKey('BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'),
) {
  const [data] = verifyCreatorStruct.serialize({
    instructionDiscriminator: verifyCreatorInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.treeAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.leafOwner,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.leafDelegate,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.merkleTree,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.payer,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.creator,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.logWrapper,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.compressionProgram,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ];

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc);
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
