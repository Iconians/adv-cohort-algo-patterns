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
}
// Test Cases
// console.log(characterReplacement("AABABBA", 1)); // Normal Case
// console.log(characterReplacement("A", 2)); // Edge Case: Single character string

// 4. Minimum Window Substring (Hard)
// Given a string S and a string T, find the minimum window in S which contains all characters of T.
function minWindow(s: string, t: string) {
  // Implement sliding window logic
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
  return result.length ? result : "No valid substring";
}
// Test Cases
console.log(minWindow("ADOBECODEBANC", "ABC")); // Normal Case
console.log(minWindow("a", "aa")); // Edge Case: No valid substring
