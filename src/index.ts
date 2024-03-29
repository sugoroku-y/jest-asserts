declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R, T, _ = R & T> {
      toBeTruthyWithMessage(message?: string): void;
    }
  }
}

expect.extend({
  toBeTruthyWithMessage: function (
    this: jest.MatcherContext,
    received: unknown,
    message?: string,
  ): jest.CustomMatcherResult {
    return received
      ? {
          pass: true,
          message: () => '',
        }
      : {
          pass: false,
          message: () =>
            `AssertionFailure: ${this.utils.BOLD_WEIGHT(
              message,
            )}\n\nReceived: ${this.utils.RECEIVED_COLOR(
              this.utils.stringify(received),
            )}`,
        };
  },
});

/**
 * procで指定した処理を実行し、例外が投げられたらスタックトレースを再設定して投げ直す。
 *
 * @template ARGS
 * @template R
 * @param {() => void} proc 実行する処理
 * @param {(...args: ARGS) => R} base スタックトレースから除外する関数
 */
function wrap<ARGS extends unknown[], R>(
  proc: () => void,
  base: (...args: ARGS) => R,
): void {
  try {
    proc();
  } catch (ex) {
    // istanbul ignore next exがErrorでなかったり、Error.captureStackTraceがなかったりは多分しない
    if (ex instanceof Error && Error.captureStackTrace) {
      // baseの呼び出しまでのスタックトレースをex.stackに設定する
      Error.captureStackTrace(ex, base);
    }
    throw ex;
  }
}

/**
 * valueがfalsyだった場合に例外を投げる。
 *
 * この関数の呼び出し以降はvalueがfalsyでないことを前提にできる。
 *
 * @export
 * @param {unknown} value チェックする値。
 * @param {string} [message] 例外に指定するメッセージ。
 */
export function assert(value: unknown, message?: string): asserts value {
  wrap(() => {
    expect(value).toBeTruthyWithMessage(message);
  }, assert);
}

/** toHavePropertyでチェックしているプロパティを持つオブジェクト型 */
type NestedProperty<
  NAME extends string | readonly [string, ...string[]],
  VALUE = unknown,
> = NAME extends readonly [infer LEFT]
  ? LEFT extends string
    ? { [K in LEFT]: VALUE }
    : never
  : NAME extends readonly [infer LEFT, ...infer RIGHT]
  ? LEFT extends string
    ? RIGHT extends readonly [string, ...string[]]
      ? { [K in LEFT]: NestedProperty<RIGHT, VALUE> }
      : never
    : never
  : NAME extends `${infer LEFT}.${infer RIGHT}`
  ? { [K in LEFT]: NestedProperty<RIGHT, VALUE> }
  : NAME extends string
  ? { [K in NAME]: VALUE }
  : never;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R, T, _ = R & T> {
      // toHavePropertyのpropertyPathにreadonlyの配列を指定できるようにする
      toHaveProperty<E>(propertyPath: string | readonly string[], value?: E): R;
    }
  }
}

/**
 * actualがnameプロパティを持たない場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがnameプロパティを持つことを前提にできる。
 *
 * @export
 * @template NAME
 * @param {unknown} actual
 * @param {NAME} name
 */
export function assertToHaveProperty<
  NAME extends string | readonly [string, ...string[]],
>(actual: unknown, name: NAME): asserts actual is NestedProperty<NAME>;

/**
 * actualがnameプロパティにvalueという値を持たない場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがnameプロパティにvalueという値を持つことを前提にできる。
 *
 * @export
 * @template NAME
 * @template VALUE
 * @param {unknown} actual
 * @param {NAME} name
 * @param {VALUE} value
 */
export function assertToHaveProperty<
  NAME extends string | readonly [string, ...string[]],
  VALUE,
>(
  actual: unknown,
  name: NAME,
  value: VALUE,
): asserts actual is NestedProperty<NAME, VALUE>;

// assertToHavePropertyの実装
export function assertToHaveProperty(
  actual: unknown,
  ...expected: [name: string | readonly [string, ...string[]], value?: unknown]
) {
  wrap(() => {
    expect(actual).toHaveProperty(...expected);
  }, assertToHaveProperty);
}

/**
 * actualがnameプロパティを持つ場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがnameプロパティを持たないことを前提にできる。
 *
 * @export
 * @template ACTUAL
 * @template NAME
 * @param {ACTUAL} actual
 * @param {NAME} name
 */
export function assertNotToHaveProperty<
  ACTUAL,
  NAME extends string | readonly [string, ...string[]],
>(
  actual: ACTUAL,
  name: NAME,
): asserts actual is Exclude<ACTUAL, NestedProperty<NAME>>;
/**
 * actualがnameプロパティにvalueという値を持つ場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがnameプロパティにvalueという値を持たないことを前提にできる。
 *
 * @export
 * @template NAME
 * @template VALUE
 * @param {unknown} actual
 * @param {NAME} name
 * @param {VALUE} value
 */
export function assertNotToHaveProperty<
  ACTUAL,
  NAME extends string | readonly [string, ...string[]],
  VALUE,
>(
  actual: ACTUAL,
  name: NAME,
  value: VALUE,
): asserts actual is Exclude<ACTUAL, NestedProperty<NAME, VALUE>>;
// assertNotToHavePropertyの実装
export function assertNotToHaveProperty(
  actual: unknown,
  ...expected: [name: string | readonly [string, ...string[]], value?: unknown]
) {
  wrap(() => {
    expect(actual).not.toHaveProperty(...expected);
  }, assertNotToHaveProperty);
}

/**
 * actualがexpectedのインスタンスでない場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがexpectedのインスタンスであることを前提にできる。
 *
 * @export
 * @template ARGS
 * @template T
 * @param {unknown} actual
 * @param {abstract} expected
 */
export function assertToBeInstanceOf<ARGS extends unknown[], T>(
  actual: unknown,
  expected: abstract new (...args: ARGS) => T,
): asserts actual is T {
  wrap(() => {
    expect(actual).toBeInstanceOf(expected);
  }, assertToBeInstanceOf);
}

/**
 * actualがexpectedのインスタンスである場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがexpectedのインスタンスでないことを前提にできる。
 *
 * @export
 * @template ARGS
 * @template T
 * @param {unknown} actual
 * @param {abstract} expected
 */
export function assertNotToBeInstanceOf<ACTUAL, ARGS extends unknown[], T>(
  actual: ACTUAL,
  expected: abstract new (...args: ARGS) => T,
): asserts actual is Exclude<ACTUAL, T> {
  wrap(() => {
    expect(actual).not.toBeInstanceOf(expected);
  }, assertNotToBeInstanceOf);
}
/**
 * actualがundefinedでない場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがundefinedであることを前提にできる。
 *
 * @export
 * @param {unknown} actual
 * @returns {asserts}
 */
export function assertToBeUndefined(
  actual: unknown,
): asserts actual is undefined {
  wrap(() => {
    expect(actual).toBeUndefined();
  }, assertToBeUndefined);
}
/**
 * actualがundefinedである場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがundefinedでないことを前提にできる。
 *
 * @export
 * @param {unknown} actual
 * @returns {asserts}
 */
export function assertNotToBeUndefined<ACTUAL>(
  actual: ACTUAL,
): asserts actual is Exclude<ACTUAL, undefined> {
  wrap(() => {
    // eslint-disable-next-line jest/prefer-to-be
    expect(actual).not.toBeUndefined();
  }, assertNotToBeUndefined);
}
/**
 * actualがundefinedである場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがundefinedでないことを前提にできる。
 *
 * @export
 * @param {unknown} actual
 * @returns {asserts}
 */
export function assertToBeDefined<ACTUAL>(
  actual: ACTUAL,
): asserts actual is Exclude<ACTUAL, undefined> {
  wrap(() => {
    expect(actual).toBeDefined();
  }, assertToBeDefined);
}
/**
 * actualがundefinedでない場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがundefinedであることを前提にできる。
 *
 * @export
 * @param {unknown} actual
 * @returns {asserts}
 */
export function assertNotToBeDefined(
  actual: unknown,
): asserts actual is undefined {
  wrap(() => {
    // eslint-disable-next-line jest/prefer-to-be
    expect(actual).not.toBeDefined();
  }, assertNotToBeDefined);
}
/**
 * actualがnullでない場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがnullであることを前提にできる。
 *
 * @export
 * @param {unknown} actual
 * @returns {asserts}
 */
export function assertToBeNull(actual: unknown): asserts actual is null {
  wrap(() => {
    expect(actual).toBeNull();
  }, assertToBeNull);
}
/**
 * actualがnullである場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがnullでないあることを前提にできる。
 *
 * @export
 * @param {unknown} actual
 * @returns {asserts}
 */
export function assertNotToBeNull<ACTUAL>(
  actual: ACTUAL,
): asserts actual is Exclude<ACTUAL, null> {
  wrap(() => {
    expect(actual).not.toBeNull();
  }, assertNotToBeNull);
}
type Falsy = undefined | null | false | 0 | -0 | '';

/**
 * actualがfalsyでない場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがfalsyであることを前提にできる。
 *
 * TypeScriptで扱える型の限界によりfalsyな値の一つNaNを型として扱うことはできないので注意。
 *
 * @export
 * @param {unknown} actual
 * @returns {asserts}
 */
export function assertToBeFalsy(actual: unknown): asserts actual is Falsy {
  wrap(() => {
    expect(actual).toBeFalsy();
  }, assertToBeFalsy);
}

/**
 * actualがfalsyである場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがfalsyでないことを前提にできる。
 *
 * TypeScriptで扱える型の限界によりfalsyな値の一つNaNを型として扱うことはできないので注意。
 *
 * @export
 * @param {unknown} actual
 * @returns {asserts}
 */
export function assertNotToBeFalsy(actual: unknown): asserts actual {
  wrap(() => {
    expect(actual).not.toBeFalsy();
  }, assertNotToBeFalsy);
}
/**
 * actualがtruthyでない(falsyである)場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがtruthyである(falsyでない)ことを前提にできる。
 *
 * TypeScriptで扱える型の限界によりfalsyな値の一つNaNを型として扱うことはできないので注意。
 *
 * @export
 * @param {unknown} actual
 * @returns {asserts}
 */
export function assertToBeTruthy(actual: unknown): asserts actual {
  wrap(() => {
    expect(actual).toBeTruthy();
  }, assertToBeTruthy);
}
/**
 * actualがtruthyである(falsyでない)場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがtruthyでない(falsyである)ことを前提にできる。
 *
 * TypeScriptで扱える型の限界によりfalsyな値の一つNaNを型として扱うことはできないので注意。
 *
 * @export
 * @param {unknown} actual
 * @returns {asserts}
 */
export function assertNotToBeTruthy(actual: unknown): asserts actual is Falsy {
  wrap(() => {
    expect(actual).not.toBeTruthy();
  }, assertNotToBeTruthy);
}
/**
 * actualがexpectedと一致しない場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがexpectedと一致することを前提にできる。
 *
 * @export
 * @template EXPECTED
 * @param {unknown} actual
 * @param {EXPECTED} expected
 */
export function assertToBe<EXPECTED>(
  actual: unknown,
  expected: EXPECTED,
): asserts actual is EXPECTED {
  wrap(() => {
    expect(actual).toBe(expected);
  }, assertToBe);
}
/**
 * actualがexpectedと一致する場合にテストに失敗させる。
 *
 * この関数の呼び出し以降はactualがexpectedと一致しないことを前提にできる。
 *
 * @export
 * @template EXPECTED
 * @param {unknown} actual
 * @param {EXPECTED} expected
 */
export function assertNotToBe<ACTUAL, EXPECTED>(
  actual: ACTUAL,
  expected: EXPECTED,
): asserts actual is Exclude<ACTUAL, EXPECTED> {
  wrap(() => {
    expect(actual).not.toBe(expected);
  }, assertNotToBe);
}
