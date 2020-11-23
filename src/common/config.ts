class Config {
  addresMap: any;

  staking: any;
  auction: any;
  dmw: any;
  dmwV2: any;
  dmwBase: any;
  dmwInfo: any;
  dmwInfoV2: any;
  dmwProxy: any;
  coinFactory: any;

  constructor(_addresMap: any) {
    this.addresMap = _addresMap;

    this.initStaking();
    this.initAction();
    this.initDMW();
    this.initDMWV2();
    this.initDMWBase();
    this.initDMWInfo();
    this.initDMWInfoV2();
    this.initDMWProxy();
    this.initCoinFactory();
  }

  initStaking() {
    this.staking = {
      address: this.addresMap.staking,
      abi: [
        {
          constant: true,
          inputs: [
            {
              name: 'offset',
              type: 'uint256',
            },
            {
              name: 'pageSize',
              type: 'uint256',
            },
          ],
          name: 'myPageShare',
          outputs: [
            {
              name: 'result',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'allSSC',
          outputs: [
            {
              name: '',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'mySSCWithDraw',
          outputs: [
            {
              name: 'result',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'shareIndex',
              type: 'uint256',
            },
            {
              name: '_stakingDays',
              type: 'uint64',
            },
          ],
          name: 'reStaking',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_stakingDays',
              type: 'uint64',
            },
          ],
          name: 'getInterest',
          outputs: [
            {
              name: '_interest',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'shareIndex',
              type: 'uint256',
            },
          ],
          name: 'withDrawShare',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'getPhaseSeq',
          outputs: [
            {
              name: 'seq',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'minStakingValue',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'sscName',
              type: 'string',
            },
          ],
          name: 'withDrawSSC',
          outputs: [
            {
              name: '',
              type: 'bool',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_stakingDays',
              type: 'uint64',
            },
          ],
          name: 'staking',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: 'seq',
              type: 'uint8',
            },
          ],
          name: 'getPhaseBalance',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'fee',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'stakingPoolBalance',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
    };
  }

  initAction() {
    this.auction = {
      address: this.addresMap.auction,
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: 'contractIndex',
              type: 'uint256',
            },
          ],
          name: 'withDraw',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_contractIndex',
              type: 'uint256',
            },
          ],
          name: 'closeAuction',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_contractIndex',
              type: 'uint256',
            },
          ],
          name: 'setAuctionPrice',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_contractIndex',
              type: 'uint256',
            },
          ],
          name: 'bid',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'timer',
          outputs: [
            {
              name: '',
              type: 'uint64',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: 'offset',
              type: 'uint256',
            },
            {
              name: 'pageSize',
              type: 'uint256',
            },
          ],
          name: 'pageAuctions',
          outputs: [
            {
              name: 'result',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_contractIndex',
              type: 'uint256',
            },
            {
              name: '_mintCoin',
              type: 'string',
            },
            {
              name: '_backedCoin',
              type: 'string',
            },
            {
              name: '_backeValue',
              type: 'uint256',
            },
            {
              name: '_marketValue',
              type: 'uint256',
            },
            {
              name: '_seller',
              type: 'address',
            },
          ],
          name: 'createAuction',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_contractIndex',
              type: 'uint256',
            },
          ],
          name: 'unSold',
          outputs: [
            {
              name: '',
              type: 'bool',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
    };
  }

  initDMW() {
    this.dmw = {
      address: this.addresMap.dmw,
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: 'contractIndex',
              type: 'uint256',
            },
          ],
          name: 'claim',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'mintCoin',
              type: 'string',
            },
          ],
          name: 'issue',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_contractIndex',
              type: 'uint256',
            },
          ],
          name: 'estimatAddDepositAmount',
          outputs: [
            {
              name: '_depositValue',
              type: 'uint256',
            },
            {
              name: '_canClaimtValue',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_backedCoin',
              type: 'string',
            },
            {
              name: '_mintCoin',
              type: 'string',
            },
          ],
          name: 'getMinBackedAmount',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'contractIndex',
              type: 'uint256',
            },
          ],
          name: 'deposit',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_backedCoin',
              type: 'string',
            },
            {
              name: '_mintCoin',
              type: 'string',
            },
            {
              name: '_backedValue',
              type: 'uint256',
            },
          ],
          name: 'estimatMintAmount',
          outputs: [
            {
              name: 'amount',
              type: 'uint256',
            },
            {
              name: 'fee',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
    };
  }

  initDMWV2() {
    this.dmwV2 = {
      address: this.addresMap.dmwV2,
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: 'contractIndex',
              type: 'uint256',
            },
          ],
          name: 'claim',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'mintCoin',
              type: 'string',
            },
          ],
          name: 'issue',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_contractIndex',
              type: 'uint256',
            },
          ],
          name: 'estimatAddDepositAmount',
          outputs: [
            {
              name: '_depositValue',
              type: 'uint256',
            },
            {
              name: '_canClaimtValue',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_backedCoin',
              type: 'string',
            },
            {
              name: '_mintCoin',
              type: 'string',
            },
          ],
          name: 'getMinBackedAmount',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'contractIndex',
              type: 'uint256',
            },
          ],
          name: 'deposit',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_backedCoin',
              type: 'string',
            },
            {
              name: '_mintCoin',
              type: 'string',
            },
            {
              name: '_backedValue',
              type: 'uint256',
            },
          ],
          name: 'estimatMintAmount',
          outputs: [
            {
              name: 'amount',
              type: 'uint256',
            },
            {
              name: 'fee',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
    };
  }

  initDMWBase() {
    this.dmwBase = {
      address: this.addresMap.dmwBase,
      abi: [
        {
          constant: true,
          inputs: [
            {
              name: 'lang',
              type: 'string',
            },
          ],
          name: 'getTradingPairs',
          outputs: [
            {
              name: '',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: 'backedCoin',
              type: 'string',
            },
          ],
          name: 'exchangeLength',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'backedCoin',
              type: 'string',
            },
            {
              name: 'lang',
              type: 'string',
            },
            {
              name: 'descption',
              type: 'string',
            },
          ],
          name: 'addDescription',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'backedCoin',
              type: 'string',
            },
            {
              name: 'name',
              type: 'string',
            },
          ],
          name: 'addExchange',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'backedCoin',
              type: 'string',
            },
            {
              name: 'index',
              type: 'uint256',
            },
          ],
          name: 'delExchange',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: 'backedCoin',
              type: 'string',
            },
            {
              name: 'mintCoin',
              type: 'string',
            },
          ],
          name: 'getProxyAddress',
          outputs: [
            {
              name: '',
              type: 'address',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
    };
  }

  initDMWInfo() {
    this.dmwInfo = {
      address: this.addresMap.dmwInfo,
      abi: [
        {
          constant: true,
          inputs: [
            {
              name: '_backedCoin',
              type: 'string',
            },
            {
              name: '_mintCoin',
              type: 'string',
            },
            {
              name: '_lastIndex',
              type: 'uint256',
            },
            {
              name: 'pageSize',
              type: 'uint8',
            },
          ],
          name: 'keyPageContracts',
          outputs: [
            {
              name: 'result',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_backedCoin',
              type: 'string',
            },
            {
              name: '_mintCoin',
              type: 'string',
            },
            {
              name: '_lastIndex',
              type: 'uint256',
            },
            {
              name: 'pageSize',
              type: 'uint8',
            },
          ],
          name: 'myPageKeyContracts',
          outputs: [
            {
              name: 'result',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_lastIndex',
              type: 'uint256',
            },
            {
              name: 'pageSize',
              type: 'uint8',
            },
          ],
          name: 'myPageContracts',
          outputs: [
            {
              name: 'result',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
    };
  }

  initDMWInfoV2() {
    this.dmwInfoV2 = {
      address: this.addresMap.dmwInfoV2,
      abi: [
        {
          constant: true,
          inputs: [
            {
              name: '_backedCoin',
              type: 'string',
            },
            {
              name: '_mintCoin',
              type: 'string',
            },
            {
              name: '_lastIndex',
              type: 'uint256',
            },
            {
              name: 'pageSize',
              type: 'uint8',
            },
          ],
          name: 'keyPageContracts',
          outputs: [
            {
              name: 'result',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_backedCoin',
              type: 'string',
            },
            {
              name: '_mintCoin',
              type: 'string',
            },
            {
              name: '_lastIndex',
              type: 'uint256',
            },
            {
              name: 'pageSize',
              type: 'uint8',
            },
          ],
          name: 'myPageKeyContracts',
          outputs: [
            {
              name: 'result',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_lastIndex',
              type: 'uint256',
            },
            {
              name: 'pageSize',
              type: 'uint8',
            },
          ],
          name: 'myPageContracts',
          outputs: [
            {
              name: 'result',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
    };
  }

  initDMWProxy() {
    this.dmwProxy = {
      address: this.addresMap.dmwProxy,
      abi: [
        {
          constant: true,
          inputs: [
            {
              name: 'fee',
              type: 'uint256',
            },
          ],
          name: 'estimateGas',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: 'mintCoin',
              type: 'string',
            },
          ],
          name: 'issue',
          outputs: [],
          payable: true,
          stateMutability: 'payable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'feeCoin',
          outputs: [
            {
              name: '',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
    };
  }

  initCoinFactory() {
    this.coinFactory = {
      address: this.addresMap.coinFactory,
      abi: [
        {
          inputs: [
            {
              internalType: 'string',
              name: 'symbol',
              type: 'string',
            },
          ],
          name: 'totalSupply',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
    };
  }
}

// const configaddress = {
//   staking: "2CASDxyPxcG8Ek4sLnMy5mmoK94DeVgRw6E28NoCqw7kXAQqs3ZpdJET5cqEobGv1TKNjLVr2j1X5sVJXvEWYc3Z",
//   auction: "34esrhiuhqC9zQt4PSkHGQMFQBBhbYK5QHcrbtiqM621BWJ6ZkLTWZEqHpXoFhKkPexeiCFztPBPB29eHDqkD4er",
//   dmw: "erbTk53NpkVieDbCdP3Q54dtf63ZxqkmeniihxDFzKDZBqCEEjgRh5bCAwDrAnbgkDt3uVCYUX7v6RhkZ12ZrKV",
//   dmwV2: "v5DkAKjhsT9X997NqccHpiVkEfNC9p3HRgXuYFonXignBSRDCxZ7XLT6fqiLzRDLveZpn1UJuwWP4FFz6LBNqym",
//   dmwBase: "JY6PxE8d9UEAyBBZ3d4XbHwPRZq2bckqy58arZKe3AXR825u42Ypm1fJ5kHw8dbLgpjeoJqCseFc2X4s2zhtEAN",
//   dmwInfo: "54rjCXL3YpMvQWkpxwT4byd7rtLnZs3ksFNwkFfyBV6XUSrimxnk79pFQZT3gK1Xw3xtPeFZtJE87TgA8hWB4mHP",
//   dmwInfoV2:"5CcgtisRm5ehHxeb3JEDQQwgh3a1NciKpbekibRrs9KPKRfWpshyYMrhmenX9HStgyDjEGycFxvRxvYJSUk7gXN1",
//   dmwProxy: "5Gf9KSYWZZnhXMPRfBBQi7EznqSFDDerTSmW58ERUsWz6WGZ8BtrRJjXJuKEuN9iskjw8FuTWFKjXPbtAE5zBtbT",
//   coinFactory: "3Mfg7tx84QVynnMhBmuQB46nhRxW6sbnQZyL9TbLQfafJt4fTAgQNWqZbAhP1zoQNYUKsQMKtr4MJikBzsWaNgaP",
// }

/**
 * produce address
 */

const configaddress = {
  staking:
    '2FiVcKhkPpf9N5zyBKCaMF6Tp5TBVgrtM191ZmACdZXGpYQBmvKcdYKtjpXEkrKvjWEyGKWy33RTRTKFkf1qtiBo',
  auction:
    '5A1TkMf9ZkZabBRYRQSusGnshqduo8RiytktqTmQMVSsSoHU8yFq4Dx5EjZ1GM7GbG4aiTYsANFiVG9U6pUiF1V',
  dmw:
    '2LYCBCsUf23tDgBbwofPQDDd11ax4KrDtSmctiRDy45dgNmjWjwkriJd1yALo6YXJNgL5XRHLGBwmVtgaqUoVtnV',
  dmwV2:
    '2LYCBCsUf23tDgBbwofPQDDd11ax4KrDtSmctiRDy45dgNmjWjwkriJd1yALo6YXJNgL5XRHLGBwmVtgaqUoVtnV',
  dmwBase:
    'mLoJUJwQAikVipZ69TmydtKePpxm3qyGVqFSY4Xx5NGb9hxATsSZPKBfncCAgkKn8YdwWNKLy6YE8MvSr4dELv2',
  dmwInfo:
    '3okdXXHGneaSfKUeK8QhFRuBVpH15kRNc3hmN5NyRL9HKe9mpJyd2ZdzmffL6Xrp6NpweiwgGmaEfaf8ycxSuzDa',
  dmwInfoV2:
    '3okdXXHGneaSfKUeK8QhFRuBVpH15kRNc3hmN5NyRL9HKe9mpJyd2ZdzmffL6Xrp6NpweiwgGmaEfaf8ycxSuzDa',
  dmwProxy:
    '5Gf9KSYWZZnhXMPRfBBQi7EznqSFDDerTSmW58ERUsWz6WGZ8BtrRJjXJuKEuN9iskjw8FuTWFKjXPbtAE5zBtbT',
  coinFactory:
    '36qvyVN3FGZpHNwEZGPsdwWw9XKhKixUw2aFwZGpu5WQQPWRRMYXqBqKEByVaAKLLJf3zR9KQZkDuYYPNN4nyykz',
};
const config = new Config(configaddress);

export default config;
