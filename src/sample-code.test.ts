import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';

function getLineNo(text: string, index: number | undefined): number | '???' {
  if (index === undefined) {
    return '???';
  }
  let lineno = 1;
  for (
    let lf = -1;
    (lf = text.indexOf('\n', lf + 1)) >= 0 && lf <= index;
    ++lineno
  );
  return lineno;
}

function toMatchSampleCode(
  this: jest.MatcherContext,
  received: string,
): jest.CustomMatcherResult {
  const messages: string[] = [];
  // 文書のパス(テストのソースからの相対パスを解消)
  const targetPath = resolve(dirname(this.testPath), received);
  // 文書の内容
  const target = readFileSync(targetPath, 'utf8');
  // ソースファイルのパスと内容のキャッシュ
  const cache: Partial<Record<string, string>> = {};
  // サンプルコードの場所を検索する正規表現(文書用)
  const mdr =
    /(?<=^|\r?\n)[ \t]*```ts:((.+?)(?:#.*\S)?)[ \t]*\r?\n([\s\S]*?\r?\n)[ \t]*```[ \t]*(?=$|\r?\n)/g;
  // サンプルコードの場所を検索する正規表現(ソースファイル用)
  const tsr =
    /(?<=^|\r?\n)[ \t]*\/\/[ \t]*```ts:(#.*\S)[ \t]*\r?\n([\s\S]*?\r?\n)[ \t]*\/\/[ \t]*```[ \t]*(?=$|\r?\n)/g;
  // 文書の中からサンプルコードを検索
  for (const { index, 1: key, 2: pathname, 3: actual } of target.matchAll(
    mdr,
  )) {
    // 行番号
    const lineno = getLineNo(target, index);
    try {
      const expect = ((key, pathname) => {
        if (key in cache) {
          return cache[key];
        }
        // ソースファイルは文書からの相対パス
        const source = readFileSync(
          resolve(dirname(targetPath), pathname),
          'utf8',
        );
        if (pathname === key) {
          // ハッシュの指定がなければソースファイル全体
          return (cache[key] = source);
        }
        // 指定があればハッシュが一致するものを検索
        for (const [, hash, code] of source.matchAll(tsr)) {
          cache[`${pathname}${hash}`] = code;
        }
        return cache[key];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      })(key!, pathname!);
      if (expect === undefined) {
        messages.push(`The sample code not found for ${key}
  at ${targetPath}:${lineno}`);
        continue;
      }
      // 一致していればこのサンプルコードはOK
      if (expect === actual) {
        continue;
      }
      // 一致していなければ差分を返す
      messages.push(`Difference: ${key}
  at ${targetPath}:${lineno}
${
  this.utils.diff(
    // 表示される行番号が文書上のものと合うように補正
    `${'\n'.repeat(+lineno)}${actual}`,
    `${'\n'.repeat(+lineno)}${expect}`,
    {
      expand: false,
      contextLines: 3,
    },
  ) ?? ''
}`);
      continue;
    } catch (ex: unknown) {
      messages.push(`${ex instanceof Error ? ex.message : String(ex)}
  at ${targetPath}:${lineno}`);
      continue;
    }
  }
  return {
    pass: messages.length === 0,
    message: () => messages.join('\n'),
  };
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      toMatchSampleCode(): R;
    }
  }
}

expect.extend({ toMatchSampleCode });

describe('sample code', () => {
  test('README.md', () => {
    expect('../README.md').toMatchSampleCode();
  });
});
