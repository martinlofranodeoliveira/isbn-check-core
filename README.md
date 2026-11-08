# isbn-check-core

ISBN-10/ISBN-13 validation and check-digit generation. Zero runtime
dependencies, Node >= 22.

Part of the LOFRANO TECNOLOGIA open-source lab. MIT.

```js
import { validate, compute10 } from './src/isbn.mjs';
validate('978-0-306-40615-7'); // { kind: 'ISBN-13', digits: '9780306406157' }
compute10('080442957');        // 'X'
```

```sh
npm test          # 8 tests, node:test, no dependencies
npm run demo
```

Identifier syntax only. MIT — see `LICENSE`. Full contract in
`docs/contract.md`. [Versão em português](README.pt-BR.md).
