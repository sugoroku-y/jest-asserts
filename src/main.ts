import {parse, unnamed, helpString} from 'optionalist';
import {jest-asserts} from './jest-asserts';

const options = parse({
  help: {
    type: 'boolean',
    nature: 'alone',
    describ: 'ヘルプを表示します。',
  },
  [helpString]: {
    showUsageOnError: true,
  },
  // TODO: コマンドラインオプションをここに追加
});

if ('help' in options) {
  process.stderr.write(options[helpString]);
  process.exit(0);
}

(async () => {
  let exitCode = 0;
  for (const arg of options[unnamed]) {
    const result = jest-asserts(arg, options);
    if (result) {
      exitCode = result;
      break;
    }
  }
  process.exit(exitCode);
})();
