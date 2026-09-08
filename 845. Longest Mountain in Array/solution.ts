enum Dir {
  UP,
  DOWN,
  STOP,
}

const getDir = (a: number, b: number): Dir => {
  if (a === b) {
    return Dir.STOP;
  }
  if (a < b) {
    return Dir.UP;
  }
  return Dir.DOWN;
};

// Time: O(n), Space: O(1)
function longestMountain(arr: number[]): number {
  let res = 0;
  let startIndex = 0; // first index when dir turns up
  let prev: Dir | null = null;
  let curr = getDir(arr[0], arr[1]);

  for (let i = 1; i < arr.length - 1; i++) {
    const next = getDir(arr[i], arr[i + 1]);
    if (next === curr) {
      continue;
    }
    if (prev === Dir.UP && curr === Dir.DOWN) {
      res = Math.max(res, i - startIndex + 1);
    }
    if (next === Dir.UP) {
      startIndex = i;
    }
    prev = curr;
    curr = next;
  }
  if (prev === Dir.UP && curr === Dir.DOWN) {
    res = Math.max(res, arr.length - startIndex);
  }

  return res;
}
