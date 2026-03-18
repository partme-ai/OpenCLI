import { execSync } from 'node:child_process';
import { cli, Strategy } from '../../registry.js';
import type { IPage } from '../../types.js';

export const searchCommand = cli({
  site: 'wechat',
  name: 'search',
  description: 'Open WeChat search and type a query (Cmd+F)',
  domain: 'localhost',
  strategy: Strategy.PUBLIC,
  browser: false,
  args: [{ name: 'query', required: true, positional: true, help: 'Search query (contact name, group, or message)' }],
  columns: ['Status'],
  func: async (page: IPage | null, kwargs: any) => {
    const query = kwargs.query as string;
    try {
      execSync("osascript -e 'tell application \"WeChat\" to activate'");
      execSync("osascript -e 'delay 0.3'");

      // Cmd+F opens search in WeChat Mac
      execSync("osascript -e 'tell application \"System Events\" to keystroke \"f\" using command down'");
      execSync("osascript -e 'delay 0.5'");

      // Type the search query
      const escaped = query.replace(/'/g, "'\\''");
      execSync(`osascript -e 'tell application "System Events" to keystroke "${escaped}"'`);

      return [{ Status: `Searched for: ${query}` }];
    } catch (err: any) {
      return [{ Status: 'Error: ' + err.message }];
    }
  },
});
