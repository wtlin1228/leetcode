// 1. build a 2d map for search
//
//    num = 56, k = 4 => return map[4][6] / k since num >= map[4][6]
//    num = 14, k = 3 => return -1 since if num < map[3][4]
//    num = 25, k = 2 => return -1 since map[2][5] is -1
//
//      |  0 |  1 |  2 | 3 |  4 |  5 |  6 |  7 |  8 | 9
//    0 |    |    |    |   |    |    |    |    |    |
//    1 | 10 |  1 |  2 | 3 |  4 |  5 |  6 |  7 |  8 | 9
//    2 | 10 |    |  2 |   |  4 |    |  6 |    |  8 |
//    3 | 30 | 21 | 12 | 3 | 24 | 15 |  6 | 27 | 18 | 9
//    4 | 20 |    | 12 |   |  4 |    | 16 |    |  8 |
//    5 | 10 |    |    |   |    |  5 |    |    |    |
//    6 |
//    7 |
//    8 |
//    9 |

const map: number[][] = Array.from({ length: 10 }, () =>
  new Array(10).fill(-1),
);

for (let i = 1; i < 10; i++) {
  for (let j = 1; j <= 10; j++) {
    const n = i * j;
    map[i][n % 10] = n;
    if (n % 10 === 0) {
      break;
    }
  }
}

function minimumNumbers(num: number, k: number): number {
  if (num === 0) {
    return 0;
  }
  if (num % 10 === 0 && k === 0) {
    return 1;
  }

  const n = map[k][num % 10];

  if (n !== -1 && num >= n) {
    return n / k;
  }

  return -1;
}
