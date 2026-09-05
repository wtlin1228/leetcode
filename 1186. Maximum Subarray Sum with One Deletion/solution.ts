// to avoid allocate the same default entry
const defaultEntry = { empty: true, val: 0 };

// Time: O(n)
// Space: O(n)
function maximumSum(arr: number[]): number {
  if (arr.length === 1) {
    return arr[0];
  }

  const size = arr.length;
  const rightMax = new Array(size).fill(defaultEntry);
  const leftMax = new Array(size).fill(defaultEntry);

  if (arr[size - 1] >= 0) {
    rightMax[size - 1] = { empty: false, val: arr[size - 1] };
  }
  for (let i = size - 2; i >= 0; i--) {
    const val = Math.max(arr[i], arr[i] + rightMax[i + 1].val);
    if (val >= 0) {
      rightMax[i] = { empty: false, val };
    }
  }

  if (arr[0] >= 0) {
    leftMax[0] = { empty: false, val: arr[0] };
  }
  for (let i = 1; i < size; i++) {
    const val = Math.max(arr[i], arr[i] + leftMax[i - 1].val);
    if (val >= 0) {
      leftMax[i] = { empty: false, val };
    }
  }

  let res = arr[0];
  for (let i = 0; i < size; i++) {
    const l = i === 0 ? defaultEntry : leftMax[i - 1];
    const r = i === size - 1 ? defaultEntry : rightMax[i + 1];

    if (r.empty && l.empty) {
      // can't ignore
      res = Math.max(res, arr[i]);
    } else {
      // can ignore
      res = Math.max(res, l.val + r.val, arr[i] + l.val + r.val);
    }
  }

  return res;
}
