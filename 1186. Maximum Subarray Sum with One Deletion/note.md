# Note: Two DP Shapes for One Deletion

Both solutions are dynamic programming and both run in O(n) time. They
differ in how they represent the "one deletion" choice.

## solution.ts: prefix / suffix DP

- `leftMax[i]` is the best subarray sum ending at `i`.
- `rightMax[i]` is the best subarray sum starting at `i`.
- Both tables are Kadane's recurrence, run once from the left and once
  from the right.
- The final pass tries every index `i` as the deleted element and joins
  `leftMax[i - 1]` with `rightMax[i + 1]`.
- Negative prefix or suffix sums are stored as `empty` so they count as
  zero. This is the usual `max(sum, 0)` trick with an explicit flag,
  which is also what handles the all-negative case.

|       |                             |
| ----- | --------------------------- |
| Time  | O(n), three passes          |
| Space | O(n), two arrays of objects |

## solution-2.ts: state machine DP

- The state is "how many deletions have been used so far", 0 or 1.
- `noDel` is Kadane. `oneDel` either deletes the current element and
  inherits the previous `noDel`, or extends a subarray that already
  deleted one element.
- Each step only needs the previous step, so the two tables collapse
  into two variables.
- `oneDel` starts at `-Infinity`, so a single element is never deleted
  down to an empty subarray. This removes the need for a special case
  when `arr.length === 1`.

|       |                |
| ----- | -------------- |
| Time  | O(n), one pass |
| Space | O(1)           |

## Takeaway

When a problem allows one modification somewhere in a sequence, there
are two common DP shapes:

1. Precompute left and right tables and join them at the modification
   point.
2. Carry the modification as an extra dimension of the DP state.

The second is usually the space-optimal form. The same pattern applies
to 1493. Longest Subarray of 1's After Deleting One Element and to the
"at most k transactions" stock problems.
