# Codeforces Random Problem Chrome Extension

This Chrome extension fetches a random problem from Codeforces based on a user-defined difficulty range and optional tags. It supports flexible filtering—either matching any of the selected tags (OR condition) or requiring an exact match (only the selected tags)—and automatically opens the chosen problem in a new tab.

## Features
- Select a difficulty range (e.g., 800–3500)
- Choose multiple tags from a dropdown
- Toggle between "any tags" (OR) or "exact tags" (AND) filtering
- Displays the selected problem and opens it in a new tab

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
2. Adjust the difficulty range using the "Min" and "Max" fields
3. (Optional) Select tags from the dropdown
   - Tags appear as removable chips (click × to delete)
4. Check "Exact tag match" for problems with only the selected tags, or leave unchecked for problems with any of the tags
5. Click "Get Problem"
   - The problem name will appear in the popup, and it will open in a new tab

## Development
- **API**: Utilizes the Codeforces API (`https://codeforces.com/api/problemset.problems`) to fetch problem data
- **UI**: Designed with a modern, compact layout in `popup.html` using embedded CSS
- **Logic**: Implemented in `popup.js` to handle API requests, filtering, and problem selection
- **Error Handling**: Includes checks for API failures and invalid user inputs
- **Tech Stack**: Built with vanilla JavaScript, HTML, and CSS—no external frameworks

## Files
- `manifest.json`: Defines the extension’s configuration and permissions
- `popup.html`: Structures and styles the popup interface
- `popup.js`: Manages the extension’s functionality and API interaction
- `icon16.png`, `icon48.png`, `icon128.png`: Extension icons (included in the repository)

## Troubleshooting
- **No problems found**: Widen your difficulty range or adjust tags—some combinations may yield no results
- **Fetch errors**: Verify your internet connection and the Codeforces API’s availability
- **Icons missing**: Ensure you’ve cloned or downloaded the full repository, as icons are included

## Contributing
Fork the repository, enhance it, and submit a pull request—contributions are welcome!

## License
This project is open-source and unlicensed—feel free to use or modify it as you see fit!