'use client';

import { LiFiWidget, WidgetSkeleton } from '@lifi/widget';
import React from 'react';
import type { WidgetConfig } from '@lifi/widget';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ICTT } from '@0xstt/builderkit';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TOKENS } from './constants';
export const Swap = () => {
  const { address } = useBlockchain();
  const config = {
    appearance: 'light',
    toChain: 43113,
    hiddenUI: ['poweredBy', 'walletMenu', 'drawerCloseButton'],
    theme: {},
  } as Partial<WidgetConfig>;

  return (
    <>
      {address ? (
        <section className="flex flex-col m-auto justify-center items-center">
          <Tabs defaultValue="Swap" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Swap">Swap</TabsTrigger>
              <TabsTrigger value="Bridge">Bridge</TabsTrigger>
            </TabsList>
            <TabsContent value="Swap">
              <section className=" m-auto flex flex-col items-center justify-center">
                <ICTT
                  tokens={TOKENS}
                  token_in="0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d"
                  source_chain_id={43113}
                  destination_chain_id={173750}
                />
              </section>
            </TabsContent>
            <TabsContent value="Bridge">
              <React.Suspense fallback={<WidgetSkeleton config={config} />}>
                <LiFiWidget
                  config={config}
                  toChain={8453}
                  integrator="nextjs-example"
                />
              </React.Suspense>
            </TabsContent>
          </Tabs>
        </section>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <ConnectButton
            accountStatus={'full'}
            chainStatus={'none'}
            showBalance={false}
          />
        </div>
      )}
    </>
  );
};
