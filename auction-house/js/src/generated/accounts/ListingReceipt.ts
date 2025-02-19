/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@safecoin/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSafecoin from '@metaplex-foundation/beet-solana';

/**
 * Arguments used to create {@link ListingReceipt}
 * @category Accounts
 * @category generated
 */
export type ListingReceiptArgs = {
  tradeState: web3.PublicKey;
  bookkeeper: web3.PublicKey;
  auctionHouse: web3.PublicKey;
  seller: web3.PublicKey;
  metadata: web3.PublicKey;
  purchaseReceipt: beet.COption<web3.PublicKey>;
  price: beet.bignum;
  tokenSize: beet.bignum;
  bump: number;
  tradeStateBump: number;
  createdAt: beet.bignum;
  canceledAt: beet.COption<beet.bignum>;
};

export const listingReceiptDiscriminator = [240, 71, 225, 94, 200, 75, 84, 231];
/**
 * Holds the data for the {@link ListingReceipt} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class ListingReceipt implements ListingReceiptArgs {
  private constructor(
    readonly tradeState: web3.PublicKey,
    readonly bookkeeper: web3.PublicKey,
    readonly auctionHouse: web3.PublicKey,
    readonly seller: web3.PublicKey,
    readonly metadata: web3.PublicKey,
    readonly purchaseReceipt: beet.COption<web3.PublicKey>,
    readonly price: beet.bignum,
    readonly tokenSize: beet.bignum,
    readonly bump: number,
    readonly tradeStateBump: number,
    readonly createdAt: beet.bignum,
    readonly canceledAt: beet.COption<beet.bignum>,
  ) {}

  /**
   * Creates a {@link ListingReceipt} instance from the provided args.
   */
  static fromArgs(args: ListingReceiptArgs) {
    return new ListingReceipt(
      args.tradeState,
      args.bookkeeper,
      args.auctionHouse,
      args.seller,
      args.metadata,
      args.purchaseReceipt,
      args.price,
      args.tokenSize,
      args.bump,
      args.tradeStateBump,
      args.createdAt,
      args.canceledAt,
    );
  }

  /**
   * Deserializes the {@link ListingReceipt} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0,
  ): [ListingReceipt, number] {
    return ListingReceipt.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link ListingReceipt} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
  ): Promise<ListingReceipt> {
    const accountInfo = await connection.getAccountInfo(address);
    if (accountInfo == null) {
      throw new Error(`Unable to find ListingReceipt account at ${address}`);
    }
    return ListingReceipt.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey('hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk'),
  ) {
    return beetSafecoin.GpaBuilder.fromStruct(programId, listingReceiptBeet);
  }

  /**
   * Deserializes the {@link ListingReceipt} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [ListingReceipt, number] {
    return listingReceiptBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link ListingReceipt} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return listingReceiptBeet.serialize({
      accountDiscriminator: listingReceiptDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link ListingReceipt} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: ListingReceiptArgs) {
    const instance = ListingReceipt.fromArgs(args);
    return listingReceiptBeet.toFixedFromValue({
      accountDiscriminator: listingReceiptDiscriminator,
      ...instance,
    }).byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link ListingReceipt} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: ListingReceiptArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment,
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(ListingReceipt.byteSize(args), commitment);
  }

  /**
   * Returns a readable version of {@link ListingReceipt} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      tradeState: this.tradeState.toBase58(),
      bookkeeper: this.bookkeeper.toBase58(),
      auctionHouse: this.auctionHouse.toBase58(),
      seller: this.seller.toBase58(),
      metadata: this.metadata.toBase58(),
      purchaseReceipt: this.purchaseReceipt,
      price: (() => {
        const x = <{ toNumber: () => number }>this.price;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      tokenSize: (() => {
        const x = <{ toNumber: () => number }>this.tokenSize;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      bump: this.bump,
      tradeStateBump: this.tradeStateBump,
      createdAt: (() => {
        const x = <{ toNumber: () => number }>this.createdAt;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      canceledAt: this.canceledAt,
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const listingReceiptBeet = new beet.FixableBeetStruct<
  ListingReceipt,
  ListingReceiptArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['tradeState', beetSafecoin.publicKey],
    ['bookkeeper', beetSafecoin.publicKey],
    ['auctionHouse', beetSafecoin.publicKey],
    ['seller', beetSafecoin.publicKey],
    ['metadata', beetSafecoin.publicKey],
    ['purchaseReceipt', beet.coption(beetSafecoin.publicKey)],
    ['price', beet.u64],
    ['tokenSize', beet.u64],
    ['bump', beet.u8],
    ['tradeStateBump', beet.u8],
    ['createdAt', beet.i64],
    ['canceledAt', beet.coption(beet.i64)],
  ],
  ListingReceipt.fromArgs,
  'ListingReceipt',
);
