
// @ts-check
'use strict';
const path = require('path');

const localDeployDir = path.join(__dirname, 'target', 'deploy');
const {LOCALHOST, tmpLedgerDir} = require('@metaplex-foundation/amman');

function localDeployPath(programName) {
    return path.join(localDeployDir, `${programName}.so`);
}

const programs = [
    {label: "Metadata", programId: 'metXT2PkoCBucKkvmeQoYDNmncrPXGVCGacwqEHxcM5', deployPath: localDeployPath('lpl_token_metadata')},
    {label: "Vault", programId:'vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn', deployPath: localDeployPath('lpl_token_vault')},
    {label: "Auction", programId: 'auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8', deployPath: localDeployPath('mpl_auction')},
    {label: "Metaplex", programId: 'p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98', deployPath: localDeployPath('mpl_metaplex')},
    {
        label: "Fixed Price Token Sale",
        programId: 'SaLeTjyUa5wXHnGuewUSyJ5JWZaHwz3TxqUntCE9czo',
        deployPath: localDeployPath('mpl_fixed_price_sale'),
    },
    {
        label: "Candy Machine",
        programId: 'cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ',
        deployPath: localDeployPath('mpl_candy_machine'),
    },
];

const validator = {
    killRunningValidators: true,
    programs,
    commitment: 'singleGossip',
    resetLedger: true,
    verifyFees: false,
    jsonRpcUrl: LOCALHOST,
    websocketUrl: '',
    ledgerDir: tmpLedgerDir(),
};

module.exports = {
    validator,
    relay: {
        enabled: true,
        killRunningRelay: true,
    },
};
