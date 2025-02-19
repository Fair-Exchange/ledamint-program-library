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
 * Arguments used to create {@link TradeHistory}
 * @category Accounts
 * @category generated
 */
export type TradeHistoryArgs = {
  market: web3.PublicKey;
  wallet: web3.PublicKey;
  alreadyBought: beet.bignum;
};

export const tradeHistoryDiscriminator = [190, 117, 218, 114, 66, 112, 56, 41];
/**
 * Holds the data for the {@link TradeHistory} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class TradeHistory implements TradeHistoryArgs {
  private constructor(
    readonly market: web3.PublicKey,
    readonly wallet: web3.PublicKey,
    readonly alreadyBought: beet.bignum,
  ) {}

  /**
   * Creates a {@link TradeHistory} instance from the provided args.
   */
  static fromArgs(args: TradeHistoryArgs) {
    return new TradeHistory(args.market, args.wallet, args.alreadyBought);
  }

  /**
   * Deserializes the {@link TradeHistory} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0,
  ): [TradeHistory, number] {
    return TradeHistory.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link TradeHistory} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig,
  ): Promise<TradeHistory> {
    const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
    if (accountInfo == null) {
      throw new Error(`Unable to find TradeHistory account at ${address}`);
    }
    return TradeHistory.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey('SaLeTjyUa5wXHnGuewUSyJ5JWZaHwz3TxqUntCE9czo'),
  ) {
    return beetSafecoin.GpaBuilder.fromStruct(programId, tradeHistoryBeet);
  }

  /**
   * Deserializes the {@link TradeHistory} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [TradeHistory, number] {
    return tradeHistoryBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link TradeHistory} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return tradeHistoryBeet.serialize({
      accountDiscriminator: tradeHistoryDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link TradeHistory}
   */
  static get byteSize() {
    return tradeHistoryBeet.byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link TradeHistory} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment,
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(TradeHistory.byteSize, commitment);
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link TradeHistory} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset === TradeHistory.byteSize;
  }

  /**
   * Returns a readable version of {@link TradeHistory} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      market: this.market.toBase58(),
      wallet: this.wallet.toBase58(),
      alreadyBought: (() => {
        const x = <{ toNumber: () => number }>this.alreadyBought;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const tradeHistoryBeet = new beet.BeetStruct<
  TradeHistory,
  TradeHistoryArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['market', beetSafecoin.publicKey],
    ['wallet', beetSafecoin.publicKey],
    ['alreadyBought', beet.u64],
  ],
  TradeHistory.fromArgs,
  'TradeHistory',
);
