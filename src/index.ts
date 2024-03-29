document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("title") as HTMLInputElement;
  const editorInput = document.getElementById("editor") as HTMLInputElement

  chrome.commands.onCommand.addListener((command: string) => {
    if (command === "openExtensionPopup") {
      // Open your extension popup here
      alert('Keyboard shortcut pressed! Open your extension popup.');
    }
  });

  function updateTitle(callback: (result: string) => void) {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      // Running in a Chrome extension environment
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentURL = tabs[0]?.url;
        if (currentURL) {
          titleInput.value = currentURL;
          callback(currentURL); // Call the callback with the result
        }
      });
    } else {
      // Running on a regular webpage
      const currentURL = window.location.href;
      titleInput.value = currentURL;
      callback(currentURL); // Call the callback with the result
    }
  }

  // Fetch and set the title on page load
  updateTitle((result) => {
    // Save the result to chrome.storage.sync
    chrome.storage.sync.set({ 'savedTitle': result }, () => {
      console.log('Title saved: ' + result);
    });
  });

  // Load the saved text when the popup is opened
  chrome.storage.sync.get(['savedText'], function(result) {
    if (result.savedText) {
      editorInput.value = result.savedText;
    }
  });

  // Save the text whenever there is a change in the textarea
  editorInput.addEventListener('input', function() {
    var text = editorInput.value;
    chrome.storage.sync.set({ 'savedText': text }, function() {
      console.log('Text saved: ' + text);
    });
  });

  // Add click event listener to clear text in Text Editor field
  document.getElementById('clear')?.addEventListener('click', function () {
    editorInput.value = '',
    chrome.storage.sync.set({ 'savedText': '' }, function() {
      console.log('Text cleared');
    });
  });

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
    navigator.clipboard.writeText('text to be copied');

    // Remove the temporary textarea
    document.body.removeChild(tempTextarea);

    // Open the extension page
    chrome.tabs.create({
      url: 'reviewNotes.html',
      active: true
    });
  });

});