class ConfigProd {
  staking = {
    address:
      '2FiVcKhkPpf9N5zyBKCaMF6Tp5TBVgrtM191ZmACdZXGpYQBmvKcdYKtjpXEkrKvjWEyGKWy33RTRTKFkf1qtiBo',
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

  auction = {
    address:
      '5A1TkMf9ZkZabBRYRQSusGnshqduo8RiytktqTmQMVSsSoHU8yFq4Dx5EjZ1GM7GbG4aiTYsANFiVG9U6pUiF1V',
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

  dmw = {
    address:
      '5RyUgPb8tWLqkp8YKHahbzUC7rmDHYFTbNdNf2M83T5Ms2hyouJZhP3yGxY6gMX7zDB7jRo7AjNaeo1owKY2rsPY',
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
            name: '_backedCoin',
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
      {
        constant: false,
        inputs: [
          {
            name: '_contractIndex',
            type: 'uint256',
          },
        ],
        name: 'createAuction',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  };

  dmwBase = {
    address:
      'mLoJUJwQAikVipZ69TmydtKePpxm3qyGVqFSY4Xx5NGb9hxATsSZPKBfncCAgkKn8YdwWNKLy6YE8MvSr4dELv2',
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

  dmwInfo = {
    address:
      '2XcFCFRiq4CcxdRDmMoHk3iyLssGLUPnqbkuUgqNAs7mQyyR93p56He1RAWWSPFEYHzhxCWkR6ezLKpvWGqKXnpx',
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
            name: 'offset',
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
            name: 'offset',
            type: 'uint256',
          },
          {
            name: 'pageSize',
            type: 'uint256',
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

  dmwProxy = {
    address:
      '5Gf9KSYWZZnhXMPRfBBQi7EznqSFDDerTSmW58ERUsWz6WGZ8BtrRJjXJuKEuN9iskjw8FuTWFKjXPbtAE5zBtbT',
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
const config = new ConfigProd();

export default config;
