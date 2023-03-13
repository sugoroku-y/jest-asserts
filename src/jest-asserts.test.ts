import * as jestAsserts from '.';

describe('asserts', () => {
  test('assert', () => {
    expect(() => {
      const o = ((): { a: 1; b: 1 } | { b: 0 } => ({ a: 1, b: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assert(o.b);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });
  test('assertToHaveProperty without value', () => {
    expect(() => {
      // ```ts:#1
      const o = ((): { a: 1 } | { b: 1 } => ({ a: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertToHaveProperty(o, 'a');
      // ここではエラーにならない
      o.a;
      // ```
    }).not.toThrow();
  });

  test('assertToHaveProperty with value', () => {
    expect(() => {
      const o = ((): { t: 1; a: 1 } | { t: 2 } => ({ t: 1, a: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertToHaveProperty(o, 't', 1 as const);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertNotToHaveProperty without value', () => {
    expect(() => {
      // ```ts:#2
      const o = ((): { a: 1 } | { b: 1 } => ({ a: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertNotToHaveProperty(o, 'b');
      // ここではエラーにならない
      o.a;
      // ```
    }).not.toThrow();
  });

  test('assertNotToHaveProperty with value', () => {
    expect(() => {
      const o = ((): { t: 1; a: 1 } | { t: 2 } => ({ t: 1, a: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertNotToHaveProperty(o, 't', 2 as const);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertToBeInstanceOf', () => {
    expect(() => {
      const o = ((): Date | RegExp => /a/)();
      // @ts-expect-error ここではエラー
      o.lastIndex;
      jestAsserts.assertToBeInstanceOf(o, RegExp);
      // ここではエラーにならない
      o.lastIndex;
    }).not.toThrow();
  });

  test('assertNotToBeInstanceOf', () => {
    expect(() => {
      const o = ((): Date | RegExp => /a/)();
      // @ts-expect-error ここではエラー
      o.lastIndex;
      jestAsserts.assertNotToBeInstanceOf(o, Date);
      // ここではエラーにならない
      o.lastIndex;
    }).not.toThrow();
  });

  test('assertToBeUndefined', () => {
    expect(() => {
      const o = ((): { a: 1; b?: never } | { b: 1 } => ({ a: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertToBeUndefined(o.b);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertNotToBeUndefined', () => {
    expect(() => {
      const o = ((): { a: 1 } | undefined => ({ a: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertNotToBeUndefined(o);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertToBeDefined', () => {
    expect(() => {
      const o = ((): { a: 1 } | undefined => ({ a: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertToBeDefined(o);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertNotToBeDefined', () => {
    expect(() => {
      const o = ((): { a: 1; b?: never } | { b: 1 } => ({ a: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertNotToBeDefined(o.b);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertToBeNull', () => {
    expect(() => {
      const o = ((): { a: 1; b: null } | { b: 1 } => ({ a: 1, b: null }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertToBeNull(o.b);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertNotToBeNull', () => {
    expect(() => {
      const o = ((): { a: 1; b: 1 } | { b: null } => ({ a: 1, b: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertNotToBeNull(o.b);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertToBeFalsy', () => {
    expect(() => {
      const o = ((): { a: 1; b?: 0 } | { b: 1 } => ({ a: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertToBeFalsy(o.b);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertNotToBeFalsy', () => {
    expect(() => {
      const o = ((): { a: 1; b: 1 } | { b?: 0 } => ({ a: 1, b: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertNotToBeFalsy(o.b);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertToBeTruthy', () => {
    expect(() => {
      const o = ((): { a: 1; b: 1 } | { b: 0 } => ({ a: 1, b: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertToBeTruthy(o.b);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertNotToBeTruthy', () => {
    expect(() => {
      const o = ((): { a: 1; b?: 0 } | { b: 1 } => ({ a: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertNotToBeTruthy(o.b);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertToBe', () => {
    expect(() => {
      const o = ((): { a: 1; b: 1 } | { b: 2 } => ({ a: 1, b: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertToBe(o.b, 1 as const);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
  });

  test('assertNotToBe', () => {
    expect(() => {
      const o = ((): { a: 1; b?: 0 } | { b: 2 } => ({ a: 1 }))();
      // @ts-expect-error ここではエラー
      o.a;
      jestAsserts.assertNotToBe(o.b, 2 as const);
      // ここではエラーにならない
      o.a;
    }).not.toThrow();
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
