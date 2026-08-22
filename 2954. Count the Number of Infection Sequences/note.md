# Mod Arithmetic Survival Guide

## 1. You can `% M` after every `+` and `×`

    (a · b) % M == ((a % M) · (b % M)) % M

So `res = res * x % M` in a loop is always safe.

**But NEVER before `÷`** — mod breaks division.

## 2. Need to divide? Use Fermat instead

If `M` is prime (10⁹+7 is):

    1/a  ==  a^(M−2)  (mod M)

So: don't divide — multiply by `powmod(a, M-2)`.

## 3. BigInt speed = size of your numbers

- Keep numbers small (`% M` every step) → each op is fast ✓
- Let them grow (no reduction) → each op slows down → TLE ✗

## The one rule

**Reduce `% M` after every `×`. When you'd need `÷`, use Fermat (§2)
so you can keep reducing.**
