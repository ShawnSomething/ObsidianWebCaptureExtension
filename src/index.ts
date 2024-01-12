document.addEventListener("DOMContentLoaded", () => {
  const titleInput: HTMLInputElement | null = document.getElementById("title") as HTMLInputElement;
  const selectFolderButton: HTMLElement | null = document.getElementById("selectFolder");
  
  if (titleInput && selectFolderButton) {
    // Fetch and set the title on page load
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentURL: string | undefined = tabs[0]?.url;
      if (currentURL) {
        titleInput.value = currentURL;
      }
    });

    // Add click event listener for updating the title on button click
    selectFolderButton.addEventListener("click", () => {
      if (typeof chrome !== "undefined" && chrome.tabs) {
        // Running in a Chrome extension environment
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const currentURL: string | undefined = tabs[0]?.url;
          if (currentURL) {
            titleInput.value = currentURL;
          }
        });
      } else {
        // Running on a regular webpage
        // Implement an alternative method to get the URL
        // For example, you can use window.location.href
        titleInput.value = window.location.href;
      }
    });
  }
});
