# jest-asserts

Assertion functions of jest for type guard in TypeScript.

TypeScript の型ガードのための、JEST のアサーション関数群です。

`expect(o).toBe～(...)`を`assertToBe～(o, ...)`の型で呼ぶようにしただけですが、TypeScript3.7 から導入された[Assertion Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)を利用して型ガードが利用できるようになっています。

今まで必要になったらその場その場で作っていたんですが、型に合わせて作り直すのが面倒になってきたので Generics で引数の型に合わせてうまくやってくれるようにしてみました。

```ts
import * as jestAsserts from 'jest-asserts';
```

`import`だけは前もってしておいてください。

```ts:./src/jest-asserts.test.ts#1
    const o = ((): { a: 1 } | { b: 1 } => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertToHaveProperty(o, 'a');
    // ここではエラーにならない
    o.a;
```

あわせて`expect(o).not.toBe～(...)`を呼ぶだけの`assertNotToBe～(o, ...)`も用意しています。

```ts:./src/jest-asserts.test.ts#2
    const o = ((): { a: 1 } | { b: 1 } => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    jestAsserts.assertNotToHaveProperty(o, 'b');
    // ここではエラーにならない
    o.a;
```

## Line up

- jestAsserts.assert
- jestAsserts.assertToHaveProperty
- jestAsserts.assertNotToHaveProperty
- jestAsserts.assertToBeInstanceOf
- jestAsserts.assertNotToBeInstanceOf
- jestAsserts.assertToBeUndefined
- jestAsserts.assertNotToBeUndefined
- jestAsserts.assertToBeDefined
- jestAsserts.assertNotToBeDefined
- jestAsserts.assertToBeNull
- jestAsserts.assertNotToBeNull
- jestAsserts.assertToBeFalsy
- jestAsserts.assertNotToBeFalsy
- jestAsserts.assertToBeTruthy
- jestAsserts.assertNotToBeTruthy
- jestAsserts.assertToBe
- jestAsserts.assertNotToBe
