import { execSync } from 'node:child_process';
import { cli, Strategy } from '../../registry.js';
import type { IPage } from '../../types.js';

export const newCommand = cli({
  site: 'wechat',
  name: 'new',
  description: 'Start a new chat in WeChat (Cmd+N)',
  domain: 'localhost',
  strategy: Strategy.PUBLIC,
  browser: false,
  args: [],
  columns: ['Status'],
  func: async (page: IPage | null) => {
    try {
      execSync("osascript -e 'tell application \"WeChat\" to activate'");
      execSync("osascript -e 'delay 0.3'");
      execSync("osascript -e 'tell application \"System Events\" to keystroke \"n\" using command down'");
      return [{ Status: 'Success' }];
    } catch (err: any) {
      return [{ Status: 'Error: ' + err.message }];
    }
  },
});
