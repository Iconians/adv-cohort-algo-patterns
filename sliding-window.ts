// 1. Maximum Sum Subarray of Size K (Easy)
// Given an array of integers and an integer K, find the maximum sum of any contiguous subarray of size K.
function maxSumSubarray(arr: number[], k: number) {
  // Implement sliding window logic
  if (k > arr.length || k <= 0) return 0;
  let max = 0;
  let windowSum = 0;
  let left = 0;

  for (let right = 0; right < arr.length; right++) {
    windowSum += arr[right];
    if (right >= k - 1) {
      max = Math.max(max, windowSum);
      windowSum -= arr[left];
      left++;
    }
  }
  return max;
}

// Test Cases
// console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // Normal Case
// console.log(maxSumSubarray([1, 2], 3)); // Edge Case: k is greater than array length

// 2. Longest Substring Without Repeating Characters (Medium)
// Given a string, find the length of the longest substring without repeating characters.
function lengthOfLongestSubstring(s: string) {
  // Implement sliding window logic
  let set = new Set();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}
// Test Cases
// console.log(lengthOfLongestSubstring("abcabcbb")); // Normal Case
// console.log(lengthOfLongestSubstring("")); // Edge Case: Empty string

// 3. Longest Repeating Character Replacement (Medium)
// Given a string and an integer K, find the longest substring that can be obtained by replacing at most K characters.
function characterReplacement(s: string, k: number) {
  // Implement sliding window logic
}
// Test Cases
console.log(characterReplacement("AABABBA", 1)); // Normal Case
console.log(characterReplacement("A", 2)); // Edge Case: Single character string

// 4. Minimum Window Substring (Hard)
// Given a string S and a string T, find the minimum window in S which contains all characters of T.
function minWindow(s: string, t: string) {
  // Implement sliding window logic
}
// Test Cases
// console.log(minWindow("ADOBECODEBANC", "ABC")); // Normal Case
// console.log(minWindow("a", "aa")); // Edge Case: No valid substring
