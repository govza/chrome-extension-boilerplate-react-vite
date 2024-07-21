declare namespace WebdriverIO {
  interface Browser {
    getExtensionPath: () => Promise<string>;
  }
}
