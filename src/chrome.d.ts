declare namespace chrome {
  namespace tabs {
    function query(
      queryInfo: object,
      callback: (result: chrome.tabs.Tab[]) => void
    ): void;
  }
}