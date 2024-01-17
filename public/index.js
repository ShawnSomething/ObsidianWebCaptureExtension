document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("title");
  const editorInput = document.getElementById("editor");
  function updateTitle(callback) {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const currentURL = tabs[0]?.url;
        if (currentURL) {
          titleInput.value = currentURL;
          callback(currentURL);
        }
      });
    } else {
      const currentURL = window.location.href;
      titleInput.value = currentURL;
      callback(currentURL);
    }
  }
  updateTitle((result) => {
    chrome.storage.sync.set({savedTitle: result}, () => {
      console.log("Title saved: " + result);
    });
  });
  chrome.storage.sync.get(["savedText"], function(result) {
    if (result.savedText) {
      editorInput.value = result.savedText;
    }
  });
  editorInput.addEventListener("input", function() {
    var text = editorInput.value;
    chrome.storage.sync.set({savedText: text}, function() {
      console.log("Text saved: " + text);
    });
  });
  document.getElementById("clear")?.addEventListener("click", function() {
    editorInput.value = "", chrome.storage.sync.set({savedText: ""}, function() {
      console.log("Text cleared");
    });
  });
  document.getElementById("openExtension")?.addEventListener("click", function() {
    const titleValue = titleInput.value;
    const editorValue = editorInput.value;
    const combinedValue = titleValue + " " + editorValue;
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = combinedValue;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    navigator.clipboard.writeText("text to be copied");
    document.body.removeChild(tempTextarea);
    chrome.tabs.create({
      url: "reviewNotes.html",
      active: true
    });
  });
});
