describe('The example page can be loaded', () => {
  it('should be able to go to example page', async () => {
    await browser.url('https://www.example.com');
    await browser.waitUntil(async () => (await browser.getTitle()) === 'Example Domain');
  });
});
