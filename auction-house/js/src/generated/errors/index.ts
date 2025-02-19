/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

type ErrorWithCode = Error & { code: number };
type MaybeErrorWithCode = ErrorWithCode | null | undefined;

const createErrorFromCodeLookup: Map<number, () => ErrorWithCode> = new Map();
const createErrorFromNameLookup: Map<string, () => ErrorWithCode> = new Map();

/**
 * PublicKeyMismatch: 'PublicKeyMismatch'
 *
 * @category Errors
 * @category generated
 */
export class PublicKeyMismatchError extends Error {
  readonly code: number = 0x1770;
  readonly name: string = 'PublicKeyMismatch';
  constructor() {
    super('PublicKeyMismatch');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, PublicKeyMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x1770, () => new PublicKeyMismatchError());
createErrorFromNameLookup.set('PublicKeyMismatch', () => new PublicKeyMismatchError());

/**
 * InvalidMintAuthority: 'InvalidMintAuthority'
 *
 * @category Errors
 * @category generated
 */
export class InvalidMintAuthorityError extends Error {
  readonly code: number = 0x1771;
  readonly name: string = 'InvalidMintAuthority';
  constructor() {
    super('InvalidMintAuthority');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidMintAuthorityError);
    }
  }
}

createErrorFromCodeLookup.set(0x1771, () => new InvalidMintAuthorityError());
createErrorFromNameLookup.set('InvalidMintAuthority', () => new InvalidMintAuthorityError());

/**
 * UninitializedAccount: 'UninitializedAccount'
 *
 * @category Errors
 * @category generated
 */
export class UninitializedAccountError extends Error {
  readonly code: number = 0x1772;
  readonly name: string = 'UninitializedAccount';
  constructor() {
    super('UninitializedAccount');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, UninitializedAccountError);
    }
  }
}

createErrorFromCodeLookup.set(0x1772, () => new UninitializedAccountError());
createErrorFromNameLookup.set('UninitializedAccount', () => new UninitializedAccountError());

/**
 * IncorrectOwner: 'IncorrectOwner'
 *
 * @category Errors
 * @category generated
 */
export class IncorrectOwnerError extends Error {
  readonly code: number = 0x1773;
  readonly name: string = 'IncorrectOwner';
  constructor() {
    super('IncorrectOwner');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, IncorrectOwnerError);
    }
  }
}

createErrorFromCodeLookup.set(0x1773, () => new IncorrectOwnerError());
createErrorFromNameLookup.set('IncorrectOwner', () => new IncorrectOwnerError());

/**
 * PublicKeysShouldBeUnique: 'PublicKeysShouldBeUnique'
 *
 * @category Errors
 * @category generated
 */
export class PublicKeysShouldBeUniqueError extends Error {
  readonly code: number = 0x1774;
  readonly name: string = 'PublicKeysShouldBeUnique';
  constructor() {
    super('PublicKeysShouldBeUnique');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, PublicKeysShouldBeUniqueError);
    }
  }
}

createErrorFromCodeLookup.set(0x1774, () => new PublicKeysShouldBeUniqueError());
createErrorFromNameLookup.set(
  'PublicKeysShouldBeUnique',
  () => new PublicKeysShouldBeUniqueError(),
);

/**
 * StatementFalse: 'StatementFalse'
 *
 * @category Errors
 * @category generated
 */
export class StatementFalseError extends Error {
  readonly code: number = 0x1775;
  readonly name: string = 'StatementFalse';
  constructor() {
    super('StatementFalse');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, StatementFalseError);
    }
  }
}

createErrorFromCodeLookup.set(0x1775, () => new StatementFalseError());
createErrorFromNameLookup.set('StatementFalse', () => new StatementFalseError());

/**
 * NotRentExempt: 'NotRentExempt'
 *
 * @category Errors
 * @category generated
 */
export class NotRentExemptError extends Error {
  readonly code: number = 0x1776;
  readonly name: string = 'NotRentExempt';
  constructor() {
    super('NotRentExempt');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NotRentExemptError);
    }
  }
}

createErrorFromCodeLookup.set(0x1776, () => new NotRentExemptError());
createErrorFromNameLookup.set('NotRentExempt', () => new NotRentExemptError());

/**
 * NumericalOverflow: 'NumericalOverflow'
 *
 * @category Errors
 * @category generated
 */
export class NumericalOverflowError extends Error {
  readonly code: number = 0x1777;
  readonly name: string = 'NumericalOverflow';
  constructor() {
    super('NumericalOverflow');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NumericalOverflowError);
    }
  }
}

createErrorFromCodeLookup.set(0x1777, () => new NumericalOverflowError());
createErrorFromNameLookup.set('NumericalOverflow', () => new NumericalOverflowError());

/**
 * ExpectedSafeAccount: 'Expected a sol account but got an spl token account instead'
 *
 * @category Errors
 * @category generated
 */
export class ExpectedSafeAccountError extends Error {
  readonly code: number = 0x1778;
  readonly name: string = 'ExpectedSafeAccount';
  constructor() {
    super('Expected a sol account but got an spl token account instead');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ExpectedSafeAccountError);
    }
  }
}

createErrorFromCodeLookup.set(0x1778, () => new ExpectedSafeAccountError());
createErrorFromNameLookup.set('ExpectedSafeAccount', () => new ExpectedSafeAccountError());

/**
 * CannotExchangeSAFEForSafe: 'Cannot exchange sol for sol'
 *
 * @category Errors
 * @category generated
 */
export class CannotExchangeSAFEForSafeError extends Error {
  readonly code: number = 0x1779;
  readonly name: string = 'CannotExchangeSAFEForSafe';
  constructor() {
    super('Cannot exchange sol for sol');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotExchangeSAFEForSafeError);
    }
  }
}

createErrorFromCodeLookup.set(0x1779, () => new CannotExchangeSAFEForSafeError());
createErrorFromNameLookup.set('CannotExchangeSAFEForSafe', () => new CannotExchangeSAFEForSafeError());

/**
 * SAFEWalletMustSign: 'If paying with sol, sol wallet must be signer'
 *
 * @category Errors
 * @category generated
 */
export class SAFEWalletMustSignError extends Error {
  readonly code: number = 0x177a;
  readonly name: string = 'SAFEWalletMustSign';
  constructor() {
    super('If paying with sol, sol wallet must be signer');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SAFEWalletMustSignError);
    }
  }
}

createErrorFromCodeLookup.set(0x177a, () => new SAFEWalletMustSignError());
createErrorFromNameLookup.set('SAFEWalletMustSign', () => new SAFEWalletMustSignError());

/**
 * CannotTakeThisActionWithoutAuctionHouseSignOff: 'Cannot take this action without auction house signing too'
 *
 * @category Errors
 * @category generated
 */
export class CannotTakeThisActionWithoutAuctionHouseSignOffError extends Error {
  readonly code: number = 0x177b;
  readonly name: string = 'CannotTakeThisActionWithoutAuctionHouseSignOff';
  constructor() {
    super('Cannot take this action without auction house signing too');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotTakeThisActionWithoutAuctionHouseSignOffError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x177b,
  () => new CannotTakeThisActionWithoutAuctionHouseSignOffError(),
);
createErrorFromNameLookup.set(
  'CannotTakeThisActionWithoutAuctionHouseSignOff',
  () => new CannotTakeThisActionWithoutAuctionHouseSignOffError(),
);

/**
 * NoPayerPresent: 'No payer present on this txn'
 *
 * @category Errors
 * @category generated
 */
export class NoPayerPresentError extends Error {
  readonly code: number = 0x177c;
  readonly name: string = 'NoPayerPresent';
  constructor() {
    super('No payer present on this txn');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NoPayerPresentError);
    }
  }
}

createErrorFromCodeLookup.set(0x177c, () => new NoPayerPresentError());
createErrorFromNameLookup.set('NoPayerPresent', () => new NoPayerPresentError());

/**
 * DerivedKeyInvalid: 'Derived key invalid'
 *
 * @category Errors
 * @category generated
 */
export class DerivedKeyInvalidError extends Error {
  readonly code: number = 0x177d;
  readonly name: string = 'DerivedKeyInvalid';
  constructor() {
    super('Derived key invalid');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DerivedKeyInvalidError);
    }
  }
}

createErrorFromCodeLookup.set(0x177d, () => new DerivedKeyInvalidError());
createErrorFromNameLookup.set('DerivedKeyInvalid', () => new DerivedKeyInvalidError());

/**
 * MetadataDoesntExist: 'Metadata doesn't exist'
 *
 * @category Errors
 * @category generated
 */
export class MetadataDoesntExistError extends Error {
  readonly code: number = 0x177e;
  readonly name: string = 'MetadataDoesntExist';
  constructor() {
    super("Metadata doesn't exist");
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MetadataDoesntExistError);
    }
  }
}

createErrorFromCodeLookup.set(0x177e, () => new MetadataDoesntExistError());
createErrorFromNameLookup.set('MetadataDoesntExist', () => new MetadataDoesntExistError());

/**
 * InvalidTokenAmount: 'Invalid token amount'
 *
 * @category Errors
 * @category generated
 */
export class InvalidTokenAmountError extends Error {
  readonly code: number = 0x177f;
  readonly name: string = 'InvalidTokenAmount';
  constructor() {
    super('Invalid token amount');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidTokenAmountError);
    }
  }
}

createErrorFromCodeLookup.set(0x177f, () => new InvalidTokenAmountError());
createErrorFromNameLookup.set('InvalidTokenAmount', () => new InvalidTokenAmountError());

/**
 * BothPartiesNeedToAgreeToSale: 'Both parties need to agree to this sale'
 *
 * @category Errors
 * @category generated
 */
export class BothPartiesNeedToAgreeToSaleError extends Error {
  readonly code: number = 0x1780;
  readonly name: string = 'BothPartiesNeedToAgreeToSale';
  constructor() {
    super('Both parties need to agree to this sale');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, BothPartiesNeedToAgreeToSaleError);
    }
  }
}

createErrorFromCodeLookup.set(0x1780, () => new BothPartiesNeedToAgreeToSaleError());
createErrorFromNameLookup.set(
  'BothPartiesNeedToAgreeToSale',
  () => new BothPartiesNeedToAgreeToSaleError(),
);

/**
 * CannotMatchFreeSalesWithoutAuctionHouseOrSellerSignoff: 'Cannot match free sales unless the auction house or seller signs off'
 *
 * @category Errors
 * @category generated
 */
export class CannotMatchFreeSalesWithoutAuctionHouseOrSellerSignoffError extends Error {
  readonly code: number = 0x1781;
  readonly name: string = 'CannotMatchFreeSalesWithoutAuctionHouseOrSellerSignoff';
  constructor() {
    super('Cannot match free sales unless the auction house or seller signs off');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotMatchFreeSalesWithoutAuctionHouseOrSellerSignoffError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x1781,
  () => new CannotMatchFreeSalesWithoutAuctionHouseOrSellerSignoffError(),
);
createErrorFromNameLookup.set(
  'CannotMatchFreeSalesWithoutAuctionHouseOrSellerSignoff',
  () => new CannotMatchFreeSalesWithoutAuctionHouseOrSellerSignoffError(),
);

/**
 * SaleRequiresSigner: 'This sale requires a signer'
 *
 * @category Errors
 * @category generated
 */
export class SaleRequiresSignerError extends Error {
  readonly code: number = 0x1782;
  readonly name: string = 'SaleRequiresSigner';
  constructor() {
    super('This sale requires a signer');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SaleRequiresSignerError);
    }
  }
}

createErrorFromCodeLookup.set(0x1782, () => new SaleRequiresSignerError());
createErrorFromNameLookup.set('SaleRequiresSigner', () => new SaleRequiresSignerError());

/**
 * OldSellerNotInitialized: 'Old seller not initialized'
 *
 * @category Errors
 * @category generated
 */
export class OldSellerNotInitializedError extends Error {
  readonly code: number = 0x1783;
  readonly name: string = 'OldSellerNotInitialized';
  constructor() {
    super('Old seller not initialized');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, OldSellerNotInitializedError);
    }
  }
}

createErrorFromCodeLookup.set(0x1783, () => new OldSellerNotInitializedError());
createErrorFromNameLookup.set('OldSellerNotInitialized', () => new OldSellerNotInitializedError());

/**
 * SellerATACannotHaveDelegate: 'Seller ata cannot have a delegate set'
 *
 * @category Errors
 * @category generated
 */
export class SellerATACannotHaveDelegateError extends Error {
  readonly code: number = 0x1784;
  readonly name: string = 'SellerATACannotHaveDelegate';
  constructor() {
    super('Seller ata cannot have a delegate set');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SellerATACannotHaveDelegateError);
    }
  }
}

createErrorFromCodeLookup.set(0x1784, () => new SellerATACannotHaveDelegateError());
createErrorFromNameLookup.set(
  'SellerATACannotHaveDelegate',
  () => new SellerATACannotHaveDelegateError(),
);

/**
 * BuyerATACannotHaveDelegate: 'Buyer ata cannot have a delegate set'
 *
 * @category Errors
 * @category generated
 */
export class BuyerATACannotHaveDelegateError extends Error {
  readonly code: number = 0x1785;
  readonly name: string = 'BuyerATACannotHaveDelegate';
  constructor() {
    super('Buyer ata cannot have a delegate set');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, BuyerATACannotHaveDelegateError);
    }
  }
}

createErrorFromCodeLookup.set(0x1785, () => new BuyerATACannotHaveDelegateError());
createErrorFromNameLookup.set(
  'BuyerATACannotHaveDelegate',
  () => new BuyerATACannotHaveDelegateError(),
);

/**
 * NoValidSignerPresent: 'No valid signer present'
 *
 * @category Errors
 * @category generated
 */
export class NoValidSignerPresentError extends Error {
  readonly code: number = 0x1786;
  readonly name: string = 'NoValidSignerPresent';
  constructor() {
    super('No valid signer present');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NoValidSignerPresentError);
    }
  }
}

createErrorFromCodeLookup.set(0x1786, () => new NoValidSignerPresentError());
createErrorFromNameLookup.set('NoValidSignerPresent', () => new NoValidSignerPresentError());

/**
 * InvalidBasisPoints: 'BP must be less than or equal to 10000'
 *
 * @category Errors
 * @category generated
 */
export class InvalidBasisPointsError extends Error {
  readonly code: number = 0x1787;
  readonly name: string = 'InvalidBasisPoints';
  constructor() {
    super('BP must be less than or equal to 10000');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidBasisPointsError);
    }
  }
}

createErrorFromCodeLookup.set(0x1787, () => new InvalidBasisPointsError());
createErrorFromNameLookup.set('InvalidBasisPoints', () => new InvalidBasisPointsError());

/**
 * TradeStateDoesntExist: 'The trade state account does not exist'
 *
 * @category Errors
 * @category generated
 */
export class TradeStateDoesntExistError extends Error {
  readonly code: number = 0x1788;
  readonly name: string = 'TradeStateDoesntExist';
  constructor() {
    super('The trade state account does not exist');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, TradeStateDoesntExistError);
    }
  }
}

createErrorFromCodeLookup.set(0x1788, () => new TradeStateDoesntExistError());
createErrorFromNameLookup.set('TradeStateDoesntExist', () => new TradeStateDoesntExistError());

/**
 * TradeStateIsNotEmpty: 'The trade state is not empty'
 *
 * @category Errors
 * @category generated
 */
export class TradeStateIsNotEmptyError extends Error {
  readonly code: number = 0x1789;
  readonly name: string = 'TradeStateIsNotEmpty';
  constructor() {
    super('The trade state is not empty');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, TradeStateIsNotEmptyError);
    }
  }
}

createErrorFromCodeLookup.set(0x1789, () => new TradeStateIsNotEmptyError());
createErrorFromNameLookup.set('TradeStateIsNotEmpty', () => new TradeStateIsNotEmptyError());

/**
 * ReceiptIsEmpty: 'The receipt is empty'
 *
 * @category Errors
 * @category generated
 */
export class ReceiptIsEmptyError extends Error {
  readonly code: number = 0x178a;
  readonly name: string = 'ReceiptIsEmpty';
  constructor() {
    super('The receipt is empty');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ReceiptIsEmptyError);
    }
  }
}

createErrorFromCodeLookup.set(0x178a, () => new ReceiptIsEmptyError());
createErrorFromNameLookup.set('ReceiptIsEmpty', () => new ReceiptIsEmptyError());

/**
 * InstructionMismatch: 'The instruction does not match'
 *
 * @category Errors
 * @category generated
 */
export class InstructionMismatchError extends Error {
  readonly code: number = 0x178b;
  readonly name: string = 'InstructionMismatch';
  constructor() {
    super('The instruction does not match');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InstructionMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x178b, () => new InstructionMismatchError());
createErrorFromNameLookup.set('InstructionMismatch', () => new InstructionMismatchError());

/**
 * InvalidAuctioneer: 'Invalid Auctioneer for this Auction House instance.'
 *
 * @category Errors
 * @category generated
 */
export class InvalidAuctioneerError extends Error {
  readonly code: number = 0x178c;
  readonly name: string = 'InvalidAuctioneer';
  constructor() {
    super('Invalid Auctioneer for this Auction House instance.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidAuctioneerError);
    }
  }
}

createErrorFromCodeLookup.set(0x178c, () => new InvalidAuctioneerError());
createErrorFromNameLookup.set('InvalidAuctioneer', () => new InvalidAuctioneerError());

/**
 * MissingAuctioneerScope: 'The Auctioneer does not have the correct scope for this action.'
 *
 * @category Errors
 * @category generated
 */
export class MissingAuctioneerScopeError extends Error {
  readonly code: number = 0x178d;
  readonly name: string = 'MissingAuctioneerScope';
  constructor() {
    super('The Auctioneer does not have the correct scope for this action.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingAuctioneerScopeError);
    }
  }
}

createErrorFromCodeLookup.set(0x178d, () => new MissingAuctioneerScopeError());
createErrorFromNameLookup.set('MissingAuctioneerScope', () => new MissingAuctioneerScopeError());

/**
 * MustUseAuctioneerHandler: 'Must use auctioneer handler.'
 *
 * @category Errors
 * @category generated
 */
export class MustUseAuctioneerHandlerError extends Error {
  readonly code: number = 0x178e;
  readonly name: string = 'MustUseAuctioneerHandler';
  constructor() {
    super('Must use auctioneer handler.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MustUseAuctioneerHandlerError);
    }
  }
}

createErrorFromCodeLookup.set(0x178e, () => new MustUseAuctioneerHandlerError());
createErrorFromNameLookup.set(
  'MustUseAuctioneerHandler',
  () => new MustUseAuctioneerHandlerError(),
);

/**
 * NoAuctioneerProgramSet: 'No Auctioneer program set.'
 *
 * @category Errors
 * @category generated
 */
export class NoAuctioneerProgramSetError extends Error {
  readonly code: number = 0x178f;
  readonly name: string = 'NoAuctioneerProgramSet';
  constructor() {
    super('No Auctioneer program set.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NoAuctioneerProgramSetError);
    }
  }
}

createErrorFromCodeLookup.set(0x178f, () => new NoAuctioneerProgramSetError());
createErrorFromNameLookup.set('NoAuctioneerProgramSet', () => new NoAuctioneerProgramSetError());

/**
 * TooManyScopes: 'Too many scopes.'
 *
 * @category Errors
 * @category generated
 */
export class TooManyScopesError extends Error {
  readonly code: number = 0x1790;
  readonly name: string = 'TooManyScopes';
  constructor() {
    super('Too many scopes.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, TooManyScopesError);
    }
  }
}

createErrorFromCodeLookup.set(0x1790, () => new TooManyScopesError());
createErrorFromNameLookup.set('TooManyScopes', () => new TooManyScopesError());

/**
 * AuctionHouseNotDelegated: 'Auction House not delegated.'
 *
 * @category Errors
 * @category generated
 */
export class AuctionHouseNotDelegatedError extends Error {
  readonly code: number = 0x1791;
  readonly name: string = 'AuctionHouseNotDelegated';
  constructor() {
    super('Auction House not delegated.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AuctionHouseNotDelegatedError);
    }
  }
}

createErrorFromCodeLookup.set(0x1791, () => new AuctionHouseNotDelegatedError());
createErrorFromNameLookup.set(
  'AuctionHouseNotDelegated',
  () => new AuctionHouseNotDelegatedError(),
);

/**
 * BumpSeedNotInHashMap: 'Bump seed not in hash map.'
 *
 * @category Errors
 * @category generated
 */
export class BumpSeedNotInHashMapError extends Error {
  readonly code: number = 0x1792;
  readonly name: string = 'BumpSeedNotInHashMap';
  constructor() {
    super('Bump seed not in hash map.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, BumpSeedNotInHashMapError);
    }
  }
}

createErrorFromCodeLookup.set(0x1792, () => new BumpSeedNotInHashMapError());
createErrorFromNameLookup.set('BumpSeedNotInHashMap', () => new BumpSeedNotInHashMapError());

/**
 * EscrowUnderRentExemption: 'The instruction would drain the escrow below rent exemption threshold'
 *
 * @category Errors
 * @category generated
 */
export class EscrowUnderRentExemptionError extends Error {
  readonly code: number = 0x1793;
  readonly name: string = 'EscrowUnderRentExemption';
  constructor() {
    super('The instruction would drain the escrow below rent exemption threshold');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, EscrowUnderRentExemptionError);
    }
  }
}

createErrorFromCodeLookup.set(0x1793, () => new EscrowUnderRentExemptionError());
createErrorFromNameLookup.set(
  'EscrowUnderRentExemption',
  () => new EscrowUnderRentExemptionError(),
);

/**
 * InvalidSeedsOrAuctionHouseNotDelegated: 'Invalid seeds or Auction House not delegated'
 *
 * @category Errors
 * @category generated
 */
export class InvalidSeedsOrAuctionHouseNotDelegatedError extends Error {
  readonly code: number = 0x1794;
  readonly name: string = 'InvalidSeedsOrAuctionHouseNotDelegated';
  constructor() {
    super('Invalid seeds or Auction House not delegated');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidSeedsOrAuctionHouseNotDelegatedError);
    }
  }
}

createErrorFromCodeLookup.set(0x1794, () => new InvalidSeedsOrAuctionHouseNotDelegatedError());
createErrorFromNameLookup.set(
  'InvalidSeedsOrAuctionHouseNotDelegated',
  () => new InvalidSeedsOrAuctionHouseNotDelegatedError(),
);

/**
 * BuyerTradeStateNotValid: 'The buyer trade state was unable to be initialized.'
 *
 * @category Errors
 * @category generated
 */
export class BuyerTradeStateNotValidError extends Error {
  readonly code: number = 0x1795;
  readonly name: string = 'BuyerTradeStateNotValid';
  constructor() {
    super('The buyer trade state was unable to be initialized.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, BuyerTradeStateNotValidError);
    }
  }
}

createErrorFromCodeLookup.set(0x1795, () => new BuyerTradeStateNotValidError());
createErrorFromNameLookup.set('BuyerTradeStateNotValid', () => new BuyerTradeStateNotValidError());

/**
 * MissingElementForPartialOrder: 'Partial order size and price must both be provided in a partial buy.'
 *
 * @category Errors
 * @category generated
 */
export class MissingElementForPartialOrderError extends Error {
  readonly code: number = 0x1796;
  readonly name: string = 'MissingElementForPartialOrder';
  constructor() {
    super('Partial order size and price must both be provided in a partial buy.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingElementForPartialOrderError);
    }
  }
}

createErrorFromCodeLookup.set(0x1796, () => new MissingElementForPartialOrderError());
createErrorFromNameLookup.set(
  'MissingElementForPartialOrder',
  () => new MissingElementForPartialOrderError(),
);

/**
 * NotEnoughTokensAvailableForPurchase: 'Amount of tokens available for purchase is less than the partial order amount.'
 *
 * @category Errors
 * @category generated
 */
export class NotEnoughTokensAvailableForPurchaseError extends Error {
  readonly code: number = 0x1797;
  readonly name: string = 'NotEnoughTokensAvailableForPurchase';
  constructor() {
    super('Amount of tokens available for purchase is less than the partial order amount.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NotEnoughTokensAvailableForPurchaseError);
    }
  }
}

createErrorFromCodeLookup.set(0x1797, () => new NotEnoughTokensAvailableForPurchaseError());
createErrorFromNameLookup.set(
  'NotEnoughTokensAvailableForPurchase',
  () => new NotEnoughTokensAvailableForPurchaseError(),
);

/**
 * PartialPriceMismatch: 'Calculated partial price does not not partial price that was provided.'
 *
 * @category Errors
 * @category generated
 */
export class PartialPriceMismatchError extends Error {
  readonly code: number = 0x1798;
  readonly name: string = 'PartialPriceMismatch';
  constructor() {
    super('Calculated partial price does not not partial price that was provided.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, PartialPriceMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x1798, () => new PartialPriceMismatchError());
createErrorFromNameLookup.set('PartialPriceMismatch', () => new PartialPriceMismatchError());

/**
 * AuctionHouseAlreadyDelegated: 'Auction House already delegated.'
 *
 * @category Errors
 * @category generated
 */
export class AuctionHouseAlreadyDelegatedError extends Error {
  readonly code: number = 0x1799;
  readonly name: string = 'AuctionHouseAlreadyDelegated';
  constructor() {
    super('Auction House already delegated.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AuctionHouseAlreadyDelegatedError);
    }
  }
}

createErrorFromCodeLookup.set(0x1799, () => new AuctionHouseAlreadyDelegatedError());
createErrorFromNameLookup.set(
  'AuctionHouseAlreadyDelegated',
  () => new AuctionHouseAlreadyDelegatedError(),
);

/**
 * AuctioneerAuthorityMismatch: 'Auctioneer Authority Mismatch'
 *
 * @category Errors
 * @category generated
 */
export class AuctioneerAuthorityMismatchError extends Error {
  readonly code: number = 0x179a;
  readonly name: string = 'AuctioneerAuthorityMismatch';
  constructor() {
    super('Auctioneer Authority Mismatch');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AuctioneerAuthorityMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x179a, () => new AuctioneerAuthorityMismatchError());
createErrorFromNameLookup.set(
  'AuctioneerAuthorityMismatch',
  () => new AuctioneerAuthorityMismatchError(),
);

/**
 * InsufficientFunds: 'Insufficient funds in escrow account to purchase.'
 *
 * @category Errors
 * @category generated
 */
export class InsufficientFundsError extends Error {
  readonly code: number = 0x179b;
  readonly name: string = 'InsufficientFunds';
  constructor() {
    super('Insufficient funds in escrow account to purchase.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InsufficientFundsError);
    }
  }
}

createErrorFromCodeLookup.set(0x179b, () => new InsufficientFundsError());
createErrorFromNameLookup.set('InsufficientFunds', () => new InsufficientFundsError());

/**
 * SaleRequiresExactlyOneSigner: 'This sale requires exactly one signer: either the seller or the authority.'
 *
 * @category Errors
 * @category generated
 */
export class SaleRequiresExactlyOneSignerError extends Error {
  readonly code: number = 0x179c;
  readonly name: string = 'SaleRequiresExactlyOneSigner';
  constructor() {
    super('This sale requires exactly one signer: either the seller or the authority.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SaleRequiresExactlyOneSignerError);
    }
  }
}

createErrorFromCodeLookup.set(0x179c, () => new SaleRequiresExactlyOneSignerError());
createErrorFromNameLookup.set(
  'SaleRequiresExactlyOneSigner',
  () => new SaleRequiresExactlyOneSignerError(),
);

/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 * @category generated
 */
export function errorFromCode(code: number): MaybeErrorWithCode {
  const createError = createErrorFromCodeLookup.get(code);
  return createError != null ? createError() : null;
}

/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 * @category generated
 */
export function errorFromName(name: string): MaybeErrorWithCode {
  const createError = createErrorFromNameLookup.get(name);
  return createError != null ? createError() : null;
}
