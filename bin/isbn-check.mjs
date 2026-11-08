#!/usr/bin/env node
// Demo: fixed numbers, asserts expectations. --assert exits non-zero on mismatch.
import { check } from '../src/isbn.mjs';

const CASES = [
  ['9780306406157', true],
  ['978-0-306-40615-7', true],
  ['0306406152', true],
  ['0-8044-2957-X', true],
  ['9780306406158', false],
  ['0306406153', false],
];

let failed = 0;
for (const [input, expected] of CASES) {
  const r = check(input);
  const pass = r.ok === expected;
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${input} -> ${r.ok ? r.kind : r.code}`);
}
if (process.argv.includes('--assert') && failed > 0) process.exit(1);
if (failed > 0) process.exitCode = 1;
console.log(failed === 0 ? 'demo: all cases as expected' : `demo: ${failed} mismatch(es)`);
