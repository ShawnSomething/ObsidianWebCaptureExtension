document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("title");
  const selectFolderButton = document.getElementById("selectFolder"); // Updated ID
  selectFolderButton.addEventListener("click", () => { // Changed event to "click"
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentURL = tabs[0]?.url;
      if (currentURL) {
        titleInput.value = currentURL;
      }
    });
  });
});
