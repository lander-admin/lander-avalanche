import { defineChain } from 'viem';

export const echo = defineChain({
  id: 173750,
  name: 'Echo L1',
  network: 'echo',
  nativeCurrency: {
    decimals: 18,
    name: 'Ech',
    symbol: 'ECH',
  },
  rpcUrls: {
    default: {
      http: ['https://subnets.avax.network/echo/testnet/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://subnets-test.avax.network/echo',
    },
  },
  // Custom variables
  iconUrl: '/chains/logo/173750.png',
  icm_registry: '0xF86Cb19Ad8405AEFa7d09C778215D2Cb6eBfB228',
});
export const fuji = defineChain({
  id: 43113,
  name: 'Avalanche Fuji',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche Fuji',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: {
      name: 'SnowTrace',
      url: 'https://testnet.snowtrace.io',
      apiUrl: 'https://api-testnet.snowtrace.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 7096959,
    },
  },
  testnet: true,
  // Custom variables
  icm_registry: '0xF86Cb19Ad8405AEFa7d09C778215D2Cb6eBfB228',
  faucet: {
    recalibrate: 30,
    assets: [
      {
        address: 'native',
        decimals: 18,
        drip_amount: 0.05, // max .05 token per request
        rate_limit: {
          // max 1 request in 24hrs
          max_limit: 1,
          window_size: 24 * 60 * 60 * 1000,
        },
      },
      {
        address: '0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d',
        decimals: 18,
        drip_amount: 2, // max 2 token per request
        rate_limit: {
          // max 1 request in 24hrs
          max_limit: 1,
          window_size: 24 * 60 * 60 * 1000,
        },
      },
    ],
  },
});
export const CHAINS = [fuji, echo];

export const TOKENS = [
  {
    address: 'native',
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
    chain_id: 43113,
  },
  {
    address: '0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d',
    name: 'TOK',
    symbol: 'TOK',
    decimals: 18,
    chain_id: 43113,
    supports_ictt: true,
    transferer: '0xD63c60859e6648b20c38092cCceb92c5751E32fF',
    mirrors: [
      {
        address: '0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d',
        transferer: '0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d',
        chain_id: 173750,
        decimals: 18,
      },
    ],
  },
  {
    address: '0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d',
    name: 'TOK.e',
    symbol: 'TOK.e',
    decimals: 18,
    chain_id: 173750,
    supports_ictt: true,
    is_transferer: true,
    mirrors: [
      {
        home: true,
        address: '0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d',
        transferer: '0xD63c60859e6648b20c38092cCceb92c5751E32fF',
        chain_id: 43113,
        decimals: 18,
      },
    ],
  },
  {
    address: '0xD737192fB95e5D106a459a69Faec4a7bD38c2A17',
    name: 'STT',
    symbol: 'STT',
    decimals: 18,
    chain_id: 43113,
    supports_ictt: true,
    transferer: '0x8a6A0605556ec621EB75F27954C32f048B51d8e9',
    mirrors: [
      {
        address: '0x96cA8090Ab3748C0697058C06FBdcF0813Cd9576',
        transferer: '0x96cA8090Ab3748C0697058C06FBdcF0813Cd9576',
        chain_id: 173750,
        decimals: 18,
      },
      {
        address: '0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d',
        transferer: '0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d',
        chain_id: 779672,
        decimals: 18,
      },
    ],
  },
  {
    address: '0x96cA8090Ab3748C0697058C06FBdcF0813Cd9576',
    name: 'STT.e',
    symbol: 'STT.e',
    decimals: 18,
    chain_id: 173750,
    supports_ictt: true,
    is_transferer: true,
    mirrors: [
      {
        home: true,
        address: '0xD737192fB95e5D106a459a69Faec4a7bD38c2A17',
        transferer: '0x8a6A0605556ec621EB75F27954C32f048B51d8e9',
        chain_id: 43113,
        decimals: 18,
      },
      {
        address: '0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d',
        transferer: '0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d',
        chain_id: 779672,
        decimals: 18,
      },
    ],
  },
  {
    address: '0x8D6f0E153B1D4Efb46c510278Db3678Bb1Cc823d',
    name: 'STT.d',
    symbol: 'STT.d',
    decimals: 18,
    chain_id: 779672,
    supports_ictt: true,
    is_transferer: true,
    mirrors: [
      {
        home: true,
        address: '0xD737192fB95e5D106a459a69Faec4a7bD38c2A17',
        transferer: '0x8a6A0605556ec621EB75F27954C32f048B51d8e9',
        chain_id: 43113,
        decimals: 18,
      },
      {
        address: '0x96cA8090Ab3748C0697058C06FBdcF0813Cd9576',
        transferer: '0x96cA8090Ab3748C0697058C06FBdcF0813Cd9576',
        chain_id: 173750,
        decimals: 18,
      },
    ],
  },
];
