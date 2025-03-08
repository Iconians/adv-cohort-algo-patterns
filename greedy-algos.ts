// 1. Assign Cookies (Easy)
// Problem Prompt:
// Given an array `g` representing the greed factor of each child and an array `s` representing the size of each cookie,
// return the maximum number of children who can be content.
// A child will be content if they receive a cookie with a size greater than or equal to their greed factor.
// You can assign at most one cookie per child using a greedy approach.

function findContentChildren(g: number[], s: number[]) {
  // Implement greedy logic
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let i = 0;
  let j = 0;
  let count = 0;

  while (i < g.length && j < s.length) {
    if (g[i] <= s[j]) {
      count++;
      i++;
      j++;
    } else j++;
  }
  return count;
}

// Test Cases
// console.log(findContentChildren([1, 2, 3], [1, 1])); // Normal Case
// console.log(findContentChildren([], [1, 2, 3])); // Edge Case: No children

// 2. Jump Game (Medium)
// Problem Prompt:
// You are given an array `nums` where each element represents the maximum jump length at that position.
// Determine if you can reach the last index starting from index 0.
// Use a greedy approach to maximize the reach.

function canJump(nums: number[]) {
  // Implement greedy logic
  const length = nums.length;
  if (length === 1) return 0;
  const jumps = new Array(length).fill(Infinity);
  jumps[0] = 0;

  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j <= i + nums[i] && j < length; j++) {
      jumps[j] = Math.min(jumps[j], jumps[i] + 1);
    }
  }
  return jumps[length - 1];
}

// Test Cases
// console.log(canJump([2, 3, 1, 1, 4])); // Normal Case: Can reach the last index
// console.log(canJump([3, 2, 1, 0, 4])); // Edge Case: Cannot reach last index

// 3. Task Scheduler (Medium)
// Problem Prompt:
// Given a list of tasks represented by characters and an integer `n` representing the cooling period,
// return the least number of units of time required to complete all tasks.
// The same task can only be scheduled again after `n` units of time.
// Use a greedy approach to minimize idle time.

function leastInterval(tasks: string[], n: number) {
  // Implement greedy logic
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

  const minSlotsRequired = (maxCount - 1) * (n + 1) + tasksMaxCount;

  return Math.max(tasks.length, minSlotsRequired);
}

// Test Cases
// console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2)); // Normal Case
// console.log(leastInterval(["A", "B", "C", "D"], 0)); // Edge Case: No cooldown period

// 4. Gas Station (Medium)
// Problem Prompt:
// Given two integer arrays `gas` and `cost`, where `gas[i]` is the gas available at station `i`
// and `cost[i]` is the cost to travel from station `i` to the next station,
// return the starting gas station index if you can travel around the circuit once.
// If it's not possible, return -1. Use a greedy approach to find the optimal starting station.

function canCompleteCircuit(gas: number[], cost: number[]) {
  // Implement greedy logic
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

// Test Cases
console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); // Normal Case: Possible circuit
console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3])); // Edge Case: No possible circuit
