# 2385. Amount of Time for Binary Tree to Be Infected

**Difficulty:** Medium

## Problem

You're given the `root` of a binary tree where every node holds a unique
value, along with an integer `start`. At minute `0`, an infection begins
at the node whose value equals `start`.

With each passing minute, the infection spreads: any uninfected node that
is adjacent (parent or child) to an infected node becomes infected.

Return the total number of minutes required for **every** node in the
tree to become infected.

## Example 1

**Input:** `root = [1,5,3,null,4,10,6,9,2]`, `start = 3`
**Output:** `4`

**Explanation:**
| Minute | Newly infected nodes |
|--------|----------------------|
| 0 | 3 |
| 1 | 1, 10, 6 |
| 2 | 5 |
| 3 | 4 |
| 4 | 9, 2 |

The whole tree is infected after 4 minutes.

## Example 2

**Input:** `root = [1]`, `start = 1`
**Output:** `0`

**Explanation:** The single node is infected at minute 0.

## Constraints

- Number of nodes is in the range `[1, 10^5]`
- `1 <= Node.val <= 10^5`
- All node values are unique
- A node with value `start` is guaranteed to exist in the tree
