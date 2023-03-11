class AssertionFailure extends Error {
  override name = 'AssertionFailure';
}

/**
 * exで指定した例外にbaseに指定した関数の呼び出しを含まないスタックトレースを設定して投げ直す。
 *
 * @template {unknown[]} ARGS
 * @template R
 * @param {unknown} ex スタックトレースを設定する例外を指定する。
 * @param {(...args: ARGS) => R} base スタックトレースから除外する関数を指定する。
 * @returns {never} スタックトレースを設定した例外を投げるので、この関数から返ってくることはない
 */
function rethrow<ARGS extends unknown[], R>(
  ex: unknown,
  base: (...args: ARGS) => R,
): never {
  // istanbul ignore next exがErrorでなかったり、Error.captureStackTraceがなかったりは多分しない
  if (ex instanceof Error && Error.captureStackTrace) {
    // baseの呼び出しまでのスタックトレースをex.stackに設定する
    Error.captureStackTrace(ex, base);
  }
  throw ex;
}

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
  } catch (ex: unknown) {
    rethrow(ex, base);
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
  if (!value) {
    rethrow(new AssertionFailure(message), assert);
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
export function assertToHaveProperty<NAME extends string>(
  actual: unknown,
  name: NAME,
): asserts actual is { [N in NAME]: unknown };

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
export function assertToHaveProperty<NAME extends string, VALUE>(
  actual: unknown,
  name: NAME,
  value: VALUE,
): asserts actual is { [N in NAME]: VALUE };

// assertToHavePropertyの実装
export function assertToHaveProperty(
  actual: unknown,
  ...expected: [name: string, value?: unknown]
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
export function assertNotToHaveProperty<ACTUAL, NAME extends string>(
  actual: ACTUAL,
  name: NAME,
): asserts actual is Exclude<ACTUAL, { [N in NAME]: unknown }>;
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
export function assertNotToHaveProperty<ACTUAL, NAME extends string, VALUE>(
  actual: ACTUAL,
  name: NAME,
  value: VALUE,
): asserts actual is Exclude<ACTUAL, { [N in NAME]: VALUE }>;
// assertNotToHavePropertyの実装
export function assertNotToHaveProperty(
  actual: unknown,
  ...expected: [name: string, value?: unknown]
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
