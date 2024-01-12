document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("title");
  const selectFolderButton = document.getElementById("selectFolder");

  function updateTitle() {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      // Running in a Chrome extension environment
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentURL = tabs[0]?.url;
        if (currentURL) {
          titleInput.value = currentURL;
        }
      });
    } else {
      // Running on a regular webpage
      titleInput.value = window.location.href;
    }
  }

  // Fetch and set the title on page load
  updateTitle();

  // Add click event listener for updating the title on button click
  if (selectFolderButton) {
    selectFolderButton.addEventListener("click", updateTitle);
  }
});
