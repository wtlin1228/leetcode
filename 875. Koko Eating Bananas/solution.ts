// Thoughts:
//
// - 1 <= k <= max(...piles)
//   => if h == piles.length, then k = max(...piles)
//   => if h == sum of piles, then k = 1
//
// Approach1: binary search
//   - time: O(n * log(max(piles)))
//   - space: O(1)
//   - optimization: remove he pile <= the lower bound

function minEatingSpeed(piles: number[], h: number): number {
  // O(n)
  const max = Math.max(...piles);

  if (h === piles.length) {
    return max;
  }

  // O(n)
  if (h === piles.reduce((acc, curr) => (acc += curr), 0)) {
    return 1;
  }

  // O(n)
  const getTime = (k: number): number =>
    piles.reduce((acc, curr) => (acc += Math.ceil(curr / k)), 0);

  // O(n * log(max(piles)))
  let lo = 0;
  let hi = max;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const t = getTime(mid);
    if (t > h) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return lo;
}
