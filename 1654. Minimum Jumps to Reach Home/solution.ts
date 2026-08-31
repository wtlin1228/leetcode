// when a > b, the peak point p = x + b (easy to reason about)
// when a < b, the peak point p = M + a + b (M = max(x, forbidden[i]))
// suppose we have a peak point p > M + a + b
// - the previous point must be p - a
// - and the next point must be p - b
// - the path is    p-a ---> p ---> p-b
//   reorder it to  p-a ---> p-a-b ---> p-b, why can we do that?
//   1. p-a-b is great than M, so it's not forbidden
//   2. p-a+b is greater than p, so the previous step must be p-a-a
//   so the full path is p-a-a ---> p-a ---> p ---> p-b
//                              +a       +a     -b
//            reorder to p-a-a ---> p-a ---> p-a-b ---> p-b
//                              +a       -b         +a

function minimumJumps(
  forbidden: number[],
  a: number,
  b: number,
  x: number,
): number {
  let m = x;
  for (const n of forbidden) {
    m = Math.max(m, n);
  }

  // need to prove why we don't need to consider the points > peak
  const peak = m + a + b;

  const visitedByStepA: boolean[] = new Array(peak + 1).fill(false);
  const visitedByBackB: boolean[] = new Array(peak + 1).fill(false);
  visitedByStepA[0] = true;
  visitedByBackB[0] = true;
  for (const n of forbidden) {
    visitedByStepA[n] = true;
    visitedByBackB[n] = true;
  }

  // do BFS, node is [current position, can jump back?]
  let curr: [number, boolean][] = [[0, false]];
  let steps = 0;
  while (curr.length > 0) {
    const next: [number, boolean][] = [];

    for (const [pos, canJumpBack] of curr) {
      if (pos === x) {
        return steps;
      }

      // jump ahead
      const ahead = pos + a;
      if (ahead <= peak && !visitedByStepA[ahead]) {
        visitedByStepA[ahead] = true;
        next.push([ahead, true]);
      }

      if (!canJumpBack) {
        continue;
      }

      // jump back
      const back = pos - b;
      if (back >= 0 && !visitedByBackB[back]) {
        visitedByBackB[back] = true;
        next.push([back, false]);
      }
    }

    curr = next;
    steps += 1;
  }

  return -1;
}
