import { Contract, ethers } from 'ethers';
import { erc20Abi } from 'viem';
import { avalancheTestnetAddresses } from '@/constants/addresses';
import { NFT_ABI } from '@/constants/ABI';
export async function Approve(signer: ethers.JsonRpcSigner, token: string) {
  try {
    const contract = new Contract(token, erc20Abi, signer);
    const tx = await contract.approve(
      avalancheTestnetAddresses.NFT_TEST_1,
      100
    );

    const receipt = await tx.wait();
  } catch (error) {
    console.error('Error calling approveBZZ:', error);
  }
}

export const GetAllowance = async (
  signer: ethers.JsonRpcSigner,
  address: string,
  token: string
) => {
  const contract = new Contract(token, erc20Abi, signer);
  const decimals = await contract.decimals();
  const allowance = await contract.allowance(
    address,
    avalancheTestnetAddresses.NFT_TEST_1
  );
  const formattedAllowance = ethers.formatUnits(allowance, decimals);
  return formattedAllowance;
};

export const Mint = async (
  signer: ethers.JsonRpcSigner,
  token: string,
  functionName: string,
  _to: string
) => {
  const contract = new Contract(token, NFT_ABI, signer);
  const tx = await contract[functionName](1, _to);
  const receipt = await tx.wait();
  return receipt;
};
