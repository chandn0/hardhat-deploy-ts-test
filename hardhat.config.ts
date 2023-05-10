import 'dotenv/config';
import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

let mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  // FOR DEV ONLY, SET IT IN .env files if you want to keep it private
  // (IT IS IMPORTANT TO HAVE A NON RANDOM MNEMONIC SO THAT SCRIPTS CAN ACT ON THE SAME ACCOUNTS)
  mnemonic = 'grunt jewel gaze gaze village air remind liquid increase endless slender output';
}
const accounts = {
  mnemonic,
};

const config: HardhatUserConfig = {
  defaultNetwork: 'buildbear',
  solidity: {
    version: '0.6.5',
  },
  namedAccounts: {
    deployer: 0,
    proxyOwner: 1,
    admin: '0x5B9d721f482E60efA99e555Cb59c7DBF4Df15Dc7',
  },
  networks: {
   
    buildbear: {
      url: "https://rpc.demo.buildbear.io/buildbear",
    },
    coverage: {
      url: 'http://localhost:5458',
      accounts,
    },
    hardhat: {
      accounts,
    },
    localhost: {
      url: 'http://localhost:8545',
      accounts,
    },
    
  },
  paths: {
    sources: 'src',
  },
  external: {
    contracts: [
      {artifacts: 'node_modules/@cartesi/arbitration/artifacts'},
      {artifacts: 'node_modules/@cartesi/util/artifacts'},
    ],
    deployments: {
      rinkeby: ['node_modules/@cartesi/arbitration/deployments/rinkeby'],
    },
  },
  mocha: {
    timeout: 20000000000,
  },
};

export default config;
