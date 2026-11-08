# Contract — isbn-check-core

Pure ESM in `src/isbn.mjs`, zero runtime dependencies, Node >= 22.
Hyphens/spaces stripped; ISBN-10 trailing `X` accepted uppercase or lower.

| Export | Result |
| --- | --- |
| `validate13` / `validate10` | Normalized digits or throws (`BAD_SHAPE13`/`BAD_SHAPE10`/`BAD_CHECK`). |
| `validate(input)` | `{ kind, digits }` routed by shape. |
| `check(input)` | `{ ok:true, kind, digits }` or `{ ok:false, code }`. |
| `compute13(base12)` / `compute10(base9)` | The check digit (`X` possible for ISBN-10). |

Weights: ISBN-13 alternating 1/3 mod 10; ISBN-10 10..1 mod 11.
Errors: `NOT_STRING` · `EMPTY` · `BAD_CHARS` · `BAD_LENGTH` ·
`BAD_SHAPE13` · `BAD_SHAPE10` · `BAD_CHECK` · `BAD_BASE`.
