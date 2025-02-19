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
 * @category CreateStore
 * @category generated
 */
export type CreateStoreInstructionArgs = {
  name: string;
  description: string;
};
/**
 * @category Instructions
 * @category CreateStore
 * @category generated
 */
export const createStoreStruct = new beet.FixableBeetArgsStruct<
  CreateStoreInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['name', beet.utf8String],
    ['description', beet.utf8String],
  ],
  'CreateStoreInstructionArgs',
);
/**
 * Accounts required by the _createStore_ instruction
 *
 * @property [_writable_, **signer**] admin
 * @property [_writable_, **signer**] store
 * @category Instructions
 * @category CreateStore
 * @category generated
 */
export type CreateStoreInstructionAccounts = {
  admin: web3.PublicKey;
  store: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const createStoreInstructionDiscriminator = [132, 152, 9, 27, 112, 19, 95, 83];

/**
 * Creates a _CreateStore_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateStore
 * @category generated
 */
export function createCreateStoreInstruction(
  accounts: CreateStoreInstructionAccounts,
  args: CreateStoreInstructionArgs,
  programId = new web3.PublicKey('SaLeTjyUa5wXHnGuewUSyJ5JWZaHwz3TxqUntCE9czo'),
) {
  const [data] = createStoreStruct.serialize({
    instructionDiscriminator: createStoreInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.admin,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.store,
      isWritable: true,
      isSigner: true,
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
