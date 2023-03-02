#!/usr/bin/env bash

# Exit immediately on error.
set -e

MPL_ROOT=$(git rev-parse --show-toplevel)
mkdir -p $MPL_ROOT/test-programs

mkdir -p safecoin_program_library
curl -LkSs https://api.github.com/repos/fair-exchange/safecoin-program-library/tarball | tar -xz --strip-components=1 -C ./safecoin_program_library

pushd safecoin_program_library/account-compression/programs/account-compression
  cargo build-bpf --bpf-out-dir $MPL_ROOT/test-programs
popd

pushd safecoin_program_library/account-compression/programs/noop
  cargo build-bpf --bpf-out-dir $MPL_ROOT/test-programs
popd

rm -rf safecoin_program_library
