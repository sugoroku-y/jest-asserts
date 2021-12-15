# jest-asserts

Assertion functions of jest for type guard in TypeScript.

TypeScriptの型ガードのための、JESTのアサーション関数群です。

`expect(o).toBe～(...)`を`assertToBe～(o, ...)`の型で呼ぶようにしただけですが、TypeScript3.7から導入された[Assertion Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)を利用して型ガードが利用できるようになっています。

今まで必要になったらその場その場で作っていたんですが、型に合わせて作り直すのが面倒になってきたのでGenericsで引数の型に合わせてうまくやってくれるようにしてみました。

```ts:src/jest-asserts.test.ts#1
    const o = ((): { a: 1 } | { b: 1 } => ({ a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    assertToHaveProperty(o, 'a');
    // ここではエラーにならない
    o.a;
```

あわせて`expect(o).not.toBe～(...)`を呼ぶだけの`assertNotToBe～(o, ...)`も用意しています。

```ts:src/jest-asserts.test.ts#2
    const o = ((): { t: 1; a: 1 } | { t: 2 } => ({ t: 1, a: 1 }))();
    // @ts-expect-error ここではエラー
    o.a;
    assertToHaveProperty(o, 't', 1 as const);
    // ここではエラーにならない
    o.a;
```

## Line up

- assertToHaveProperty
- assertNotToHaveProperty
- assertToBeInstanceOf
- assertNotToBeInstanceOf
- assertToBeUndefined
- assertNotToBeUndefined
- assertToBeDefined
- assertNotToBeDefined
- assertToBeNull
- assertNotToBeNull
- assertToBeFalsy
- assertNotToBeFalsy
- assertToBeTruthy
- assertNotToBeTruthy
- assertToBe
- assertNotToBe
