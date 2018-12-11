# Titan CLI

<img src="https://s15.postimg.cc/spmnht6zf/Titan_Logo.png" width="100" height="100">

The complete Smart Contract development CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@titan-suite/cli.svg)](https://npmjs.org/package/@titan-suite/cli)
[![CircleCI](https://circleci.com/gh/titan-suite/cli/tree/master.svg?style=shield)](https://circleci.com/gh/titan-suite/cli/tree/master)

<!-- [![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/titan-suite/cli?branch=master&svg=true)](https://ci.appveyor.com/project/titan-suite/cli/branch/master)
[![Codecov](https://codecov.io/gh/titan-suite/cli/branch/master/graph/badge.svg)](https://codecov.io/gh/titan-suite/cli) -->

[![Downloads/week](https://img.shields.io/npm/dw/@titan-suite/cli.svg)](https://npmjs.org/package/@titan-suite/cli)
[![License](https://img.shields.io/npm/l/@titan-suite/cli.svg)](https://github.com/titan-suite/cli/blob/master/package.json)
[![Chat](http://img.shields.io/badge/titan-suite/Lobby-f81a65.svg)](https://gitter.im/titan-suite/Lobby)

# Usage

`npm i -g @titan-suite/cli`

```javascript
module.exports = {
  defaultBlockchain: "aion",
  blockchains: {
    aion: {
      networks: {
        development: {
          host: "http://TITAN.DEV.NODE",
          defaultAccount: "",
          password: ""
        },
        mainnet: {
          host:
            "http://api.nodesmith.io/v1/aion/mainnet/jsonrpc?apiKey=API_KEY",
          defaultAccount: "",
          password: ""
        },
        testnet: {
          host:
            "https://api.nodesmith.io/v1/aion/testnet/jsonrpc?apiKey=API_KEY",
          defaultAccount: "",
          password: ""
        }
      }
    },
    ethereum: {
      networks: {
        development: {
          host: "http://127.0.0.1:8545",
          defaultAccount: "",
          password: ""
        }
      }
    }
  }
};
```

# Commands

## Help

- `titan --help`

![](https://i.postimg.cc/1XfDBNH9/help.gif)

You can also run `titan <command> --help` for more details about the command

## `titan compile`

Compile a Solidity smart contract

- `titan compile path/to/contracts/Example.sol`
- Compile a specific contract withing a file
  - `titan compile -n SpecificContract path/to/contracts/ManyContracts.sol`
- Output more details about the contract
  - `titan compile -d path/to/contracts/Example.sol`
- _The details of the compiled contract will be stored as `./build/bots/<contractName>.json`_

![](https://s15.postimg.cc/88mvkpk6z/compile.gif)

## `titan console`

Interact with an AION node with an injected `aion-web3` instance

- `titan console`

![](https://s15.postimg.cc/twbtvmpvf/console.gif)

## `titan create`

Create a new contract or test file

- `titan create contract Test`

![](https://i.postimg.cc/vBX4pHBc/create.gif)

## `titan deploy`

Deploy a smart contract to an AION node

- `titan deploy path/to/contracts/Example.sol`
- Deploy a specific contract within a contract file:
  - `titan deploy -n Test path/to/contracts/Example.sol`
- Pass parameters: - `titan deploy -p 5 path/to/contracts/Example.sol`
- _The details of the deployed contract will be stored as `./build/bots/<contractName>.json`_

![](https://s15.postimg.cc/5a6al0y3v/deploy.gif)

## `titan exec`

Run Javascript files within your project

- `titan exec path/to/script`

![](https://i.postimg.cc/G2bB7sbW/exec.gif)

## `titan init`

Generate an empty Titan project

- in the current directory: `titan init`
- in a new directory: `titan init <name>`

![](https://s15.postimg.cc/aeh6fbijf/init.gif)

## `titan lint`

Lint a smart contract

- `titan lint path/to/contracts/Example.sol`
- lint multiple files within a directory
  - `titan lint path/to/contracts/**/*.sol`

![](https://s15.postimg.cc/4qavos1fv/lint.gif)

## `titan migrate`

- Create a migration file:

  ```javascript
  // migrations/simple_migration.js

  const Simple = require("../build/bolts/Simple.json");
  module.exports = async deployer => {
    deployer
      .deploy(Simple)
      .then(address => {
        console.log(address);
      })
      .catch(e => {
        console.error(e);
      });
  };
  ```

- `titan migrate path/to/migration.js`
  ![](https://i.postimg.cc/rsmDcX0g/migrate.gif)

## `titan networks`

![](https://i.postimg.cc/YSKLFsZq/networks.gif)

## `titan test`

Run unit tests

- `titan test path/to/test/testExample.js`

![](https://s15.postimg.cc/okwxawod7/test.gif)

## `titan unlock`

Unlock an account

_You may be prompted to enter an AION address and/or password_

- `titan unlock`
- with the account specified
  - `titan unlock -a <0x..>`
- with both the account and password specified
  - `titan unlock -a <0x...> -p <pwd>`

![](https://s15.postimg.cc/ulum7y8ej/unlock.gif)

## `titan unpack`

Start a new project with a pre-built dApp

- `titan unpack`
  - choose a pack from the options
- `titan unpack <name>`

![](https://s15.postimg.cc/q8h1wpi5n/unpack.gif)

---

# Test

- Create a `titanrc.js` as specified above
- `yarn test`

# Community

Join us on [Gitter](https://gitter.im/titan-suite/Lobby#)
