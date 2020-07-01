require("dotenv").config();
import fs from "fs";
import { Wallet } from "@ethersproject/wallet";
import { task, usePlugin, BuidlerConfig } from "@nomiclabs/buidler/config";
usePlugin("buidler-ethers-v5");
usePlugin("buidler-deploy");

let mnemonic = process.env.MNEMONIC;
try {
  mnemonic = fs
    .readFileSync(process.env.MNEMONIC_PATH || ".mnemonic")
    .toString();
} catch (e) {}

let accounts;
let buidlerEvmAccounts;
if (mnemonic) {
  accounts = {
    mnemonic,
  };
  buidlerEvmAccounts = [];
  for (let i = 0; i < 10; i++) {
    const wallet = Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/" + i);
    buidlerEvmAccounts.push({
      privateKey: wallet.privateKey,
      balance: "1000000000000000000000",
    });
  }
}

const config: BuidlerConfig = {
  solc: {
    version: "0.6.5",
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    buidlerevm: {
      accounts: buidlerEvmAccounts,
    },
    localhost: {
      url: "http://localhost:8545",
      accounts,
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/" + process.env.INFURA_TOKEN,
      accounts,
    },
  },
  paths: {
    sources: "src",
  },
};

export default config;
