document.addEventListener("DOMContentLoaded", () => {
  const selectFolderButton = document.getElementById("selectFolder");
  if (selectFolderButton) {
    selectFolderButton.addEventListener("click", async () => {
      try {
        const mappedTitleInput = document.getElementById("mappedTitle");
        const editorInput = document.getElementById("editor");
        if (!mappedTitleInput || !editorInput) {
          console.error("Mapped title or editor element not found.");
          return;
        }
        const suggestedName = mappedTitleInput.value || "Untitled";
        const fileHandle = await window.showSaveFilePicker({suggestedName: suggestedName + ".md"});
        const title = mappedTitleInput.value;
        const editorContent = editorInput.value;
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
