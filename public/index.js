document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("title");
  const selectFolderButton = document.getElementById("selectFolder");
  function updateTitle() {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const currentURL = tabs[0]?.url;
        if (currentURL) {
          titleInput.value = currentURL;
        }
      });
    } else {
      titleInput.value = window.location.href;
    }
  }
  updateTitle();
  if (selectFolderButton) {
    selectFolderButton.addEventListener("click", updateTitle);
  }
  document.getElementById("openExtension")?.addEventListener("click", function() {
    chrome.tabs.create({
      url: "reviewNotes.html",
      active: true
    });
  });
});
