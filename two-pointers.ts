// 1. Remove Duplicates from Sorted Array (Easy)
// Given a sorted array, remove the duplicates in-place such that each element appears only once.
// Return the new length of the array.
function removeDuplicates(nums: number[]) {
  // Implement the logic using two pointers
  if (!nums.length) return [];
  let left = 0;
  let right = nums.length - 1;
  const set = new Set();

  while (left < right) {
    if (set.has(nums[left])) {
      left++;
    }
    if (set.has(right)) {
      right--;
    }
    set.add(nums[left]);
    set.add(nums[right]);
  }
  return [...set].sort();
}
// Test Cases
// console.log(removeDuplicates([1, 1, 2, 3, 3, 4])); // Normal Case: [1, 2, 3, 4]
// console.log(removeDuplicates([])); // Edge Case: Empty array

// 2. Two Sum II - Input Array is Sorted (Easy)
// Given a sorted array and a target number, return indices of the two numbers that add up to target.
function twoSumSorted(nums: number[], target: number) {
  // Implement two pointers logic
  let left = 0;
  let right = nums.length - 1;
  const arr = [];

  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum === target) {
      return [left, right];
    }
    if (sum > target) {
      right--;
    }
    if (sum < target) {
      left++;
    }
  }
  return "No valid pairs";
}
// Test Cases
// console.log(twoSumSorted([2, 7, 11, 15], 9)); // Normal Case: [0, 1]
// console.log(twoSumSorted([1, 2, 3, 4], 10)); // Edge Case: No valid pairs

// 3. Container With Most Water (Medium)
// Given an array representing heights of vertical lines, find two lines that together with the x-axis form a container that holds the most water.
function maxArea(height: number[]) {
  // Use two pointers to maximize the area
  let left = 0;
  let right = height.length - 1;
  let result = 0;

  while (left < right) {
    let water = Math.min(height[left], height[right]) * (right - left);
    result = Math.max(result, water);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return result;
}

// Test Cases
// console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // Normal Case
// console.log(maxArea([1, 1])); // Edge Case: Minimal height difference

// 4. Three Sum (Medium)
// Given an integer array, return all unique triplets that sum up to zero.
// if (i > 0 && nums[i] === nums[i - 1]) continue;
function threeSum(nums: number[]) {
  // Use two pointers inside a loop to find unique triplets
  nums.sort((a, b) => a - b);
  let triplet = [];

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      let sum = nums[left] + nums[right] + nums[i];
      if (sum === 0) {
        triplet.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return triplet;
}
// Test Cases
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // Normal Case
console.log(threeSum([0, 0, 0, 0])); // Edge Case: All elements are the same
