/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@safecoin/web3.js';

/**
 * @category Instructions
 * @category SetAndVerifySizedCollectionItem
 * @category generated
 */
export const SetAndVerifySizedCollectionItemStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number;
}>([['instructionDiscriminator', beet.u8]], 'SetAndVerifySizedCollectionItemInstructionArgs');
/**
 * Accounts required by the _SetAndVerifySizedCollectionItem_ instruction
 *
 * @property [_writable_] metadata Metadata account
 * @property [**signer**] collectionAuthority Collection Update authority
 * @property [_writable_, **signer**] payer payer
 * @property [] updateAuthority Update Authority of Collection NFT and NFT
 * @property [] collectionMint Mint of the Collection
 * @property [_writable_] collection Metadata Account of the Collection
 * @property [_writable_] collectionMasterEditionAccount MasterEdition2 Account of the Collection Token
 * @property [] collectionAuthorityRecord (optional) Collection Authority Record PDA
 * @category Instructions
 * @category SetAndVerifySizedCollectionItem
 * @category generated
 */
export type SetAndVerifySizedCollectionItemInstructionAccounts = {
  metadata: web3.PublicKey;
  collectionAuthority: web3.PublicKey;
  payer: web3.PublicKey;
  updateAuthority: web3.PublicKey;
  collectionMint: web3.PublicKey;
  collection: web3.PublicKey;
  collectionMasterEditionAccount: web3.PublicKey;
  collectionAuthorityRecord?: web3.PublicKey;
};

export const setAndVerifySizedCollectionItemInstructionDiscriminator = 32;

/**
 * Creates a _SetAndVerifySizedCollectionItem_ instruction.
 *
 * Optional accounts that are not provided will be omitted from the accounts
 * array passed with the instruction.
 * An optional account that is set cannot follow an optional account that is unset.
 * Otherwise an Error is raised.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category SetAndVerifySizedCollectionItem
 * @category generated
 */
export function createSetAndVerifySizedCollectionItemInstruction(
  accounts: SetAndVerifySizedCollectionItemInstructionAccounts,
  programId = new web3.PublicKey('metXT2PkoCBucKkvmeQoYDNmncrPXGVCGacwqEHxcM5'),
) {
  const [data] = SetAndVerifySizedCollectionItemStruct.serialize({
    instructionDiscriminator: setAndVerifySizedCollectionItemInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.metadata,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.collectionAuthority,
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
      pubkey: accounts.collectionMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.collection,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.collectionMasterEditionAccount,
      isWritable: true,
      isSigner: false,
    },
  ];

  if (accounts.collectionAuthorityRecord != null) {
    keys.push({
      pubkey: accounts.collectionAuthorityRecord,
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
