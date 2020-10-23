import {HardhatRuntimeEnvironment, DeployFunction} from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  const ALibrary = await deployments.get('ALibrary');

  await deploy('AContract', {
    from: deployer,
    log: true,
    libraries: {
      ALibrary: ALibrary.address,
    },
  });
};
export default func;
func.tags = ['AContract'];
func.dependencies = ['ALibrary'];
