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
 * @category RemoveFreeze
 * @category generated
 */
export const removeFreezeStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */;
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'RemoveFreezeInstructionArgs',
);
/**
 * Accounts required by the _removeFreeze_ instruction
 *
 * @property [_writable_] candyMachine
 * @property [_writable_, **signer**] authority
 * @property [_writable_] freezePda
 * @category Instructions
 * @category RemoveFreeze
 * @category generated
 */
export type RemoveFreezeInstructionAccounts = {
  candyMachine: web3.PublicKey;
  authority: web3.PublicKey;
  freezePda: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const removeFreezeInstructionDiscriminator = [1, 212, 80, 168, 129, 60, 46, 251];

/**
 * Creates a _RemoveFreeze_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category RemoveFreeze
 * @category generated
 */
export function createRemoveFreezeInstruction(
  accounts: RemoveFreezeInstructionAccounts,
  programId = new web3.PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ'),
) {
  const [data] = removeFreezeStruct.serialize({
    instructionDiscriminator: removeFreezeInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.candyMachine,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.authority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.freezePda,
      isWritable: true,
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
