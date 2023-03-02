//! Module provide application defined errors.

use safecoin_client::client_error::ClientError;
use safecoin_sdk::{program_error::ProgramError, pubkey::ParsePubkeyError};
use std::io;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
    #[error("Dynamic error.")]
    DynamicError(String),

    #[error("Rpc client error.")]
    RpcClientError(ClientError),

    #[error("IO error.")]
    IoError(io::Error),

    #[error("Parse pubkey error.")]
    ParsePubkeyError(ParsePubkeyError),

    #[error("Safecoin program error.")]
    SafecoinProgramError(ProgramError),
}

impl From<ProgramError> for Error {
    fn from(e: ProgramError) -> Error {
        Error::SafecoinProgramError(e)
    }
}

impl From<ParsePubkeyError> for Error {
    fn from(e: ParsePubkeyError) -> Error {
        Error::ParsePubkeyError(e)
    }
}

impl From<io::Error> for Error {
    fn from(e: io::Error) -> Error {
        Error::IoError(e)
    }
}

impl From<ClientError> for Error {
    fn from(e: ClientError) -> Error {
        Error::RpcClientError(e)
    }
}

impl From<Box<dyn std::error::Error>> for Error {
    fn from(e: Box<dyn std::error::Error>) -> Error {
        Error::DynamicError(e.to_string())
    }
}
