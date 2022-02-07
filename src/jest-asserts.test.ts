import '.';

describe('asserts', () => {
  test('assert', () => {
    const o = ((): { a: 1; b: 1 } | { b: 0 } => ({ a: 1, b: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assert(o.b);
    // ここではエラーにならない
    o.a;
  });
  test('assertToHaveProperty without value', () => {
    // ```ts:#1
    const o = ((): { a: 1 } | { b: 1 } => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertToHaveProperty(o, 'a');
    // ここではエラーにならない
    o.a;
    // ```
  });

  test('assertToHaveProperty with value', () => {
    // ```ts:#2
    const o = ((): { t: 1; a: 1 } | { t: 2 } => ({ t: 1, a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertToHaveProperty(o, 't', 1 as const);
    // ここではエラーにならない
    o.a;
    // ```
  });

  test('assertNotToHaveProperty without value', () => {
    const o = ((): { a: 1 } | { b: 1 } => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertNotToHaveProperty(o, 'b');
    // ここではエラーにならない
    o.a;
  });

  test('assertNotToHaveProperty with value', () => {
    const o = ((): { t: 1; a: 1 } | { t: 2 } => ({ t: 1, a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertNotToHaveProperty(o, 't', 2 as const);
    // ここではエラーにならない
    o.a;
  });

  test('assertToBeInstanceOf', () => {
    const o = ((): Date | RegExp => /a/)();
    // @ts-expect-error ここではエラー
    o.lastIndex;
    jestAsserts.assertToBeInstanceOf(o, RegExp);
    // ここではエラーにならない
    o.lastIndex;
  });

  test('assertNotToBeInstanceOf', () => {
    const o = ((): Date | RegExp => /a/)();
    // @ts-expect-error ここではエラー
    o.lastIndex;
    jestAsserts.assertNotToBeInstanceOf(o, Date);
    // ここではエラーにならない
    o.lastIndex;
  });

  test('assertToBeUndefined', () => {
    const o = ((): { a: 1; b?: never } | { b: 1 } => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertToBeUndefined(o.b);
    // ここではエラーにならない
    o.a;
  });

  test('assertNotToBeUndefined', () => {
    const o = ((): { a: 1 } | undefined => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertNotToBeUndefined(o);
    // ここではエラーにならない
    o.a;
  });

  test('assertToBeDefined', () => {
    const o = ((): { a: 1 } | undefined => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertToBeDefined(o);
    // ここではエラーにならない
    o.a;
  });

  test('assertNotToBeDefined', () => {
    const o = ((): { a: 1; b?: never } | { b: 1 } => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertNotToBeDefined(o.b);
    // ここではエラーにならない
    o.a;
  });

  test('assertToBeNull', () => {
    const o = ((): { a: 1; b: null } | { b: 1 } => ({ a: 1, b: null }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertToBeNull(o.b);
    // ここではエラーにならない
    o.a;
  });

  test('assertNotToBeNull', () => {
    const o = ((): { a: 1; b: 1 } | { b: null } => ({ a: 1, b: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertNotToBeNull(o.b);
    // ここではエラーにならない
    o.a;
  });

  test('assertToBeFalsy', () => {
    const o = ((): { a: 1; b?: 0 } | { b: 1 } => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertToBeFalsy(o.b);
    // ここではエラーにならない
    o.a;
  });

  test('assertNotToBeFalsy', () => {
    const o = ((): { a: 1; b: 1 } | { b?: 0 } => ({ a: 1, b: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertNotToBeFalsy(o.b);
    // ここではエラーにならない
    o.a;
  });

  test('assertToBeTruthy', () => {
    const o = ((): { a: 1; b: 1 } | { b: 0 } => ({ a: 1, b: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertToBeTruthy(o.b);
    // ここではエラーにならない
    o.a;
  });

  test('assertNotToBeTruthy', () => {
    const o = ((): { a: 1; b?: 0 } | { b: 1 } => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertNotToBeTruthy(o.b);
    // ここではエラーにならない
    o.a;
  });

  test('assertToBe', () => {
    const o = ((): { a: 1; b: 1 } | { b: 2 } => ({ a: 1, b: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertToBe(o.b, 1 as const);
    // ここではエラーにならない
    o.a;
  });

  test('assertNotToBe', () => {
    const o = ((): { a: 1; b?: 0 } | { b: 2 } => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertNotToBe(o.b, 2 as const);
    // ここではエラーにならない
    o.a;
  });
});

function toThrowStartedStackTraceByHere(
  received: () => void,
): jest.CustomMatcherResult {
  try {
    received();
  } catch (ex: unknown) {
    if (!(ex instanceof Error)) {
      return {
        pass: false,
        message: () => `Thrown not error: ${ex}`,
      };
    }
    const { stack } = ex;
    if (!stack) {
      return {
        pass: false,
        message: () => `empty stack`,
      };
    }
    const match = stack.match(
      new RegExp(
        String.raw`^((?:\s*at .*\r?\n)*?)\s*at .*${module.filename.replace(
          /[.*+?^=!:${}()|[\]/\\]/g,
          '\\$&',
        )}`,
        'm',
      ),
    );
    if (!match) {
      return {
        pass: false,
        message: () => `not found ${module.filename} in stack trace: ${stack}`,
      };
    }
    if (match[1]) {
      return {
        pass: false,
        message: () =>
          `There is a stack trace before ${module.filename}: ${match[1]}`,
      };
    }
    return { pass: true, message: () => '' };
  }
  return {
    pass: false,
    message: () => `not thrown`,
  };
}
expect.extend({ toThrowStartedStackTraceByHere });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toThrowStartedStackTraceByHere(): R;
    }
  }
}

describe('assertion failure', () => {
  test('jestAsserts.assert', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(() => {
      jestAsserts.assert(((): boolean => false)(), 'message');
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertToHaveProperty', () => {
    expect(() => {
      jestAsserts.assertToHaveProperty({}, 'a');
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertNotToHaveProperty', () => {
    expect(() => {
      jestAsserts.assertNotToHaveProperty({ a: 1 }, 'a');
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertToBeInstanceOf', () => {
    expect(() => {
      jestAsserts.assertToBeInstanceOf({}, Date);
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertNotToBeInstanceOf', () => {
    expect(() => {
      jestAsserts.assertNotToBeInstanceOf(new Date(), Date);
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertToBeUndefined', () => {
    expect(() => {
      jestAsserts.assertToBeUndefined((() => 1)());
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertNotToBeUndefined', () => {
    expect(() => {
      jestAsserts.assertNotToBeUndefined((() => undefined)());
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertToBeDefined', () => {
    expect(() => {
      jestAsserts.assertToBeDefined((() => undefined)());
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertNotToBeDefined', () => {
    expect(() => {
      jestAsserts.assertNotToBeDefined((() => 1)());
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertToBeNull', () => {
    expect(() => {
      jestAsserts.assertToBeNull((() => 1)());
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertNotToBeNull', () => {
    expect(() => {
      jestAsserts.assertNotToBeNull((() => null)());
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertToBeFalsy', () => {
    expect(() => {
      jestAsserts.assertToBeFalsy((() => true)());
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertNotToBeFalsy', () => {
    expect(() => {
      jestAsserts.assertNotToBeFalsy((() => false)());
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertToBeTruthy', () => {
    expect(() => {
      jestAsserts.assertToBeTruthy((() => false)());
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.', () => {
    expect(() => {
      jestAsserts.assertNotToBeTruthy((() => true)());
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertToBe', () => {
    expect(() => {
      jestAsserts.assertToBe((() => 'test')(), 'test2');
    }).toThrowStartedStackTraceByHere();
  });
  test('jestAsserts.assertNotToBe', () => {
    expect(() => {
      jestAsserts.assertNotToBe((() => 'test')(), 'test');
    }).toThrowStartedStackTraceByHere();
  });
});
