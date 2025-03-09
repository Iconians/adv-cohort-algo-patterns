const characterReplacementScrap = (s: string, k: number) => {
  const map = new Map();
  let max = 0;
  let left = 0;
  let maxCount = 0;

  for (let right = 0; right < s.length; right++) {
    const curr = s[right];
    map.set(curr, (map.get(curr) || 0) + 1);
    maxCount = Math.max(maxCount, map.get(curr));
    while (right - left + 1 - maxCount > k) {
      map.set(s[left], map.get(s[left])! - 1);
      left++;
    }
    max = Math.max(max, right - left + 1);
  }
  return max;
};

// console.log(characterReplacementScrap("AABABBA", 1));
// console.log(characterReplacementScrap("A", 2));

const minWindowScrap = (s: string, t: string) => {
  const tMap = new Map();
  const sMap = new Map();
  const count = t.length;
  let result = "";
  let currCount = 0;
  let left = 0;

  for (let curr of t) {
    tMap.set(curr, (tMap.get(curr) || 0) + 1);
  }

  for (let right = 0; right < s.length; right += 1) {
    if (tMap.get(s[right])) {
      sMap.set(s[right], (sMap.get(s[right]) || 0) + 1);
      if (sMap.get(s[right]) <= tMap.get(s[right])) {
        currCount++;
      }
    }

    while (
      currCount >= count &&
      (sMap.get(s[left])! > tMap.get(s[left])! || !tMap.get(s[left]))
    ) {
      if (sMap.get(s[left])! > tMap.get(s[left])!) {
        sMap.set(s[left], sMap.get(s[left])! - 1);
      }
      left++;
    }
    if (currCount >= count) {
      if (result === "") {
        result = s.slice(left, right + 1);
      } else {
        result =
          right - left + 1 < result.length ? s.slice(left, right + 1) : result;
      }
    }
  }
  return result;
};

// console.log(minWindowScrap("ADOBECODEBANC", "ABC"));
// console.log(minWindowScrap("a", "aa"));

function maxChildren(greed: number[], cookie: number[]) {
  greed.sort((a, b) => a - b);
  cookie.sort((a, b) => a - b);
  let i = 0;
  let j = 0;
  let count = 0;

  while (i < greed.length && j < cookie.length) {
    if (greed[i] <= cookie[j]) {
      count++;
      i++;
      j++;
    } else j++;
  }
  return count;
}
const greed = [1, 2, 3];
const cookie = [1, 1];
// console.log(maxChildren(greed, cookie));

function minJumps(arr: number[]) {
  const n = arr.length;
  if (n === 1) return 0;
  const jumps = new Array(n).fill(Infinity);
  jumps[0] = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j <= i + arr[i] && j < n; j++) {
      jumps[j] = Math.min(jumps[j], jumps[i] + 1);
    }
  }
  return jumps[n - 1];
}

// const input = [2, 3, 1, 1, 4];
// console.log(minJumps(input), "jump function"); // Output: 2
// console.log(minJumps([3, 2, 1, 0, 4]));

function leastIntervalScrap(tasks: string[], coolingPeriod: number): number {
  const taskCount = new Array(26).fill(0);
  let maxCount = 0;
  let tasksMaxCount = 0;

  for (let task of tasks) {
    const i = task.charCodeAt(0) - "A".charCodeAt(0);
    taskCount[i]++;
    maxCount = Math.max(maxCount, taskCount[i]);
  }

  for (let count of taskCount) {
    if (count === maxCount) {
      tasksMaxCount++;
    }
  }

  const minSlotsRequired = (maxCount - 1) * (coolingPeriod + 1) + tasksMaxCount;

  return Math.max(tasks.length, minSlotsRequired);
}

// console.log(leastIntervalScrap(["A", "A", "A", "B", "B", "B"], 2)); // Normal Case
// console.log(leastIntervalScrap(["A", "B", "C", "D"], 0)); // Edge Case: No cooldown period

function startStation(gas: number[], cost: number[]) {
  let totalGas = 0;
  let currGas = 0;
  let startIdx = 0;

  for (let i = 0; i < gas.length; i++) {
    currGas += gas[i] - cost[i];
    totalGas += gas[i] - cost[i];

    if (currGas < 0) {
      currGas = 0;
      startIdx = i + 1;
    }
  }
  return totalGas < 0 ? -1 : startIdx;
}

// console.log(startStation([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));
// console.log(startStation([2, 3, 4], [3, 4, 3]));

function subsetRecur(
  i: number,
  arr: number[],
  res: unknown[][],
  subset: unknown[]
) {
  // add subset at end of array
  if (i === arr.length) {
    res.push([...subset]);
    return;
  }

  // include the current value and
  // recursively find all subsets
  subset.push(arr[i]);
  subsetRecur(i + 1, arr, res, subset);

  // exclude the current value and
  // recursively find all subsets
  subset.pop();
  subsetRecur(i + 1, arr, res, subset);
}

function subsets(arr: number[]) {
  const subset: unknown[] = [];
  const res: unknown[][] = [];
  subsetRecur(0, arr, res, subset);
  return res;
}

// const arr = [1, 2, 3];
// const res = subsets(arr);
// console.log(res);

// for (const subset of res) {
//   console.log(subset.join(" "));
// }

function genParenthesisUtilScrap(
  num: number,
  open: number,
  close: number,
  str: string,
  answer: string[]
) {
  if (open === num && close === num) {
    answer.push(str);
  }

  if (open < num) {
    genParenthesisUtilScrap(num, open + 1, close, str + "(", answer);
  }

  if (close < open) {
    genParenthesisUtilScrap(num, open, close + 1, str + ")", answer);
  }
}

function findAllParenthesisCombos(num: number) {
  let answer: string[] = [];
  if (num > 0) {
    genParenthesisUtilScrap(num, 0, 0, "", answer);
  }
  return answer;
}

// console.log(findAllParenthesisCombos(3)); // Normal Case
// console.log(findAllParenthesisCombos(0));

// function recurPermute(index: number, str: string[], ans: Set<unknown>) {
//   // Base Case
//   if (index === str.length) {
//     ans.add(str.join(""));
//     return;
//   }

//   // Swap the current index with all
//   // possible indices and recur
//   for (let i = index; i < str.length; i++) {
//     [str[index], str[i]] = [str[i], str[index]];
//     recurPermute(index + 1, str, ans);
//     [str[index], str[i]] = [str[i], str[index]];
//   }
// }

// // Function to find all unique permutations
// function findPermutationScrap(s: string) {
//   // sort input string
//   const str = s.split("").sort();

//   // Stores all unique permutations
//   let res = new Set();
//   recurPermute(0, str, res);

//   // Convert Set to Array for the final answer
//   return Array.from(res).sort();
// }

function recurPermutationsScrap(
  index: number,
  numArr: number[],
  answer: Set<unknown>
) {
  if (index === numArr.length) {
    answer.add(numArr.join(""));
    return;
  }

  for (let i = index; i < numArr.length; i++) {
    [numArr[index], numArr[i]] = [numArr[i], numArr[index]];
    recurPermutationsScrap(index + 1, numArr, answer);
    [numArr[index], numArr[i]] = [numArr[i], numArr[index]];
  }
}

function findPermutationScrap(numArr: number[]) {
  const sortNum = numArr.sort();
  let res = new Set();
  recurPermutationsScrap(0, sortNum, res);
  return Array.from(res).sort();
}

const n = [1, 2, 3];
const s = "ABC";
// const res = findPermutationScrap(n);
// console.log(res.join(" "));
// makeCombination(arr, target, cur, res, 0);

function findCombinationsScrap(
  arr: number[],
  remSum: number,
  curr: number[],
  res: number[][],
  index: number
) {
  if (remSum === 0) {
    res.push([...curr]);
    return;
  }

  if (remSum < 0 || index >= arr.length) return;
  curr.push(arr[index]);
  findCombinationsScrap(arr, remSum - arr[index], curr, res, index);
  curr.pop();
  findCombinationsScrap(arr, remSum, curr, res, index + 1);
}

function combinationSumScrap(arr: number[], target: number) {
  arr.sort((a, b) => a - b);
  const combinations: number[] = [];
  const res: number[][] = [];
  findCombinationsScrap(arr, target, combinations, res, 0);
  return res;
}

// Driver Code
const arr = [2, 4, 6, 8];
const target = 8;
const res = combinationSumScrap(arr, target);
// console.log(combinationSumScrap([2, 3, 6, 7], 7));
// console.log(res);

// function findMatch(
//   mat: string[][],
//   word: string,
//   x: number,
//   y: number,
//   wIdx: number
// ): boolean {
//   const wordLength = word.length;
//   const n = mat.length;
//   const m = mat[0].length;

//   // Pattern matched
//   if (wIdx === wordLength) return true;

//   // Out of Boundary
//   if (x < 0 || y < 0 || x >= n || y >= m) return false;

//   // If grid matches with a letter while
//   // recursion
//   if (mat[x][y] === word[wIdx]) {
//     // Marking this cell as visited
//     const temp = mat[x][y];
//     mat[x][y] = "#";

//     // finding subpattern in 4 directions
//     const res =
//       findMatch(mat, word, x - 1, y, wIdx + 1) ||
//       findMatch(mat, word, x + 1, y, wIdx + 1) ||
//       findMatch(mat, word, x, y - 1, wIdx + 1) ||
//       findMatch(mat, word, x, y + 1, wIdx + 1);

//     // marking this cell as unvisited again
//     mat[x][y] = temp;
//     return res;
//   }

//   // Not matching then return false
//   return false;
// }

// // Function to check if the word exists in the matrix or not
// function isWordExist(mat: string[][], word: string) {
//   const wordLength = word.length;
//   const n = mat.length;
//   const m = mat[0].length;

//   // if total characters in matrix is
//   // less than word length
//   if (wordLength > n * m) return false;

//   // Traverse in the grid
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       // If first letter matches, then recur and check
//       if (mat[i][j] === word[0]) {
//         if (findMatch(mat, word, i, j, 0)) return true;
//       }
//     }
//   }
//   return false;
// }

// const mat = [
//   ["a", "x", "m", "y"],
//   ["b", "g", "d", "f"],
//   ["x", "e", "e", "t"],
//   ["r", "a", "k", "s"],
// ];
// const word = "geeks";
// console.log(isWordExist(mat, word));
// console.log(isWordExist([["A"]], "B"));

function findMatch(
  mat: string[][],
  word: string,
  x: number,
  y: number,
  wIdx: number
): boolean {
  const wordLength = word.length;
  const n = mat.length;
  const m = mat[0].length;

  if (wIdx === wordLength) return true;
  if (x < 0 || y < 0 || x >= n || y >= m) return false;

  if (mat[x][y] === word[wIdx]) {
    const temp = mat[x][y];
    mat[x][y] = "#";
    const res =
      findMatch(mat, word, x - 1, y, wIdx + 1) ||
      findMatch(mat, word, x + 1, y, wIdx + 1) ||
      findMatch(mat, word, x, y - 1, wIdx + 1) ||
      findMatch(mat, word, x, y + 1, wIdx + 1);

    mat[x][y] = temp;
    return res;
  }
  return false;
}

function isWordExist(mat: string[][], word: string) {
  const wordLength = word.length;
  const n = mat.length;
  const m = mat[0].length;
  if (wordLength > n * m) return false;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (mat[i][j] === word[0]) {
        if (findMatch(mat, word, i, j, 0)) return true;
      }
    }
  }
  return false;
}

const mat = [
  ["a", "x", "m", "y"],
  ["b", "g", "d", "f"],
  ["x", "e", "e", "t"],
  ["r", "a", "k", "s"],
];
const word = "geeks";
console.log(isWordExist(mat, word));
console.log(isWordExist([["A"]], "B"));
