/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@safecoin/web3.js';
import { CreateArgs, createArgsBeet } from '../types/CreateArgs';

/**
 * @category Instructions
 * @category Create
 * @category generated
 */
export type CreateInstructionArgs = {
  createArgs: CreateArgs;
};
/**
 * @category Instructions
 * @category Create
 * @category generated
 */
export const CreateStruct = new beet.FixableBeetArgsStruct<
  CreateInstructionArgs & {
    instructionDiscriminator: number;
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ['createArgs', createArgsBeet],
  ],
  'CreateInstructionArgs',
);
/**
 * Accounts required by the _Create_ instruction
 *
 * @property [_writable_] metadata Unallocated metadata account with address as pda of ['metadata', program id, mint id]
 * @property [_writable_] masterEdition (optional) Unallocated edition account with address as pda of ['metadata', program id, mint, 'edition']
 * @property [_writable_] mint Mint of token asset
 * @property [**signer**] authority Mint authority
 * @property [_writable_, **signer**] payer Payer
 * @property [] updateAuthority Update authority for the metadata account
 * @property [] sysvarInstructions Instructions sysvar account
 * @property [] splTokenProgram SPL Token program
 * @category Instructions
 * @category Create
 * @category generated
 */
export type CreateInstructionAccounts = {
  metadata: web3.PublicKey;
  masterEdition?: web3.PublicKey;
  mint: web3.PublicKey;
  authority: web3.PublicKey;
  payer: web3.PublicKey;
  updateAuthority: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  sysvarInstructions: web3.PublicKey;
  splTokenProgram: web3.PublicKey;
};

export const createInstructionDiscriminator = 42;

/**
 * Creates a _Create_ instruction.
 *
 * Optional accounts that are not provided default to the program ID since
 * this was indicated in the IDL from which this instruction was generated.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category Create
 * @category generated
 */
export function createCreateInstruction(
  accounts: CreateInstructionAccounts,
  args: CreateInstructionArgs,
  programId = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
) {
  const [data] = CreateStruct.serialize({
    instructionDiscriminator: createInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.metadata,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.masterEdition ?? programId,
      isWritable: accounts.masterEdition != null,
      isSigner: false,
    },
    {
      pubkey: accounts.mint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.authority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.payer,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.updateAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.sysvarInstructions,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.splTokenProgram,
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
