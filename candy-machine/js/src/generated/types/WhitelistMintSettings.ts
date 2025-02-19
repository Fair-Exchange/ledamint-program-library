/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@safecoin/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSafecoin from '@metaplex-foundation/beet-solana';
import { WhitelistMintMode, whitelistMintModeBeet } from './WhitelistMintMode';
export type WhitelistMintSettings = {
  mode: WhitelistMintMode;
  mint: web3.PublicKey;
  presale: boolean;
  discountPrice: beet.COption<beet.bignum>;
};

/**
 * @category userTypes
 * @category generated
 */
export const whitelistMintSettingsBeet = new beet.FixableBeetArgsStruct<WhitelistMintSettings>(
  [
    ['mode', whitelistMintModeBeet],
    ['mint', beetSafecoin.publicKey],
    ['presale', beet.bool],
    ['discountPrice', beet.coption(beet.u64)],
  ],
  'WhitelistMintSettings',
);
