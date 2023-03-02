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
 * @category ThawNft
 * @category generated
 */
export const thawNftStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */;
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'ThawNftInstructionArgs',
);
/**
 * Accounts required by the _thawNft_ instruction
 *
 * @property [_writable_] freezePda
 * @property [_writable_] candyMachine
 * @property [_writable_] tokenAccount
 * @property [] owner
 * @property [] mint
 * @property [] edition
 * @property [_writable_, **signer**] payer
 * @property [] tokenMetadataProgram
 * @category Instructions
 * @category ThawNft
 * @category generated
 */
export type ThawNftInstructionAccounts = {
  freezePda: web3.PublicKey;
  candyMachine: web3.PublicKey;
  tokenAccount: web3.PublicKey;
  owner: web3.PublicKey;
  mint: web3.PublicKey;
  edition: web3.PublicKey;
  payer: web3.PublicKey;
  tokenProgram?: web3.PublicKey;
  tokenMetadataProgram: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const thawNftInstructionDiscriminator = [92, 44, 210, 187, 172, 6, 64, 183];

/**
 * Creates a _ThawNft_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category ThawNft
 * @category generated
 */
export function createThawNftInstruction(
  accounts: ThawNftInstructionAccounts,
  programId = new web3.PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ'),
) {
  const [data] = thawNftStruct.serialize({
    instructionDiscriminator: thawNftInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.freezePda,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.candyMachine,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.owner,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.mint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.edition,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.payer,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenMetadataProgram,
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
