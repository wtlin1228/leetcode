const M = 1_000_000_007n; // it's a prime

function powmod(base: bigint, exp: bigint): bigint {
  let res = 1n;
  base = base % M;
  while (exp > 0n) {
    if (exp & 1n) {
      res = (res * base) % M;
    }
    base = (base * base) % M;
    exp = exp >> 1n;
  }
  return res;
}

function makeBinomialCoefficient(): (n: number, k: number) => bigint {
  const N = 100_001;
  const fact = new Array<bigint>(N);
  const invFact = new Array<bigint>(N);

  fact[0] = 1n;
  for (let i = 1; i < N; i++) {
    fact[i] = (fact[i - 1] * BigInt(i)) % M;
  }

  invFact[N - 1] = powmod(fact[N - 1], M - 2n); // Fermat's little theorem
  for (let i = N - 2; i >= 0; i--) {
    invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % M; // 1/(n-1)! = (1/n!) * n
  }

  function binomialCoefficient(n: number, k: number): bigint {
    if (k > n || k < 0) {
      throw new Error(`C(${n}, ${k}) is not allowed`);
    }
    return (((fact[n] * invFact[k]) % M) * invFact[n - k]) % M;
  }

  return binomialCoefficient;
}

const c = makeBinomialCoefficient();

/**
 * 1. find each segment, the variation for each are: [x] = 2^0, [x,x] = 2^1, [x,x,x] = 2^2, ...
 * 2. combine segments, ex: combine [x,x] and [x,x,x] = C(5,2) = 10
 * 3. variation * variation * combination, ex: [x,x] and [x,x,x] = 2 * 4 * 10 = 80
 *
 * therefore, numberOfSequence(8, [0, 3, 7]) = 2 * 4 * C(5, 2) * C(3, 3) = 10
 *            numberOfSequence(13, [0, 3, 7, 11]) = 2 * 4 * 8 * C(9, 2) * C(7, 3) * C(4,4)
 */
function numberOfSequence(n: number, sick: number[]): number {
  const segments: number[] = [];
  let res: bigint = 1n;

  // 1. construct the segment length array and calculate the variations
  if (sick[0] != 0) {
    segments.push(sick[0]);
  }
  for (let i = 0; i < sick.length - 1; i++) {
    const l = sick[i + 1] - sick[i] - 1;
    if (l != 0) {
      segments.push(l);
      res = (res * powmod(2n, BigInt(l - 1))) % M;
    }
  }
  if (n - sick[sick.length - 1] - 1 != 0) {
    segments.push(n - sick[sick.length - 1] - 1);
  }

  // 2. calculate the combinations by iterating through the segment length array
  let healthyCount = n - sick.length;
  for (let i = 0; i < segments.length; i++) {
    res = (res * c(healthyCount, segments[i])) % M;
    healthyCount -= segments[i];
  }

  return Number(res);
}
