import { execSync, spawnSync } from 'node:child_process';
import { cli, Strategy } from '../../registry.js';
import type { IPage } from '../../types.js';

export const sendCommand = cli({
  site: 'wechat',
  name: 'send',
  description: 'Send a message in the active WeChat conversation window',
  domain: 'localhost',
  strategy: Strategy.PUBLIC,
  browser: false,
  args: [{ name: 'text', required: true, positional: true, help: 'Message to send' }],
  columns: ['Status'],
  func: async (page: IPage | null, kwargs: any) => {
    const text = kwargs.text as string;
    try {
      // Backup clipboard
      let clipBackup = '';
      try { clipBackup = execSync('pbpaste', { encoding: 'utf-8' }); } catch {}

      // Copy text to clipboard
      spawnSync('pbcopy', { input: text });

      // Activate WeChat and paste + send
      execSync("osascript -e 'tell application \"WeChat\" to activate'");
      execSync("osascript -e 'delay 0.5'");

      const cmd = "osascript " +
                  "-e 'tell application \"System Events\"' " +
                  "-e 'keystroke \"v\" using command down' " +
                  "-e 'delay 0.2' " +
                  "-e 'keystroke return' " +
                  "-e 'end tell'";
      execSync(cmd);

      // Restore clipboard
      if (clipBackup) spawnSync('pbcopy', { input: clipBackup });

      return [{ Status: 'Success' }];
    } catch (err: any) {
      return [{ Status: 'Error: ' + err.message }];
    }
  },
});
