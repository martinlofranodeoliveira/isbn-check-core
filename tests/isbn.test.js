import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validate, validate13, validate10, check, compute13, compute10, IsbnError } from '../src/isbn.mjs';

describe('ISBN-13', () => {
  it('accepts textbook examples', () => {
    assert.equal(validate13('9780306406157'), '9780306406157');
    assert.equal(validate13('978-0-306-40615-7'), '9780306406157');
    assert.equal(validate('9781861972712').kind, 'ISBN-13');
  });
  it('rejects bad check and shape', () => {
    assert.equal(check('9780306406158').code, 'BAD_CHECK');
    assert.equal(check('978030640615').code, 'BAD_LENGTH');
  });
  it('generates the check digit', () => {
    assert.equal(compute13('978030640615'), '7');
  });
});

describe('ISBN-10', () => {
  it('accepts digits and X', () => {
    assert.equal(validate10('0306406152'), '0306406152');
    assert.equal(validate('0-8044-2957-X').digits, '080442957X');
  });
  it('rejects bad check and shape', () => {
    assert.equal(check('0306406153').code, 'BAD_CHECK');
    assert.equal(check('030640615').code, 'BAD_LENGTH');
  });
  it('generates digits including X', () => {
    assert.equal(compute10('030640615'), '2');
    assert.equal(compute10('080442957'), 'X');
  });
});

describe('dispatch', () => {
  it('routes by shape, rejects garbage', () => {
    assert.equal(validate('9780306406157').kind, 'ISBN-13');
    assert.equal(validate('0306406152').kind, 'ISBN-10');
    assert.throws(() => validate(42), (e) => e.code === 'NOT_STRING');
    assert.throws(() => validate('ABC'), (e) => e.code === 'BAD_CHARS');
    assert.ok(new IsbnError('X') instanceof Error);
  });
  it('round-trips generated numbers', () => {
    assert.equal(validate13('978316148410' + compute13('978316148410')), '978316148410' + compute13('978316148410'));
    assert.equal(validate10('020161622' + compute10('020161622')), '020161622' + compute10('020161622'));
  });
});
