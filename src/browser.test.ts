import { describe, expect, it } from 'vitest';
import { formatBrowserConnectError, getTokenFingerprint } from './browser.js';

describe('getTokenFingerprint', () => {
  it('returns null for empty token', () => {
    expect(getTokenFingerprint(undefined)).toBeNull();
  });

  it('returns stable short fingerprint for token', () => {
    expect(getTokenFingerprint('abc123')).toBe('6ca13d52');
  });
});

describe('formatBrowserConnectError', () => {
  it('explains missing extension token clearly', () => {
    const err = formatBrowserConnectError({
      kind: 'missing-token',
      mode: 'extension',
      timeout: 30,
      hasExtensionToken: false,
    });

    expect(err.message).toContain('PLAYWRIGHT_MCP_EXTENSION_TOKEN is not set');
    expect(err.message).toContain('manual approval dialog');
  });

  it('mentions token mismatch as likely cause for extension timeout', () => {
    const err = formatBrowserConnectError({
      kind: 'extension-timeout',
      mode: 'extension',
      timeout: 30,
      hasExtensionToken: true,
      tokenFingerprint: 'deadbeef',
    });

    expect(err.message).toContain('does not match the token currently shown by the browser extension');
    expect(err.message).toContain('deadbeef');
  });

  it('keeps CDP timeout guidance separate', () => {
    const err = formatBrowserConnectError({
      kind: 'cdp-timeout',
      mode: 'cdp',
      timeout: 30,
      hasExtensionToken: false,
    });

    expect(err.message).toContain('via CDP');
    expect(err.message).toContain('chrome://inspect#remote-debugging');
  });
});
