document.addEventListener("DOMContentLoaded", function () {
  const titleInput = document.getElementById("title");
  const selectFolderButton = document.getElementById("selectFolder");
  const editorInput = document.getElementById("editor");

  function updateTitle() {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      // Running in a Chrome extension environment
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
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

  // Add click event listener for copying to clipboard on openExtension button click
  document.getElementById('openExtension')?.addEventListener('click', function () {
    // Get the values of titleInput and editorInput
    const titleValue = titleInput.value;
    const editorValue = editorInput.value;

    // Concatenate the values
    const combinedValue = titleValue + ' ' + editorValue;

    // Create a temporary textarea element
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = combinedValue;

    // Append the textarea to the document body
    document.body.appendChild(tempTextarea);

    // Select the content of the textarea
    tempTextarea.select();
    
    // Copy the selected content to the clipboard
    navigator.clipboard.writeText(combinedValue);

    // Remove the temporary textarea
    document.body.removeChild(tempTextarea);

    // Open the extension page
    chrome.tabs.create({
      url: 'reviewNotes.html',
      active: true
    });
  });
});
