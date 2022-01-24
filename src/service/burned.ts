import gerorpc from '@/common/gerorpc';
import BigNumber from 'bignumber.js';

class Burned {
  constructor() {}

  async getTotalBurned(cy: string): Promise<number> {
    const rest = await gerorpc.post('sero_getBalance', [
      '66cAn2FJL4JoSEoCSNZK1WR2BJTxc7esYb6h2Se3pokSwqF4TXE5ES1ruGfNZtNEZpbnPAi1voG9pkkN5kFTH27Q',
      'latest',
    ]);
    const balance = rest['tkn'] ? rest['tkn'][cy] : 0;
    return new BigNumber(
      new BigNumber(balance).dividedBy(1e18).toFixed(0, 1),
    ).toNumber();
  }
}

const burned = new Burned();

export default burned;
