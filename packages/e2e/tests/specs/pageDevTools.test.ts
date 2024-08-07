describe('Webextension DevTools Panel', () => {
  it('should make DevTools panel available', async () => {
    const extensionPath = await browser.getExtensionPath();

    const devtoolsPanelUrl = `${extensionPath}/devtools-panel/index.html`;
    await browser.url(devtoolsPanelUrl);
    await browser.waitUntil(async () => (await browser.getTitle()) === 'Devtools Panel');
  });
});
