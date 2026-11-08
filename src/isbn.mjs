// SPDX-License-Identifier: MIT
// ISBN-10/ISBN-13 validation and check-digit generation. Hyphens and
// spaces tolerated; trailing X accepted for ISBN-10. No network, no I/O.

export class IsbnError extends Error {
  constructor(code, detail = '') {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'IsbnError';
    this.code = code;
  }
}

function clean(input) {
  if (typeof input !== 'string') throw new IsbnError('NOT_STRING');
  const out = input.replace(/[\s-]+/g, '').toUpperCase();
  if (out.length === 0) throw new IsbnError('EMPTY');
  return out;
}

/** Validate ISBN-13 (13 digits, alternating weights 1/3). Returns digits. */
export function validate13(input) {
  const d = clean(input);
  if (!/^[0-9]{13}$/.test(d)) throw new IsbnError('BAD_SHAPE13');
  let sum = 0;
  for (let i = 0; i < 13; i++) sum += Number(d[i]) * (i % 2 === 0 ? 1 : 3);
  if (sum % 10 !== 0) throw new IsbnError('BAD_CHECK');
  return d;
}

/** Validate ISBN-10 (9 digits + digit/X, weights 10..1). Returns digits+X form. */
export function validate10(input) {
  const d = clean(input);
  if (!/^[0-9]{9}[0-9X]$/.test(d)) throw new IsbnError('BAD_SHAPE10');
  let sum = 0;
  for (let i = 0; i < 10; i++) sum += (d[i] === 'X' ? 10 : Number(d[i])) * (10 - i);
  if (sum % 11 !== 0) throw new IsbnError('BAD_CHECK');
  return d;
}

/** Validate either; returns { kind: 'ISBN-13'|'ISBN-10', digits }. */
export function validate(input) {
  const d = clean(input);
  if (/^[0-9]{13}$/.test(d)) return { kind: 'ISBN-13', digits: validate13(d) };
  if (/^[0-9]{9}[0-9X]$/.test(d)) return { kind: 'ISBN-10', digits: validate10(d) };
  if (/^[0-9X]+$/.test(d)) throw new IsbnError('BAD_LENGTH');
  throw new IsbnError('BAD_CHARS');
}

/** Non-throwing: { ok, kind?, digits? } or { ok:false, code }. */
export function check(input) {
  try {
    return { ok: true, ...validate(input) };
  } catch (err) {
    if (err instanceof IsbnError) return { ok: false, code: err.code };
    throw err;
  }
}

/** Check digit for first 12 digits of an ISBN-13. */
export function compute13(base12) {
  if (!/^[0-9]{12}$/.test(base12)) throw new IsbnError('BAD_BASE');
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(base12[i]) * (i % 2 === 0 ? 1 : 3);
  return String((10 - (sum % 10)) % 10);
}

/** Check digit ('0'-'9' or 'X') for first 9 digits of an ISBN-10. */
export function compute10(base9) {
  if (!/^[0-9]{9}$/.test(base9)) throw new IsbnError('BAD_BASE');
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(base9[i]) * (10 - i);
  const r = (11 - (sum % 11)) % 11;
  return r === 10 ? 'X' : String(r);
}
