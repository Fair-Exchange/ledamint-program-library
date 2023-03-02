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
 * @category RevokeUseAuthority
 * @category generated
 */
export const RevokeUseAuthorityStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number;
}>([['instructionDiscriminator', beet.u8]], 'RevokeUseAuthorityInstructionArgs');
/**
 * Accounts required by the _RevokeUseAuthority_ instruction
 *
 * @property [_writable_] useAuthorityRecord Use Authority Record PDA
 * @property [_writable_, **signer**] owner Owner
 * @property [] user A Use Authority
 * @property [_writable_] ownerTokenAccount Owned Token Account Of Mint
 * @property [] mint Mint of Metadata
 * @property [] metadata Metadata account
 * @category Instructions
 * @category RevokeUseAuthority
 * @category generated
 */
export type RevokeUseAuthorityInstructionAccounts = {
  useAuthorityRecord: web3.PublicKey;
  owner: web3.PublicKey;
  user: web3.PublicKey;
  ownerTokenAccount: web3.PublicKey;
  mint: web3.PublicKey;
  metadata: web3.PublicKey;
  tokenProgram?: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  rent?: web3.PublicKey;
};

export const revokeUseAuthorityInstructionDiscriminator = 21;

/**
 * Creates a _RevokeUseAuthority_ instruction.
 *
 * Optional accounts that are not provided will be omitted from the accounts
 * array passed with the instruction.
 * An optional account that is set cannot follow an optional account that is unset.
 * Otherwise an Error is raised.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category RevokeUseAuthority
 * @category generated
 */
export function createRevokeUseAuthorityInstruction(
  accounts: RevokeUseAuthorityInstructionAccounts,
  programId = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
) {
  const [data] = RevokeUseAuthorityStruct.serialize({
    instructionDiscriminator: revokeUseAuthorityInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.useAuthorityRecord,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.owner,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.user,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.ownerTokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.mint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.metadata,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ];

  if (accounts.rent != null) {
    keys.push({
      pubkey: accounts.rent,
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
