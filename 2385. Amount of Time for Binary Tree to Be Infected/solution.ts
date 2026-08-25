/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function amountOfTime(root: TreeNode | null, start: number): number {
  return dfs(root, start).maxStepsToInfectTheWholeTree;
}

function dfs(
  node: TreeNode | null,
  start: number,
): {
  maxStepsToInfectTheWholeTree: number;
  hasStart: boolean;
  stepsToStart: number;
} {
  if (node === null) {
    return {
      maxStepsToInfectTheWholeTree: 0,
      hasStart: false,
      stepsToStart: 0,
    };
  }

  const l = dfs(node.left, start);
  const r = dfs(node.right, start);

  if (l.hasStart) {
    return {
      maxStepsToInfectTheWholeTree: Math.max(
        l.maxStepsToInfectTheWholeTree,
        l.stepsToStart + r.maxStepsToInfectTheWholeTree + 1,
      ),
      hasStart: true,
      stepsToStart: l.stepsToStart + 1,
    };
  } else if (r.hasStart) {
    return {
      maxStepsToInfectTheWholeTree: Math.max(
        r.maxStepsToInfectTheWholeTree,
        r.stepsToStart + l.maxStepsToInfectTheWholeTree + 1,
      ),
      hasStart: true,
      stepsToStart: r.stepsToStart + 1,
    };
  } else if (node.val === start) {
    return {
      maxStepsToInfectTheWholeTree: Math.max(
        l.maxStepsToInfectTheWholeTree,
        r.maxStepsToInfectTheWholeTree,
      ),
      hasStart: true,
      stepsToStart: 0,
    };
  } else {
    return {
      maxStepsToInfectTheWholeTree:
        Math.max(
          l.maxStepsToInfectTheWholeTree,
          r.maxStepsToInfectTheWholeTree,
        ) + 1,
      hasStart: false,
      stepsToStart: 0,
    };
  }
}
