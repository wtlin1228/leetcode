function shiftingLetters(s: string, shifts: number[]): string {
  const len = shifts.length;
  const res: string[] = new Array(len);

  let shift = 0;

  const a = "a".charCodeAt(0);
  for (let i = len - 1; i >= 0; i--) {
    shift += shifts[i];
    shift %= 26;
    res[i] = String.fromCharCode(((s.charCodeAt(i) - a + shift) % 26) + a);
  }

  return res.join("");
}
