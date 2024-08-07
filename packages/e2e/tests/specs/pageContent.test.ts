describe('Webextension Content Script', () => {
  it('should log "content script loaded" in console', async () => {
    await browser.sessionSubscribe({ events: ['log.entryAdded'] });
    const logs: (string | null)[] = [];
    browser.on('log.entryAdded', logEntry => {
      logs.push(logEntry.text);
    });

    await browser.url('https://www.example.com');

    const expectedLogMessage = 'content script loaded';
    await browser.waitUntil(() => logs.includes(expectedLogMessage));

    expect(logs).toContain(expectedLogMessage);
  });
});
