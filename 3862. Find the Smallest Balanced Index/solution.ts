// thoughts:
// 1. no negative numbers
// 2. product of all numbers could exceed the max safe number 2^53
// 3. once rightProduct > leftSum, no smaller index can match
// 4. sum(nums) <= 10^14 < 2^53, so `===` always compares exact numbers

function smallestBalancedIndex(nums: number[]): number {
  // start from the right-most index; leftSum begins as the total sum
  // and becomes the sum strictly left of i after each subtraction
  let leftSum = nums.reduce((acc, curr) => acc + curr, 0);
  let rightProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    leftSum -= nums[i];
    // rightProduct can overflow 2^53 at most once. an overflowed value
    // is imprecise but still huge (>= 2^53 ~ 9 * 10^15), so comparing
    // it against leftSum (<= 10^14) is always correct, and we return -1
    // here before it can reach `===` or be multiplied again
    if (rightProduct > leftSum) {
      return -1;
    }
    if (leftSum === rightProduct) {
      return i;
    }
    rightProduct *= nums[i];
  }
  return -1;
}
