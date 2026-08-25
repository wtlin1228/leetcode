# 848. Shifting Letters

**Difficulty:** Medium

## Problem

You're given a string `s` of lowercase English letters and an integer
array `shifts` with the same length as `s`.

Define `shift()` on a letter as moving it forward one position in the
alphabet, wrapping `'z'` back around to `'a'`:

- `shift('a') = 'b'`, `shift('t') = 'u'`, `shift('z') = 'a'`

For each entry `shifts[i] = x`, apply `x` shifts to **each of the first
`i + 1` characters** of `s`.

Return the string that results after every shift operation has been applied.

## Example 1

**Input:** `s = "abc"`, `shifts = [3,5,9]`
**Output:** `"rpl"`

**Explanation:**
| Operation | Applied to | Result |
|-----------|------------------|--------|
| shift × 3 | first 1 letter | `dbc` |
| shift × 5 | first 2 letters | `igc` |
| shift × 9 | first 3 letters | `rpl` |

## Example 2

**Input:** `s = "aaa"`, `shifts = [1,2,3]`
**Output:** `"gfd"`

## Constraints

- `1 <= s.length <= 10^5`
- `s` contains only lowercase English letters
- `shifts.length == s.length`
- `0 <= shifts[i] <= 10^9`
