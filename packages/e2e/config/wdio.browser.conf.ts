import { config as baseConfig } from './wdio.conf.ts';
import type { Options } from '@wdio/types';
import path from 'path';
import url from 'url';
import fs from 'fs/promises';
import { getChromeExtensionPath, getFirefoxExtensionPath } from '../utils/extension-path.ts';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const archiveName = process.env.__FIREFOX__ ? 'extension.xpi' : 'extension.zip';
const extPath = path.join(__dirname, `../../../dist-zip/${archiveName}`);
const bundledExtension = (await fs.readFile(extPath)).toString('base64');

const chromeCapabilities = {
  browserName: 'chrome',
  browserVersion: 'latest',
  webSocketUrl: true,
  acceptInsecureCerts: true,
  'goog:chromeOptions': {
    args: ['--disable-web-security', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
    prefs: { 'extensions.ui.developer_mode': true },
    extensions: [bundledExtension],
  },
};

const firefoxCapabilities = {
  browserName: 'firefox',
  browserVersion: 'latest',
  webSocketUrl: true,
  acceptInsecureCerts: true,
  'moz:debuggerAddress': true,
};

export const config: Options.Testrunner = {
  ...baseConfig,
  // @ts-expect-error types
  capabilities: process.env.__FIREFOX__ ? [firefoxCapabilities] : [chromeCapabilities],
  before: async (capabilities: WebdriverIO.Capabilities, _specs, browser: WebdriverIO.Browser) => {
    const browserName = capabilities.browserName;
    if (browserName === 'firefox') {
      await browser.installAddOn(bundledExtension, true);
      browser.addCommand('getExtensionPath', async () => {
        return await getFirefoxExtensionPath(browser);
      });
    } else if (browserName === 'chrome') {
      browser.addCommand('getExtensionPath', async () => {
        return await getChromeExtensionPath(browser);
      });
    }
  },
};
