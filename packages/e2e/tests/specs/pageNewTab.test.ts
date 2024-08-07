describe('Webextension New Tab', () => {
  it('should open the extension page when a new tab is opened', async () => {
    let newTabUrl = 'chrome://newtab';
    const extensionPath = await browser.getExtensionPath();
    const firefoxNewTabUrl = `${extensionPath}/new-tab/index.html`;

    if (process.env.__FIREFOX__) {
      newTabUrl = firefoxNewTabUrl;
    }
    await browser.url(newTabUrl);

    const appDiv = await $('.App');
    await appDiv.waitForDisplayed();
  });
});
