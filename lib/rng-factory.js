import RNG from './rng'

import RNGXOR128 from './generators/xor128'
import RNGSeedRandom from './generators/seedrandom'
import RNGMathRandom from './generators/math-random'

const PRNG_BUILTINS = {
  // TODO: add more prng from C++11 lib
  'xor128': RNGXOR128,
  'seedrandom': RNGSeedRandom,
  'default': RNGMathRandom
}

export default (...args) => {
  const [ arg0 = 'default', ...rest ] = args

  switch (typeof arg0) {
    case 'object':
      if (arg0 instanceof RNG) {
        return arg0
      }
      break

    case 'function':
      return new RNGSeedRandom(arg0)

    case 'string':
      const PRNG = PRNG_BUILTINS[arg0]
      if (PRNG) {
        return new PRNG(...rest)
      }
      break
  }

  throw new Error(`invalid RNG "${arg0}"`)
}