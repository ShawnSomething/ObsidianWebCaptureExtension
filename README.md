# Obsidian Capture Tool - Chrome Extension

Allows you to quickly capture notes from the Chrome browser and save them to your local as a .md file
You can save this to your Obsidian Vault and it will show up there right away
- I've done this by saving the files to my Google Drive Obsidian Vault

## How to Use it
- Load the `build` file into the Chrome extensions management
- Pin it to your Chrome bar
- When firing it up: the title will auto-populate with your current URL
![image](https://github.com/ShawnSomething/ObsidianWebCaptureExtension/assets/107730112/d3c5fd39-e99c-4fd4-864e-0106bb54863d)
- Add notes as needed
- Click on Review Notes to open up a new web page
- Paste your notes in
- Save it to the file of your choice


## Shortcomings (might be addressed in the future)
- Chrome does not let us download files directly from the extension, so would need to open it up in another web page
- There is also a limitation with mirroring the texts from the extension to the other tab
  - In this case, I've opted to copy the texts when the Review Notes button is pressed
      - This then caused another issue with needing to concat the title and the text editor into one
  - Unable to auto-paste the copied text to the new tab, so manual pasting is required
- Notes do not persist when the extension is closed but the tab is still active
  - This will be super useful, but I need to figure out how to do that
- The Review Notes button is still on the different webpage even though it doesn't do anything
  - I need to get rid of this, but there are some errors and dependencies that come up when I do, will need to sort that out

## Privacy Policy
This extension will not obtain, use or distribute any information from the user
