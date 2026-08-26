# 3862. Find the Smallest Balanced Index

**Difficulty:** Medium

## Problem

You are given an integer array `nums`.

An index `i` is **balanced** if the **sum** of the elements strictly to
the **left** of `i` equals the **product** of the elements strictly to
the **right** of `i`.

- If there are no elements to the left, the sum is considered `0`.
- If there are no elements to the right, the product is considered `1`.

Return an integer denoting the **smallest** balanced index. If no
balanced index exists, return `-1`.

## Example 1

**Input:** `nums = [2,1,2]`
**Output:** `1`

**Explanation:**
For index `i = 1`, the left sum = `nums[0] = 2` and the right product =
`nums[2] = 2`, so index `1` is balanced.

## Example 2

**Input:** `nums = [2,8,2,2,5]`
**Output:** `2`

**Explanation:**
For index `i = 2`, the left sum = `2 + 8 = 10` and the right product =
`2 * 5 = 10`, so index `2` is balanced.

## Example 3

**Input:** `nums = [1]`
**Output:** `-1`

**Explanation:**
For index `i = 0`, the left sum = `0` and the right product = `1`, so
index `0` is not balanced.

## Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
