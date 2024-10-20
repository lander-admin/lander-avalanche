'use client';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { avalanche, base, polygon } from '@reown/appkit/networks';
import { wagmiAdapter } from '@/constants/wagmi-config';
import { Config, cookieToInitialState, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';

import { base as baseFixed, fuji } from '@/constants/Chain';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Web3Provider } from '@0xstt/builderkit';
import { CHAINS } from '@/components/Swap/constants';

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_REOWN_PROJECT_ID is not set');
}
const metadata = {
  name: 'Lander',
  description: 'Welcome to Lander',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/'],
};

createAppKit({
  adapters: [new EthersAdapter(), wagmiAdapter],
  metadata,
  networks: [fuji, avalanche],
  defaultNetwork: base,
  projectId,
  features: {
    analytics: true,
  },
});
const queryClient = new QueryClient();

export function AppKit({ children, cookies }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseFixed}
        >
          <RainbowKitProvider
            initialChain={base}
            id="6a95bc04348d8381307583302653bec3"
            theme={darkTheme({
              accentColor: '#7b3fe4',
              accentColorForeground: 'white',
              borderRadius: 'medium',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
          >
            <Web3Provider
              projectId="6a95bc04348d8381307583302653bec3"
              chains={CHAINS}
            >
              {children}
            </Web3Provider>
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
