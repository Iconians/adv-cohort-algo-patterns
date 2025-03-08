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

console.log(startStation([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));
console.log(startStation([2, 3, 4], [3, 4, 3]));
