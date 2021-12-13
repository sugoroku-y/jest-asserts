export function assertToHaveProperty<NAME extends string>(
  actual: unknown,
  name: NAME,
): asserts actual is { [N in NAME]: unknown };
export function assertToHaveProperty<NAME extends string, VALUE>(
  actual: unknown,
  name: NAME,
  value: VALUE,
): asserts actual is { [N in NAME]: VALUE };
export function assertToHaveProperty(
  actual: unknown,
  ...expected: [name: string, value?: unknown]
): void {
  expect(actual).toHaveProperty(...expected);
}

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
): void {
  expect(actual).not.toHaveProperty(...expected);
}

export function assertToBeInstanceOf<ARGS extends unknown[], T>(
  actual: unknown,
  expected: abstract new (...args: ARGS) => T,
): asserts actual is T {
  expect(actual).toBeInstanceOf(expected);
}

export function assertNotToBeInstanceOf<ACTUAL, ARGS extends unknown[], T>(
  actual: ACTUAL,
  expected: abstract new (...args: ARGS) => T,
): asserts actual is Exclude<ACTUAL, T> {
  expect(actual).not.toBeInstanceOf(expected);
}

export function assertToBeUndefined(
  actual: unknown,
): asserts actual is undefined {
  expect(actual).toBeUndefined();
}

export function assertNotToBeUndefined<ACTUAL>(
  actual: ACTUAL,
): asserts actual is Exclude<ACTUAL, undefined> {
  expect(actual).not.toBeUndefined();
}

export function assertToBeDefined<ACTUAL>(
  actual: ACTUAL,
): asserts actual is Exclude<ACTUAL, undefined> {
  expect(actual).toBeDefined();
}

export function assertNotToBeDefined(
  actual: unknown,
): asserts actual is undefined {
  expect(actual).not.toBeDefined();
}

export function assertToBeNull(actual: unknown): asserts actual is null {
  expect(actual).toBeNull();
}

export function assertNotToBeNull<ACTUAL>(
  actual: ACTUAL,
): asserts actual is Exclude<ACTUAL, null> {
  expect(actual).not.toBeNull();
}

type Falsy = undefined | null | false | 0 | -0 | '';

export function assertToBeFalsy(actual: unknown): asserts actual is Falsy {
  expect(actual).toBeFalsy();
}

export function assertNotToBeFalsy(actual: unknown): asserts actual {
  expect(actual).not.toBeFalsy();
}

export function assertToBeTruthy(actual: unknown): asserts actual {
  expect(actual).toBeTruthy();
}

export function assertNotToBeTruthy(actual: unknown): asserts actual is Falsy {
  expect(actual).not.toBeTruthy();
}

export function assertToBe<EXPECTED>(
  actual: unknown,
  expected: EXPECTED,
): asserts actual is EXPECTED {
  expect(actual).toBe(expected);
}

export function assertNotToBe<ACTUAL, EXPECTED>(
  actual: ACTUAL,
  expected: EXPECTED,
): asserts actual is Exclude<ACTUAL, EXPECTED> {
  expect(actual).not.toBe(expected);
}
