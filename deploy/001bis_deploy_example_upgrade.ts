import {HardhatRuntimeEnvironment, DeployFunction} from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {proxyOwner} = await getNamedAccounts();

  const Greeter2 = await deployments.get('Greeter2');

  await deploy('Example', {
    from: proxyOwner,
    proxy: {
      methodName: 'postUpgrade',
      owner: proxyOwner,
    },
    args: [Greeter2.address],
    log: true,
  });
};
export default func;
