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
 * @category UnverifyCollection
 * @category generated
 */
export const UnverifyCollectionStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number;
}>([['instructionDiscriminator', beet.u8]], 'UnverifyCollectionInstructionArgs');
/**
 * Accounts required by the _UnverifyCollection_ instruction
 *
 * @property [_writable_] metadata Metadata account
 * @property [_writable_, **signer**] collectionAuthority Collection Authority
 * @property [] collectionMint Mint of the Collection
 * @property [] collection Metadata Account of the Collection
 * @property [] collectionMasterEditionAccount MasterEdition2 Account of the Collection Token
 * @property [] collectionAuthorityRecord (optional) Collection Authority Record PDA
 * @category Instructions
 * @category UnverifyCollection
 * @category generated
 */
export type UnverifyCollectionInstructionAccounts = {
  metadata: web3.PublicKey;
  collectionAuthority: web3.PublicKey;
  collectionMint: web3.PublicKey;
  collection: web3.PublicKey;
  collectionMasterEditionAccount: web3.PublicKey;
  collectionAuthorityRecord?: web3.PublicKey;
};

export const unverifyCollectionInstructionDiscriminator = 22;

/**
 * Creates a _UnverifyCollection_ instruction.
 *
 * Optional accounts that are not provided will be omitted from the accounts
 * array passed with the instruction.
 * An optional account that is set cannot follow an optional account that is unset.
 * Otherwise an Error is raised.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category UnverifyCollection
 * @category generated
 */
export function createUnverifyCollectionInstruction(
  accounts: UnverifyCollectionInstructionAccounts,
  programId = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
) {
  const [data] = UnverifyCollectionStruct.serialize({
    instructionDiscriminator: unverifyCollectionInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.metadata,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.collectionAuthority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.collectionMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.collection,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.collectionMasterEditionAccount,
      isWritable: false,
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
