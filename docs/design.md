# Design — isbn-check-core

Two independent checksums sharing a normalize-then-verify shape.
Generation and validation share the weight loops, so round-trips are
structural. Textbook numbers pin both paths, including the `X` case.

Oracle: 9780306406157, 0306406152, 080442957X plus generated round-trips.
No publisher/registration semantics: identifier syntax only.
