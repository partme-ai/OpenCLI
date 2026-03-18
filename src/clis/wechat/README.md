# WeChat (微信) Desktop Adapter

Control the **WeChat Desktop App** from the terminal via macOS AppleScript automation.

> **Note:** WeChat Mac is a native Cocoa app (not Electron), so this adapter uses AppleScript + clipboard instead of CDP. Requires macOS Accessibility permissions for your terminal app.

## Commands

| Command | Description |
|---------|-------------|
| `wechat status` | Check if WeChat is running |
| `wechat send "message"` | Send a message in the active conversation |
| `wechat new` | Start a new chat (Cmd+N) |
| `wechat search "query"` | Open search and type a query (Cmd+F) |
| `wechat read` | Copy recent messages from the active chat |

## Requirements

- macOS only (uses AppleScript)
- **Accessibility permissions** must be granted to your terminal app (System Settings → Privacy & Security → Accessibility)
- WeChat must be running with a conversation window open
