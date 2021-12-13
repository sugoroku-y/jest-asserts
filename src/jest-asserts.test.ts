import {
  assertToHaveProperty,
  assertNotToHaveProperty,
  assertToBeInstanceOf,
  assertNotToBeInstanceOf,
  assertToBeUndefined,
  assertNotToBeUndefined,
  assertToBeDefined,
  assertNotToBeDefined,
  assertToBeNull,
  assertNotToBeNull,
  assertToBeFalsy,
  assertNotToBeFalsy,
  assertToBeTruthy,
  assertNotToBeTruthy,
  assertToBe,
  assertNotToBe,
} from '.';

test('assertToHaveProperty', () => {
  const o = ((): { a: 1 } | { b: 1 } => ({ a: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertToHaveProperty(o, 'a');
  // ここではエラーにならない
  o.a;
});

test('assertToHaveProperty', () => {
  const o = ((): { t: 1; a: 1 } | { t: 2 } => ({ t: 1, a: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertToHaveProperty(o, 't', 1 as const);
  // ここではエラーにならない
  o.a;
});

test('assertNotToHaveProperty', () => {
  const o = ((): { a: 1 } | { b: 1 } => ({ a: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertNotToHaveProperty(o, 'b');
  // ここではエラーにならない
  o.a;
});

test('assertNotToHaveProperty', () => {
  const o = ((): { t: 1; a: 1 } | { t: 2 } => ({ t: 1, a: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertNotToHaveProperty(o, 't', 2 as const);
  // ここではエラーにならない
  o.a;
});

test('assertToBeInstanceOf', () => {
  const o = ((): Date | RegExp => /a/)();
  // @ts-expect-error ここではエラー
  o.lastIndex;
  assertToBeInstanceOf(o, RegExp);
  // ここではエラーにならない
  o.lastIndex;
});

test('assertNotToBeInstanceOf', () => {
  const o = ((): Date | RegExp => /a/)();
  // @ts-expect-error ここではエラー
  o.lastIndex;
  assertNotToBeInstanceOf(o, Date);
  // ここではエラーにならない
  o.lastIndex;
});

test('assertToBeUndefined', () => {
  const o = ((): { a: 1; b?: never } | { b: 1 } => ({ a: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertToBeUndefined(o.b);
  // ここではエラーにならない
  o.a;
});

test('assertNotToBeUndefined', () => {
  const o = ((): { a: 1 } | undefined => ({ a: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertNotToBeUndefined(o);
  // ここではエラーにならない
  o.a;
});

test('assertToBeDefined', () => {
  const o = ((): { a: 1 } | undefined => ({ a: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertToBeDefined(o);
  // ここではエラーにならない
  o.a;
});

test('assertNotToBeDefined', () => {
  const o = ((): { a: 1; b?: never } | { b: 1 } => ({ a: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertNotToBeDefined(o.b);
  // ここではエラーにならない
  o.a;
});

test('assertToBeNull', () => {
  const o = ((): { a: 1; b: null } | { b: 1 } => ({ a: 1, b: null }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertToBeNull(o.b);
  // ここではエラーにならない
  o.a;
});

test('assertNotToBeNull', () => {
  const o = ((): { a: 1; b: 1 } | { b: null } => ({ a: 1, b: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertNotToBeNull(o.b);
  // ここではエラーにならない
  o.a;
});

test('assertToBeFalsy', () => {
  const o = ((): { a: 1; b?: 0 } | { b: 1 } => ({ a: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertToBeFalsy(o.b);
  // ここではエラーにならない
  o.a;
});

test('assertNotToBeFalsy', () => {
  const o = ((): { a: 1; b: 1 } | { b?: 0 } => ({ a: 1, b: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertNotToBeFalsy(o.b);
  // ここではエラーにならない
  o.a;
});

test('assertToBeTruthy', () => {
  const o = ((): { a: 1; b: 1 } | { b: 0 } => ({ a: 1, b: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertToBeTruthy(o.b);
  // ここではエラーにならない
  o.a;
});

test('assertNotToBeTruthy', () => {
  const o = ((): { a: 1; b?: 0 } | { b: 1 } => ({ a: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertNotToBeTruthy(o.b);
  // ここではエラーにならない
  o.a;
});

test('assertToBe', () => {
  const o = ((): { a: 1; b: 1 } | { b: 2 } => ({ a: 1, b: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertToBe(o.b, 1 as const);
  // ここではエラーにならない
  o.a;
});

test('assertNotToBe', () => {
  const o = ((): { a: 1; b?: 0 } | { b: 2 } => ({ a: 1 }))();
  // @ts-expect-error ここではエラー
  o.a;
  assertNotToBe(o.b, 2 as const);
  // ここではエラーにならない
  o.a;
});
