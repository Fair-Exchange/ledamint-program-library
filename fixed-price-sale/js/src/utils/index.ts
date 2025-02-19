import { Connection, PublicKey } from '@safecoin/web3.js';
import { PROGRAM_ID } from '../generated';
import { Account as TokenAccount } from '@safecoin/safe-token';
import { assertNft, assertNftPrintEdition, Metaplex } from '@metaplex-foundation/js';

const VAULT_OWNER_PREFIX = 'mt_vault';
const HISTORY_PREFIX = 'history';
const PAYOUT_TICKET_PREFIX = 'payout_ticket';
const HOLDER_PREFIX = 'holder';
const PRIMARY_METADATA_CREATORS_PREFIX = 'primary_creators';

export const findVaultOwnerAddress = (
  mint: PublicKey,
  store: PublicKey,
): Promise<[PublicKey, number]> =>
  PublicKey.findProgramAddress(
    [Buffer.from(VAULT_OWNER_PREFIX), mint.toBuffer(), store.toBuffer()],
    PROGRAM_ID,
  );

export const findTreasuryOwnerAddress = (
  treasuryMint: PublicKey,
  sellingResource: PublicKey,
): Promise<[PublicKey, number]> =>
  PublicKey.findProgramAddress(
    [Buffer.from(HOLDER_PREFIX), treasuryMint.toBuffer(), sellingResource.toBuffer()],
    PROGRAM_ID,
  );

export const findTradeHistoryAddress = (
  wallet: PublicKey,
  market: PublicKey,
): Promise<[PublicKey, number]> =>
  PublicKey.findProgramAddress(
    [Buffer.from(HISTORY_PREFIX), wallet.toBuffer(), market.toBuffer()],
    PROGRAM_ID,
  );

export const findPayoutTicketAddress = (
  market: PublicKey,
  funder: PublicKey,
): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [Buffer.from(PAYOUT_TICKET_PREFIX), market.toBuffer(), funder.toBuffer()],
    PROGRAM_ID,
  );
};

export const findPrimaryMetadataCreatorsAddress = (
  metadata: PublicKey,
): Promise<[PublicKey, number]> =>
  PublicKey.findProgramAddress(
    [Buffer.from(PRIMARY_METADATA_CREATORS_PREFIX), metadata.toBuffer()],
    PROGRAM_ID,
  );

export const validateMembershipToken = async (
  connection: Connection,
  me: PublicKey,
  ta: TokenAccount,
) => {
  const metaplex = Metaplex.make(connection);
  const nft = await metaplex.nfts().findByMint({ mintAddress: ta.mint });
  assertNft(nft);
  assertNftPrintEdition(nft.edition);
  return nft.edition.parent.equals(me);
};
