# 微信桌面端适配器

通过 macOS AppleScript 在终端中控制 **微信桌面应用**。

> **注意：** 微信 Mac 版是原生 Cocoa 应用（非 Electron），因此使用 AppleScript + 剪贴板方式，而非 CDP。需要为终端开启 macOS 辅助功能权限。

## 命令

| 命令 | 说明 |
|------|------|
| `wechat status` | 检查微信是否在运行 |
| `wechat send "消息"` | 在当前对话窗口发送消息 |
| `wechat new` | 开始新对话（Cmd+N） |
| `wechat search "关键词"` | 打开搜索并输入（Cmd+F） |
| `wechat read` | 复制当前对话的聊天记录 |

## 前置条件

- 仅 macOS（使用 AppleScript）
- 需要为终端应用开启**辅助功能权限**（系统设置 → 隐私与安全 → 辅助功能）
- 微信必须打开且有对话窗口
