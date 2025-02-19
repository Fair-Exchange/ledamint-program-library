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
 * @category Buy
 * @category generated
 */
export type BuyInstructionArgs = {
  tradeStateBump: number;
  escrowPaymentBump: number;
  auctioneerAuthorityBump: number;
  buyerPrice: beet.bignum;
  tokenSize: beet.bignum;
};
/**
 * @category Instructions
 * @category Buy
 * @category generated
 */
const buyStruct = new beet.BeetArgsStruct<
  BuyInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['tradeStateBump', beet.u8],
    ['escrowPaymentBump', beet.u8],
    ['auctioneerAuthorityBump', beet.u8],
    ['buyerPrice', beet.u64],
    ['tokenSize', beet.u64],
  ],
  'BuyInstructionArgs',
);
/**
 * Accounts required by the _buy_ instruction
 *
 * @property [] auctionHouseProgram
 * @property [_writable_] listingConfig
 * @property [] seller
 * @property [**signer**] wallet
 * @property [_writable_] paymentAccount
 * @property [] transferAuthority
 * @property [] treasuryMint
 * @property [] tokenAccount
 * @property [] metadata
 * @property [_writable_] escrowPaymentAccount
 * @property [] authority
 * @property [] auctionHouse
 * @property [_writable_] auctionHouseFeeAccount
 * @property [_writable_] buyerTradeState
 * @property [] auctioneerAuthority
 * @property [] ahAuctioneerPda
 * @category Instructions
 * @category Buy
 * @category generated
 */
export type BuyInstructionAccounts = {
  auctionHouseProgram: web3.PublicKey;
  listingConfig: web3.PublicKey;
  seller: web3.PublicKey;
  wallet: web3.PublicKey;
  paymentAccount: web3.PublicKey;
  transferAuthority: web3.PublicKey;
  treasuryMint: web3.PublicKey;
  tokenAccount: web3.PublicKey;
  metadata: web3.PublicKey;
  escrowPaymentAccount: web3.PublicKey;
  authority: web3.PublicKey;
  auctionHouse: web3.PublicKey;
  auctionHouseFeeAccount: web3.PublicKey;
  buyerTradeState: web3.PublicKey;
  auctioneerAuthority: web3.PublicKey;
  ahAuctioneerPda: web3.PublicKey;
};

const buyInstructionDiscriminator = [102, 6, 61, 18, 1, 218, 235, 234];

/**
 * Creates a _Buy_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category Buy
 * @category generated
 */
export function createBuyInstruction(accounts: BuyInstructionAccounts, args: BuyInstructionArgs) {
  const {
    auctionHouseProgram,
    listingConfig,
    seller,
    wallet,
    paymentAccount,
    transferAuthority,
    treasuryMint,
    tokenAccount,
    metadata,
    escrowPaymentAccount,
    authority,
    auctionHouse,
    auctionHouseFeeAccount,
    buyerTradeState,
    auctioneerAuthority,
    ahAuctioneerPda,
  } = accounts;

  const [data] = buyStruct.serialize({
    instructionDiscriminator: buyInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: auctionHouseProgram,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: listingConfig,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: seller,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: wallet,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: paymentAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: transferAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: treasuryMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: tokenAccount,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: metadata,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: escrowPaymentAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: authority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: auctionHouse,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: auctionHouseFeeAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: buyerTradeState,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: auctioneerAuthority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: ahAuctioneerPda,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey('neer8g6yJq2mQM6KbnViEDAD4gr3gRZyMMf4F2p3MEh'),
    keys,
    data,
  });
  return ix;
}
