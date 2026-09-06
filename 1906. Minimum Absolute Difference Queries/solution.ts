// thoughts:
// - build a 2D map which holds the answers of [left, right] queries
//   - only need to build the top-right triangle since left < right
//   - map[l][r] = Min(
//       map[l][r-1],
//       map[l+1][r],
//       Abs(nums[l] - nums[r])
//     )
//   - time: O(n^2), space: O(n^2) for building the map
// - optimization: build partial map
//   - get the upper bound by looping through the queries first
// - overall time: O(q + n^2), space: O(n^2)

function minDifference(nums: number[], queries: number[][]): number[] {
  const size = nums.length;
  const map: number[][] = Array.from({ length: size }, () =>
    Array(size).fill(Infinity),
  );

  for (let i = 1; i < size; i++) {
    for (let j = 0; j < size - i; j++) {
      map[j][j + i] = Math.min(map[j][j + i - 1], map[j + 1][j + i]);
      if (nums[j] !== nums[j + i]) {
        const nonOverlap = Math.abs(nums[j] - nums[j + i]);
        map[j][j + i] = Math.min(map[j][j + i], nonOverlap);
      }
    }
  }

  return queries.map(([left, right]) => {
    const val = map[left][right];
    return val === Infinity ? -1 : val;
  });
}
