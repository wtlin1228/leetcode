// Time: O(100 * (q + n))
// Space: O(100 * n)
function minDifference(nums: number[], queries: number[][]): number[] {
  const prefix: number[][] = Array.from({ length: nums.length + 1 }, () =>
    new Array(101).fill(0),
  );

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j <= 100; j++) {
      prefix[i + 1][j] = prefix[i][j];
    }
    prefix[i + 1][nums[i]] += 1;
  }

  return queries.map(([l, r]) => {
    let prev = -1;
    let best = Infinity;
    for (let v = 1; v <= 100; v++) {
      if (prefix[r + 1][v] > prefix[l][v]) {
        if (prev !== -1) {
          best = Math.min(best, v - prev);
        }
        prev = v;
      }
    }
    return best === Infinity ? -1 : best;
  });
}
