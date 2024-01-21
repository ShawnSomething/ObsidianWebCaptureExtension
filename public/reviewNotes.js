document.addEventListener("DOMContentLoaded", () => {
  const selectFolderButton = document.getElementById("selectFolder");
  const titleInput = document.getElementById("title");
  const editorInput = document.getElementById("editor");
  chrome.storage.sync.get(["savedTitle"], function(result) {
    const savedTitle = result.savedTitle;
    if (savedTitle) {
      titleInput.value = savedTitle;
    }
  });
  chrome.storage.sync.get(["savedText"], function(result) {
    if (result.savedText) {
      editorInput.value = result.savedText;
    }
  });
  if (selectFolderButton) {
    selectFolderButton.addEventListener("click", async () => {
      try {
        const titleInput = document.getElementById("title");
        const editorInput2 = document.getElementById("editor");
        if (!titleInput || !editorInput2) {
          console.error("Mapped title or editor element not found.");
          return;
        }
        const suggestedName = titleInput.value || "Untitled";
        const fileHandle = await window.showSaveFilePicker({suggestedName: suggestedName + ".md"});
        const title = titleInput.value;
        const editorContent = editorInput2.value;
        const textArray = [`# ${title}

`, editorContent];
        const blob = new Blob(textArray, {type: "text/markdown"});
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (error) {
        console.error("Error selecting folder:", error);
      }
    });
  } else {
    console.error("Button with ID 'selectFolder' not found");
  }
});
