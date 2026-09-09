// thought:
// - we can achieve O(1) space by reversing the linked list

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
  if (head === null || head.next === null) {
    return 0;
  }

  let slow: ListNode = head;
  let fast: ListNode | null = head.next;

  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  let right: ListNode | null = slow.next;
  let left: ListNode | null = slow;

  // cut left and right
  left.next = null;

  // reverse the left part
  let prev: ListNode = head;
  let curr: ListNode | null = head.next;
  while (curr !== null) {
    const next: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  let res = 0;
  while (left !== null && right !== null) {
    res = Math.max(res, left.val + right.val);
    right = right.next;
    left = left.next;
  }

  return res;
}
