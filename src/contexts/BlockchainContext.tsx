'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Address } from 'viem';
import { updateUserWallet } from '@/services/users';

import { useWallet } from '@solana/wallet-adapter-react';
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers/react';
interface BlockchainContextProps {
  chain: string | null | undefined;
  address: Address | string | undefined;
  isConnected?: boolean;
  chainId: number | null | undefined;
}

const BlockchainContext = createContext<BlockchainContextProps | undefined>(
  undefined
);

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error(
      'useBlockchain debe ser usado dentro de un BlockchainProvider'
    );
  }
  return context;
};

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null | undefined>();
  const [chain, setChain] = useState<string | null | undefined>();

  const { isConnected: connectedEVM, address: addressEVM } =
    useWeb3ModalAccount();
  const { publicKey: addressSOL, connected: connectedSOL } = useWallet();

  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState<number | null | undefined>();

  const { walletProvider } = useWeb3ModalProvider();

  async function getChainId() {
    //  const chain = await walletProvider?.request({ method: 'eth_chainId' });
    // setChainId(ChainIdFromHex(chain));

    setChainId(137);
  }
  useEffect(() => {
    updateUserWallet(addressEVM?.toString() || '', 'evm');
    setAddress(addressEVM || null);
    setIsConnected(connectedEVM);
    setChain('evm');
    getChainId();
  }, [connectedEVM, addressEVM]);

  ///onchage chain
  //   useEffect(() => {
  //     getChainId();
  //     console.log('enter in useEffect and chainId is', chainId);
  //   }, [walletProvider, isConnected]);

  useEffect(() => {
    walletProvider?.request({ method: 'eth_requestAccounts' }).then((res) => {
      if (res.length > 0) {
        getChainId();
        setAddress(res[0]);
        setIsConnected(true);
      }
    });
  }, []);

  //create a context user

  useEffect(() => {
    if (addressSOL) {
      updateUserWallet(addressSOL?.toString() || '', 'solana');
      setAddress(addressSOL?.toString());
      setIsConnected(connectedSOL);
      setChain('solana');
    }
  }, [addressSOL, connectedSOL]);

  return (
    <BlockchainContext.Provider
      value={{
        address: address || '',
        isConnected,
        chain,
        chainId,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
