# Codeforces Random Problem Chrome Extension

This Chrome extension fetches a random problem from Codeforces based on a specified difficulty range and optional tags. It can filter problems with either an OR condition (any of the selected tags) or an exact match (only the selected tags), and automatically opens the problem in a new tab.

## Features
- Select a difficulty range (e.g., 800-3500)
- Choose multiple tags from a dropdown
- Toggle between "any tags" (OR) or "exact tags" (AND) filtering
- Displays the selected problem and opens it in a new tab

## Installation

### Prerequisites
- Google Chrome browser
- Icon files (16x16, 48x48, 128x128 PNGs) for the extension

### Steps
1. **Clone or Download the Repository**
   - Clone this repository: `git clone https://github.com/your-username/CodeforcesRandomProblem.git`
   - Or download the ZIP and extract it

2. **Prepare Icon Files**
   - Place three PNG icon files in the project directory:
     - `icon16.png` (16x16 pixels)
     - `icon48.png` (48x48 pixels)
     - `icon128.png` (128x128 pixels)
   - You can create simple icons using an image editor or download them (e.g., from [IconArchive](https://www.iconarchive.com/))

3. **Load the Extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked" and select the `CodeforcesRandomProblem` folder
   - The extension should appear in your toolbar

## Usage
1. Click the extension icon in the Chrome toolbar
2. Set your desired difficulty range (Min and Max)
3. Select tags from the dropdown (optional)
   - Selected tags appear as chips; click × to remove
4. Check "Exact tag match" if you want problems with only the selected tags
5. Click "Get Problem"
   - The problem will display in the popup and open in a new tab

## Files
- `manifest.json`: Extension configuration
- `popup.html`: UI structure and styles
- `popup.js`: Logic for fetching and displaying problems
- `icon*.png`: Extension icons (not included in repo; add your own)

## Development
- Built using the Codeforces API (`https://codeforces.com/api/problemset.problems`)
- Modern UI with a compact design
- Error handling for API requests

## Troubleshooting
- **No problems found**: Check your difficulty range and tags; broaden them if needed
- **Fetch errors**: Ensure internet connectivity and that the Codeforces API is accessible
- **Icons missing**: Add the required PNG files to the directory

## Contributing
Feel free to fork this repository, make improvements, and submit pull requests!

## License
This project is open-source and unlicensed—use it as you wish!