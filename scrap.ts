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

// const minWindowScrap = (s: string, t: string) => {
//   const tMap = new Map();
//   const sMap = new Map();
//   const count = t.length;
//   let left = 0;
//   let currCount = 0;
//   let result = "";

//   for (const c of t) {
//     tMap.set(c, (tMap.get(c) || 0) + 1);
//   }

//   for (let right = 0; right < s.length; right += 1) {
//     if (tMap.has(s[right])) {
//       sMap.set(s[right], (sMap.get(s[right]) || 0) + 1);
//       if (sMap.get(s[right]) <= tMap.get(s[right])) {
//         currCount++;
//       }
//     }

//     while (currCount === count) {
//       if (result === "" || right - left + 1 < result.length) {
//         result = s.slice(left, right + 1);
//       }
//       if (tMap.has(s[left])) {
//         if (sMap.get(s[left]) === tMap.get(s[left])) {
//           currCount--;
//         }
//         sMap.set(s[left], sMap.get(s[left])! - 1);
//       }
//       left++;
//     }
//   }
//   return result;
// };

const minWindowScrap = (s: string, t: string) => {
  const tMap = new Map();
  const sMap = new Map();
  const count = t.length;
  let result = "";
  let currCount = 0;
  let left = 0;

  for (let c of t) {
    tMap.set(c, (tMap.get(c) || 0) + 1);
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

console.log(minWindowScrap("ADOBECODEBANC", "ABC"));
console.log(minWindowScrap("a", "aa"));
