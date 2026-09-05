// State machine DP
//
// Two states, both describing the best subarray that ends at index i:
//   - noDel:  no element has been deleted yet
//   - oneDel: exactly one element has been deleted
//
// Transitions when moving to arr[i]:
//   - noDel  = max(arr[i], noDel + arr[i])   // Kadane
//   - oneDel = max(noDel, oneDel + arr[i])   // delete arr[i] now, or keep
//                                            // extending a subarray that
//                                            // already deleted one element
//
// Time: O(n)
// Space: O(1)
function maximumSum(arr: number[]): number {
  let noDel = arr[0];
  // -Infinity means "no valid subarray with one deletion yet", so a
  // single element is never treated as deletable to an empty subarray.
  let oneDel = -Infinity;
  let res = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // oneDel must be updated first, it needs the previous noDel
    oneDel = Math.max(noDel, oneDel + arr[i]);
    noDel = Math.max(arr[i], noDel + arr[i]);
    res = Math.max(res, noDel, oneDel);
  }

  return res;
}
