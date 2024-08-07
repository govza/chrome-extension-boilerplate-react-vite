describe('Webextension Content Runtime Script', () => {
  before(function () {
    if ((browser.capabilities as WebdriverIO.Capabilities).browserName === 'chrome') {
      // Chrome doesn't allow content scripts on the extension pages
      this.skip();
    }
  });

  it('should log "content script loaded" in console', async () => {
    // Open the popup
    const extensionPath = await browser.getExtensionPath();
    const popupUrl = `${extensionPath}/popup/index.html`;
    await browser.url(popupUrl);
    await browser.waitUntil(async () => (await browser.getTitle()) === 'Popup');

    // Trigger the content script on the popup
    const contentScriptButton = await $('//button[contains(text(), "Content Script")]');
    await contentScriptButton.click();

    // Check if  id chrome-extension-boilerplate-react-vite-runtime-content-view-root exists on page
    const runtimeElement = await $('#chrome-extension-boilerplate-react-vite-runtime-content-view-root');
    expect(await runtimeElement.waitForExist()).toBe(true);
  });
});
