# Codeforces Random Problem Chrome Extension

This Chrome extension fetches a random problem from Codeforces based on a user-defined difficulty range and optional tags. It supports flexible filtering—either matching any of the selected tags (OR condition) or requiring an exact match (only the selected tags)—and automatically opens the chosen problem in a new tab.

## Live Demo
Check out the extension preview, screenshots, and download it at: [https://SaifullahMnsur.github.io/random-cf-problem-chrome-extension/](https://SaifullahMnsur.github.io/random-cf-problem-chrome-extension/)

## Features
- Select a difficulty range (e.g., 800–3500)
- Choose multiple tags from a dropdown
- Toggle between "any tags" (OR) or "exact tags" (AND) filtering
- Displays the selected problem and opens it in a new tab
- Dark/light theme toggle with a modern slider switch

## Installation

### Prerequisites
- Google Chrome browser

### Steps
1. **Clone or Download the Repository**
   - Clone: `git clone https://github.com/SaifullahMnsur/random-cf-problem-chrome-extension.git`
   - Or download the ZIP and extract it

2. **Load the Extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top-right toggle)
   - Click "Load unpacked" and select the `random-cf-problem-chrome-extension` folder
   - The extension will appear in your toolbar

## Usage
1. Click the extension icon in the Chrome toolbar
2. (Optional) Toggle between dark and light themes using the slider at the top-right
3. Adjust the difficulty range using the "Min Difficulty" and "Max Difficulty" fields
4. (Optional) Select tags from the dropdown
   - Tags appear as removable chips (click × to delete)
5. Check "Exact tag match" for problems with only the selected tags, or leave unchecked for problems with any of the tags
6. Click "Get Problem"
   - The problem name will appear in the popup, and it will open in a new tab

## Development
- **API**: Utilizes the Codeforces API (`https://codeforces.com/api/problemset.problems`) to fetch problem data
- **UI**: Designed with a modern, compact layout in `popup.html` using embedded CSS, now with dark/light theme support via a slider toggle
- **Logic**: Implemented in `popup.js` to handle API requests, filtering, and problem selection with context-aware behavior for both extension and standalone use
- **Error Handling**: Includes checks for API failures and invalid user inputs
- **Tech Stack**: Built with vanilla JavaScript, HTML, and CSS—no external frameworks

## Files
- `manifest.json`: Defines the extension’s configuration and permissions
- `popup.html`: Structures and styles the popup interface with theme toggle
- `popup.js`: Manages the extension’s functionality and API interaction
- `assets/icon16.png`, `assets/icon48.png`, `assets/icon128.png`: Extension icons (included in the repository)
- `index.html`: GitHub Pages landing page with a download button and screenshots
- `assets/popup-preview.png`, `assets/screenshot2.png`: Static screenshots of the extension UI

## Troubleshooting
- **No problems found**: Widen your difficulty range or adjust tags—some combinations may yield no results
- **Fetch errors**: Verify your internet connection and the Codeforces API’s availability
- **Icons missing**: Ensure you’ve cloned or downloaded the full repository, as icons are included in the `assets` folder

## Contributing
We’d love your help to make this extension even better! Whether it’s adding new features, improving the UI, or fixing bugs, your contributions can have a real impact. Fork the repository, make your enhancements, and submit a pull request—every idea counts, and we’re excited to see what you bring to the table!

## Roadmap
- [x] Add dark mode with a slider toggle for a customizable look
- [x] Enhance UI with animations and additional styling (v1.5.0)
- [x] Add auto-updater using GitHub releases (v1.5.0)
- [ ] Expand filtering options (e.g., contest type, problem status)

## License
This project is open-source and unlicensed—feel free to use or modify it as you see fit!