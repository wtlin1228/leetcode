function sortVowels(s: string): string {
  // space: O(1)
  const vowelMap: Record<string, { count: number; firstSeenAt: number }> = {
    a: { count: 0, firstSeenAt: 0 },
    e: { count: 0, firstSeenAt: 0 },
    i: { count: 0, firstSeenAt: 0 },
    o: { count: 0, firstSeenAt: 0 },
    u: { count: 0, firstSeenAt: 0 },
  };

  // time: O(s.length)
  for (let i = 0; i < s.length; i++) {
    if (vowelMap[s[i]] !== undefined) {
      if (vowelMap[s[i]].count === 0) {
        vowelMap[s[i]].firstSeenAt = i;
      }
      vowelMap[s[i]].count += 1;
    }
  }

  // time: O(1)
  const vowelInOrder = ["a", "e", "i", "o", "u"];
  vowelInOrder.sort((a, b) => {
    if (vowelMap[b].count !== vowelMap[a].count) {
      return vowelMap[b].count - vowelMap[a].count;
    } else {
      return vowelMap[a].firstSeenAt - vowelMap[b].firstSeenAt;
    }
  });

  // time: O(s.length)
  // space: O(s.length)
  const res: string[] = [];
  let vowelIndex = 0;
  for (let i = 0; i < s.length; i++) {
    if (vowelMap[s[i]] !== undefined) {
      const vowel = vowelInOrder[vowelIndex];
      res.push(vowel);
      vowelMap[vowel].count -= 1;
      if (vowelMap[vowel].count === 0) {
        vowelIndex += 1;
      }
    } else {
      res.push(s[i]);
    }
  }

  // time: O(s.length)
  return res.join("");
}
