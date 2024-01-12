/// <reference lib="dom" />

document.addEventListener('DOMContentLoaded', () => {
  const selectFolderButton = document.getElementById('selectFolder') as HTMLButtonElement;

  if (selectFolderButton) {
    selectFolderButton.addEventListener('click', async () => {
      try {
        const mappedTitleInput = document.getElementById('mappedTitle') as HTMLInputElement;
        const editorInput = document.getElementById('editor') as HTMLTextAreaElement;

        if (!mappedTitleInput || !editorInput) {
          console.error("Mapped title or editor element not found.");
          return;
        }

        const suggestedName = mappedTitleInput.value || 'Untitled';
        const fileHandle = await (window as any).showSaveFilePicker({ suggestedName: suggestedName + '.md' });

        // Get the title and text editor content
        const title = mappedTitleInput.value;
        const editorContent = editorInput.value;

        // Create an array of parts for the text file
        const textArray = [`# ${title}\n\n`, editorContent];

        // Create a Blob with the text content
        const blob = new Blob(textArray, { type: 'text/markdown' });

        // Create a FileWriter and write the Blob to the file
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (error) {
        console.error('Error selecting folder:', error);
      }
    });
  } else {
    console.error("Button with ID 'selectFolder' not found");
  }
});
