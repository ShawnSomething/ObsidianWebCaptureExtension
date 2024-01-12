document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('title') as HTMLInputElement;
  const createNewFileButton = document.getElementById('createNewFile') as HTMLButtonElement;

  createNewFileButton.addEventListener('click', () => {
    // Get the current URL of the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentURL = tabs[0]?.url;
      
      // Set the title input value to the current URL
      if (currentURL) {
        titleInput.value = currentURL;
      }
    });
  });
});
