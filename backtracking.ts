// 1. Generate Parentheses (Medium)
// Given an integer n, generate all combinations of well-formed parentheses with n pairs.
function genParenthesis(
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
    genParenthesis(num, open + 1, close, str + "(", answer);
  }

  if (close < open) {
    genParenthesis(num, open, close + 1, str + ")", answer);
  }
}

function generateParenthesis(num: number) {
  // Implement backtracking logic
  let answer: string[] = [];
  if (num > 0) {
    genParenthesis(num, 0, 0, "", answer);
  }
  return answer;
}
// Test Cases
// console.log(generateParenthesis(3)); // Normal Case
// console.log(generateParenthesis(0)); // Edge Case: No parentheses needed

// 2. Permutations (Medium)
// Given an array of distinct integers, return all possible permutations.
function recurPermutations(
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
    recurPermutations(index + 1, numArr, answer);
    [numArr[index], numArr[i]] = [numArr[i], numArr[index]];
  }
}

function permute(nums: number[]) {
  // Implement backtracking logic
  if (!nums.length) return [];
  const sortNum = nums.sort();
  let res = new Set();
  recurPermutations(0, sortNum, res);
  return Array.from(res).map(Number).sort();
}
// Test Cases
// console.log(permute([1, 2, 3])); // Normal Case
// console.log(permute([])); // Edge Case: Empty array

// 3. Combination Sum (Medium)
// Given an array of integers and a target, return all unique combinations where numbers sum to target.
function findCombinations(
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
  findCombinations(arr, remSum - arr[index], curr, res, index);
  curr.pop();
  findCombinations(arr, remSum, curr, res, index + 1);
}

function combinationSum(candidates: number[], target: number) {
  // Implement backtracking logic
  candidates.sort((a, b) => a - b);
  const combinations: number[] = [];
  const res: number[][] = [];
  findCombinations(candidates, target, combinations, res, 0);
  // console.log(res);
  return res;
}
// Test Cases
// console.log(combinationSum([2, 3, 6, 7], 7)); // Normal Case
// console.log(combinationSum([2, 4], 7)); // Edge Case: No valid combinations

// 4. Word Search (Medium)
// Given an m x n grid of letters and a word, check if the word exists in the grid using adjacent letters.
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

function exist(board: string[][], word: string) {
  // Implement backtracking logic
  const wordLength = word.length;
  const n = board.length;
  const m = board[0].length;
  if (wordLength > n * m) return false;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === word[0]) {
        if (findMatch(board, word, i, j, 0)) return true;
      }
    }
  }
  return false;
}
// Test Cases
console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
); // Normal Case
console.log(exist([["A"]], "B")); // Edge Case: Single letter grid with a different word
