'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';

import { useAuth } from '@/contexts/AuthContext';

import { updateBookingStatus } from '@/services/books';
import { useTransaction } from '@/contexts/CheckoutProvider';
import { useRouter } from 'next/navigation';

import Notiflix from 'notiflix';
import { Address, erc20Abi } from 'viem';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { polygonAddresses } from '@/constants/addresses';
import { Contract, ethers } from 'ethers';
import {
  TokensBase,
  TokensPolygon,
  TokensTestAvalanche,
} from '@/constants/Tokens';
import { Token, TokenChip } from '@coinbase/onchainkit/token';
import {
  Connection,
  Transaction,
  SystemProgram,
  clusterApiUrl,
  PublicKey,
} from '@solana/web3.js';

import { useEthersSigner, useEthersProvider } from '@/blockchain';
import { config } from '@/constants/wagmi-config';
import { useChainId } from 'wagmi';
import { useChainContract } from '@/hooks/useChainContract';
import Image from 'next/image';
import { Button, Spinner } from '@chakra-ui/react';
interface ContractInteractionProps {
  disabled?: boolean;
  amount: number;
  sellerAddress: Address;
  onTxSent?: (hash: string) => void;
  onTxError?: (error: any) => void;
  transactionId?: number;
  owner_wallet: string;
  buyer_wallet: string;
  owner_id: string;
  buyer_id: string;
  tokenAddress: string;
  tokenName: string;
  property_id: string;
}

const BuyButton: FC<ContractInteractionProps> = ({
  property_id,
  onTxError,
  onTxSent,
  disabled,
  amount,
  sellerAddress,
  owner_id,
  buyer_id,
  transactionId,
  owner_wallet,
  buyer_wallet,
  tokenName,
  tokenAddress,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { address, chain } = useBlockchain();
  const { transaction } = useTransaction() || {};
  const router = useRouter();
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  const chainId = useChainId();
  const landerContract = '0xF414A98E991cd9654304E4Daa9f0978FFDB73bb2';
  async function CreateTransaction() {
    try {
      setLoading(true);
      setErrorMessage('');

      if (!address) {
        throw new Error('Invalid Address');
      }

      const erc20Contract = new Contract(tokenAddress, erc20Abi, signer);

      const decimals = await erc20Contract.decimals();
      const parsedAmount = ethers.parseUnits(
        transaction.amount.toString(),
        Number(decimals)
      );
      const tx = await erc20Contract
        .transfer(landerContract, parsedAmount)
        .catch((err) => {
          Notiflix.Notify.failure('Error:' + err);
        });

      const receipt = await tx.wait();
      const data = await provider?.getTransactionReceipt(tx?.hash);

      if (data && data.logs.length > 0) {
        const transferEventAbi = [
          'event Transfer(address indexed from, address indexed to, uint256 value)',
        ];
        const iface = new ethers.Interface(transferEventAbi);

        for (const log of data.logs) {
          try {
            const parsedLog = iface.parseLog(log);

            if (parsedLog) {
              const { from, to, value } = parsedLog.args;

              const transactionInfo = {
                amount: ethers.formatUnits(value, Number(decimals)),
                from: from,
                to: to,
                decimals: Number(decimals),
                token: polygonAddresses.USD,
              };

              const txID = await updateBookingStatus({
                bookingId: transaction?.id,
                status: 'pending',
                txHash: tx.hash,
                chain: 'pol',
                owner_id,
                buyer_id,
                owner_wallet,
                buyer_wallet,
                property_id,
                transactionInfo: transactionInfo,
              });

              router.push(`/p2p/${txID}`);
            }
          } catch (err) {
            console.error('Error parsing log:', err);
          }
        }

        Notiflix.Notify.success('Transaction created');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Transaction failed');

      if (onTxError) {
        onTxError(error);
      }
    } finally {
      setLoading(false);
    }
  }
  const token = TokensTestAvalanche.find((token) => token.name === tokenName);

  return (
    <>
      {!transactionId && chain === 'evm' && (
        <section>
          <Button
            key={token?.address}
            className="w-7/12  bg-gray-200 rounded-xl m-auto"
            onClick={CreateTransaction}
          >
            {!loading ? (
              <Image
                src={token?.image || ''}
                alt={token?.name || ''}
                width={60}
                height={60}
              />
            ) : (
              <Spinner />
            )}
          </Button>
        </section>
      )}
    </>
  );
};

export default BuyButton;
