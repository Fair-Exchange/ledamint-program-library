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
 * @category UpdatePrimarySaleHappenedViaToken
 * @category generated
 */
export const UpdatePrimarySaleHappenedViaTokenStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number;
}>([['instructionDiscriminator', beet.u8]], 'UpdatePrimarySaleHappenedViaTokenInstructionArgs');
/**
 * Accounts required by the _UpdatePrimarySaleHappenedViaToken_ instruction
 *
 * @property [_writable_] metadata Metadata key (pda of ['metadata', program id, mint id])
 * @property [**signer**] owner Owner on the token account
 * @property [] token Account containing tokens from the metadata's mint
 * @category Instructions
 * @category UpdatePrimarySaleHappenedViaToken
 * @category generated
 */
export type UpdatePrimarySaleHappenedViaTokenInstructionAccounts = {
  metadata: web3.PublicKey;
  owner: web3.PublicKey;
  token: web3.PublicKey;
};

export const updatePrimarySaleHappenedViaTokenInstructionDiscriminator = 4;

/**
 * Creates a _UpdatePrimarySaleHappenedViaToken_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category UpdatePrimarySaleHappenedViaToken
 * @category generated
 */
export function createUpdatePrimarySaleHappenedViaTokenInstruction(
  accounts: UpdatePrimarySaleHappenedViaTokenInstructionAccounts,
  programId = new web3.PublicKey('metXT2PkoCBucKkvmeQoYDNmncrPXGVCGacwqEHxcM5'),
) {
  const [data] = UpdatePrimarySaleHappenedViaTokenStruct.serialize({
    instructionDiscriminator: updatePrimarySaleHappenedViaTokenInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.metadata,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.owner,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.token,
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
