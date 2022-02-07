export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jestAsserts {
    export function assert(value: unknown, message?: string): asserts value;

    function assertToHaveProperty<NAME extends string>(
      actual: unknown,
      name: NAME,
    ): asserts actual is { [N in NAME]: unknown };
    function assertToHaveProperty<NAME extends string, VALUE>(
      actual: unknown,
      name: NAME,
      value: VALUE,
    ): asserts actual is { [N in NAME]: VALUE };
    export function assertToHaveProperty(
      actual: unknown,
      ...expected: [name: string, value?: unknown]
    ): void;

    export function assertNotToHaveProperty<ACTUAL, NAME extends string>(
      actual: ACTUAL,
      name: NAME,
    ): asserts actual is Exclude<ACTUAL, { [N in NAME]: unknown }>;
    export function assertNotToHaveProperty<ACTUAL, NAME extends string, VALUE>(
      actual: ACTUAL,
      name: NAME,
      value: VALUE,
    ): asserts actual is Exclude<ACTUAL, { [N in NAME]: VALUE }>;
    export function assertNotToHaveProperty(
      actual: unknown,
      ...expected: [name: string, value?: unknown]
    ): void;

    export function assertToBeInstanceOf<ARGS extends unknown[], T>(
      actual: unknown,
      expected: abstract new (...args: ARGS) => T,
    ): asserts actual is T;

    export function assertNotToBeInstanceOf<ACTUAL, ARGS extends unknown[], T>(
      actual: ACTUAL,
      expected: abstract new (...args: ARGS) => T,
    ): asserts actual is Exclude<ACTUAL, T>;

    export function assertToBeUndefined(
      actual: unknown,
    ): asserts actual is undefined;

    export function assertNotToBeUndefined<ACTUAL>(
      actual: ACTUAL,
    ): asserts actual is Exclude<ACTUAL, undefined>;

    export function assertToBeDefined<ACTUAL>(
      actual: ACTUAL,
    ): asserts actual is Exclude<ACTUAL, undefined>;

    export function assertNotToBeDefined(
      actual: unknown,
    ): asserts actual is undefined;

    export function assertToBeNull(actual: unknown): asserts actual is null;

    export function assertNotToBeNull<ACTUAL>(
      actual: ACTUAL,
    ): asserts actual is Exclude<ACTUAL, null>;

    type Falsy = undefined | null | false | 0 | -0 | '';

    export function assertToBeFalsy(actual: unknown): asserts actual is Falsy;

    export function assertNotToBeFalsy(actual: unknown): asserts actual;

    export function assertToBeTruthy(actual: unknown): asserts actual;

    export function assertNotToBeTruthy(
      actual: unknown,
    ): asserts actual is Falsy;

    export function assertToBe<EXPECTED>(
      actual: unknown,
      expected: EXPECTED,
    ): asserts actual is EXPECTED;

    export function assertNotToBe<ACTUAL, EXPECTED>(
      actual: ACTUAL,
      expected: EXPECTED,
    ): asserts actual is Exclude<ACTUAL, EXPECTED>;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
global.jestAsserts = new (class jestAsserts {})() as any;

class AssertionFailure extends Error {
  override name = 'AssertionFailure';
}

function rethrow(ex: unknown): never {
  if (ex instanceof Error) {
    ex.stack =
      ex.stack?.replace(
        /^(?:[ \t]*at .*\r?\n)*?[ \t]*at jestAsserts\.assert\w* \(.*?\)\r?\n/m,
        '',
      ) ?? '';
  }
  throw ex;
}

function wrap<ARGS extends unknown[]>(
  proc: (...args: ARGS) => void,
): (...args: ARGS) => void {
  return (...args: ARGS) => {
    try {
      proc(...args);
    } catch (ex: unknown) {
      rethrow(ex);
    }
  };
}

jestAsserts.assert = function assert(value: unknown, message?: string) {
  if (!value) {
    rethrow(new AssertionFailure(message));
  }
};

jestAsserts.assertToHaveProperty = wrap(
  (actual: unknown, ...expected: [name: string, value?: unknown]) => {
    expect(actual).toHaveProperty(...expected);
  },
);

jestAsserts.assertNotToHaveProperty = wrap(
  (actual: unknown, ...expected: [name: string, value?: unknown]) => {
    expect(actual).not.toHaveProperty(...expected);
  },
);

jestAsserts.assertToBeInstanceOf = wrap(
  (actual: unknown, expected: abstract new () => unknown) => {
    expect(actual).toBeInstanceOf(expected);
  },
);

jestAsserts.assertNotToBeInstanceOf = wrap(
  (actual: unknown, expected: abstract new () => unknown) => {
    expect(actual).not.toBeInstanceOf(expected);
  },
);

jestAsserts.assertToBeUndefined = wrap((actual: unknown) => {
  expect(actual).toBeUndefined();
});

jestAsserts.assertNotToBeUndefined = wrap((actual: unknown) => {
  expect(actual).not.toBeUndefined();
});

jestAsserts.assertToBeDefined = wrap((actual: unknown) => {
  expect(actual).toBeDefined();
});

jestAsserts.assertNotToBeDefined = wrap((actual: unknown) => {
  expect(actual).not.toBeDefined();
});

jestAsserts.assertToBeNull = wrap((actual: unknown) => {
  expect(actual).toBeNull();
});

jestAsserts.assertNotToBeNull = wrap((actual: unknown) => {
  expect(actual).not.toBeNull();
});

jestAsserts.assertToBeFalsy = wrap((actual: unknown) => {
  expect(actual).toBeFalsy();
});

jestAsserts.assertNotToBeFalsy = wrap((actual: unknown) => {
  expect(actual).not.toBeFalsy();
});

jestAsserts.assertToBeTruthy = wrap((actual: unknown) => {
  expect(actual).toBeTruthy();
});

jestAsserts.assertNotToBeTruthy = wrap((actual: unknown) => {
  expect(actual).not.toBeTruthy();
});

jestAsserts.assertToBe = wrap((actual: unknown, expected: unknown) => {
  expect(actual).toBe(expected);
});

jestAsserts.assertNotToBe = wrap((actual: unknown, expected: unknown) => {
  expect(actual).not.toBe(expected);
});
