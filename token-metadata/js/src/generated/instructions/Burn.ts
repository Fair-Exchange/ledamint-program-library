/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@safecoin/web3.js';
import { BurnArgs, burnArgsBeet } from '../types/BurnArgs';

/**
 * @category Instructions
 * @category Burn
 * @category generated
 */
export type BurnInstructionArgs = {
  burnArgs: BurnArgs;
};
/**
 * @category Instructions
 * @category Burn
 * @category generated
 */
export const BurnStruct = new beet.FixableBeetArgsStruct<
  BurnInstructionArgs & {
    instructionDiscriminator: number;
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ['burnArgs', burnArgsBeet],
  ],
  'BurnInstructionArgs',
);
/**
 * Accounts required by the _Burn_ instruction
 *
 * @property [_writable_, **signer**] authority Asset owner or Utility delegate
 * @property [_writable_] collectionMetadata (optional) Metadata of the Collection
 * @property [_writable_] metadata Metadata (pda of ['metadata', program id, mint id])
 * @property [_writable_] edition (optional) Edition of the asset
 * @property [_writable_] mint Mint of token asset
 * @property [_writable_] token Token account to close
 * @property [_writable_] masterEdition (optional) Master edition account
 * @property [] masterEditionMint (optional) Master edition mint of the asset
 * @property [] masterEditionToken (optional) Master edition token account
 * @property [_writable_] editionMarker (optional) Edition marker account
 * @property [_writable_] tokenRecord (optional) Token record account
 * @property [] sysvarInstructions Instructions sysvar account
 * @property [] splTokenProgram SPL Token Program
 * @category Instructions
 * @category Burn
 * @category generated
 */
export type BurnInstructionAccounts = {
  authority: web3.PublicKey;
  collectionMetadata?: web3.PublicKey;
  metadata: web3.PublicKey;
  edition?: web3.PublicKey;
  mint: web3.PublicKey;
  token: web3.PublicKey;
  masterEdition?: web3.PublicKey;
  masterEditionMint?: web3.PublicKey;
  masterEditionToken?: web3.PublicKey;
  editionMarker?: web3.PublicKey;
  tokenRecord?: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  sysvarInstructions: web3.PublicKey;
  splTokenProgram: web3.PublicKey;
};

export const burnInstructionDiscriminator = 41;

/**
 * Creates a _Burn_ instruction.
 *
 * Optional accounts that are not provided default to the program ID since
 * this was indicated in the IDL from which this instruction was generated.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category Burn
 * @category generated
 */
export function createBurnInstruction(
  accounts: BurnInstructionAccounts,
  args: BurnInstructionArgs,
  programId = new web3.PublicKey('metXT2PkoCBucKkvmeQoYDNmncrPXGVCGacwqEHxcM5'),
) {
  const [data] = BurnStruct.serialize({
    instructionDiscriminator: burnInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.authority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.collectionMetadata ?? programId,
      isWritable: accounts.collectionMetadata != null,
      isSigner: false,
    },
    {
      pubkey: accounts.metadata,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.edition ?? programId,
      isWritable: accounts.edition != null,
      isSigner: false,
    },
    {
      pubkey: accounts.mint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.token,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.masterEdition ?? programId,
      isWritable: accounts.masterEdition != null,
      isSigner: false,
    },
    {
      pubkey: accounts.masterEditionMint ?? programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.masterEditionToken ?? programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.editionMarker ?? programId,
      isWritable: accounts.editionMarker != null,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenRecord ?? programId,
      isWritable: accounts.tokenRecord != null,
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
