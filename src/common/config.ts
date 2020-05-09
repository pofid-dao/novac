class Config {
  staking = {
    address:
      '7vYvTXoZEigEZj7vZkHHdy4A88chGXkztaq2qQgWahvsrqTLUdxQBvXjzepTFadgowVUwNFiELNvZHk75x7nV6u',
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
      '34esrhiuhqC9zQt4PSkHGQMFQBBhbYK5QHcrbtiqM621BWJ6ZkLTWZEqHpXoFhKkPexeiCFztPBPB29eHDqkD4er',
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
      '54CG4EkCoU8cYvER9AKAGigXYf9SJ7rjKdVDaigLDjE17Pc2afHS1c3DBEZEddds9WWLZVSpKiJpbseudBM57v7Q',
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
      '54CpSM8xptrnuM5RugRdEULu6rnSDV1Wm9BHzbuNYp6GRS7eVWxe5fMv8jzfK5tmoUzDjoswru1F9CzHf8EHnyDF',
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
      '3tLZtpnEPd5Cf2th6j1S2aSfDLZeZmDoGTV2ZoJThESPVe7XCGVQsSBR24HGPBTMnxtbXJr3aKZeCWzPqTHuxbCd',
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
const config = new Config();

export default config;
