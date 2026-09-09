// thoughts:
// - build an number array by going through the list,
//   then find the maximum twin sum by iterating the number array
//   this is O(n) time and O(n) space
// - do we do better on the space complexity?

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function pairSum(head: ListNode | null): number {
  const nums: number[] = [];
  let node = head;
  while (node !== null) {
    nums.push(node.val);
    node = node.next;
  }
  let res = 0;
  for (let i = 0; i < nums.length / 2; i++) {
    res = Math.max(res, nums[i] + nums[nums.length - i - 1]);
  }
  return res;
}
