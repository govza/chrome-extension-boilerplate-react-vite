/**
 * Returns the Chrome extension path.
 * @param browser
 * @returns path to the Chrome extension
 */
export const getChromeExtensionPath = async (browser: WebdriverIO.Browser) => {
  await browser.url('chrome://extensions/');
  const extensionItem = await $('>>>extensions-item');
  const extensionId = await extensionItem.getAttribute('id');

  return `chrome-extension://${extensionId}`;
};

/**
 * Returns the Firefox extension path.
 * @param browser
 * @returns path to the Firefox extension
 */
export const getFirefoxExtensionPath = async (browser: WebdriverIO.Browser) => {
  browser.url('about:debugging#/runtime/this-firefox');
  const internalUUID = await browser.$('//dt[contains(text(), "Internal UUID")]/following-sibling::dd').getText();

  return `moz-extension://${internalUUID}`;
};
