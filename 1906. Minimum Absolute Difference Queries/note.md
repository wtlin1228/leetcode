# Note: Interval DP vs. Value-Domain Prefix Counts

Both solutions answer every query in O(1) or O(100) after a
precomputation. They differ in what the precomputation indexes on.

## solution.ts: interval DP over positions

- `map[l][r]` is the answer for the subarray `nums[l..r]`.
- Filled diagonal by diagonal, from short intervals to long ones:
  `map[l][r] = min(map[l][r-1], map[l+1][r], |nums[l] - nums[r]|)`.
- Equal endpoints are skipped so `0` never counts as a difference.
- `Infinity` survives only when all elements are equal, which maps to
  `-1`.

|       |                               |
| ----- | ----------------------------- |
| Time  | O(n^2 + q)                    |
| Space | O(n^2), too much for n = 10^5 |

## solution-2.ts: prefix counts over values

- Exploits `1 <= nums[i] <= 100`. Only 100 distinct values exist, so
  the question becomes "which values appear in the range?".
- `prefix[i][v]` is how many times `v` appears in `nums[0..i-1]`.
  Value `v` is present in `[l, r]` when `prefix[r+1][v] > prefix[l][v]`.
- Scanning `v` in ascending order, the minimum difference between
  distinct values is always between two neighbors in sorted order, so
  each present value is compared only with the previous present one.
- Fewer than two present values leaves `best` at `Infinity`, hence `-1`.

|       |                              |
| ----- | ---------------------------- |
| Time  | O(100 \* (n + q))            |
| Space | O(100 \* n), about 10^7 ints |

## Takeaway

When a range query is hard over positions but the value domain is tiny,
flip the axis: precompute per-value prefix counts and scan the values
instead of the elements. The sorted-neighbor argument then turns "min
pairwise difference" into a single linear pass over the domain.
