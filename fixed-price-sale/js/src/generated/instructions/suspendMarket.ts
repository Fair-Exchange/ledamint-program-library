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
 * @category SuspendMarket
 * @category generated
 */
export const suspendMarketStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */;
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'SuspendMarketInstructionArgs',
);
/**
 * Accounts required by the _suspendMarket_ instruction
 *
 * @property [_writable_] market
 * @property [**signer**] owner
 * @property [] clock
 * @category Instructions
 * @category SuspendMarket
 * @category generated
 */
export type SuspendMarketInstructionAccounts = {
  market: web3.PublicKey;
  owner: web3.PublicKey;
  clock: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const suspendMarketInstructionDiscriminator = [246, 27, 129, 46, 10, 196, 165, 118];

/**
 * Creates a _SuspendMarket_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category SuspendMarket
 * @category generated
 */
export function createSuspendMarketInstruction(
  accounts: SuspendMarketInstructionAccounts,
  programId = new web3.PublicKey('SaLeTjyUa5wXHnGuewUSyJ5JWZaHwz3TxqUntCE9czo'),
) {
  const [data] = suspendMarketStruct.serialize({
    instructionDiscriminator: suspendMarketInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.market,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.owner,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.clock,
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
