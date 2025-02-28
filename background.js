// background.js
const GITHUB_API_URL = 'https://api.github.com/repos/SaifullahMnsur/random-cf-problem-chrome-extension/releases/latest';
const currentVersion = chrome.runtime.getManifest().version;
const ALARM_NAME = 'checkForUpdatesAlarm';
const CHECK_INTERVAL_MINUTES = 1440; // 24 hours in minutes

function checkForUpdates() {
    fetch(GITHUB_API_URL)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const latestVersion = data.tag_name.replace('v', '');
            if (compareVersions(latestVersion, currentVersion) > 0) {
                showUpdateNotification(latestVersion);
            }
        })
        .catch(error => console.error('Error checking for updates:', error));
}

function compareVersions(v1, v2) {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const n1 = parts1[i] || 0;
        const n2 = parts2[i] || 0;
        if (n1 > n2) return 1;
        if (n1 < n2) return -1;
    }
    return 0;
}

function showUpdateNotification(latestVersion) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'assets/icon128.png',
        title: 'Update Available',
        message: `A new version (${latestVersion}) of Random CF Problem is available! Download it from GitHub.`,
        buttons: [{ title: 'Update Now' }],
        requireInteraction: true
    });
}

// Schedule the update check alarm
function scheduleUpdateCheck() {
    chrome.alarms.create(ALARM_NAME, {
        delayInMinutes: 1, // Initial check 1 minute after startup
        periodInMinutes: CHECK_INTERVAL_MINUTES // Repeat every 24 hours
    });
}

// Handle alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
        checkForUpdates();
    }
});

// Handle notification button clicks
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (buttonIndex === 0) {
        chrome.tabs.create({ url: 'https://github.com/SaifullahMnsur/random-cf-problem-chrome-extension/releases/latest' });
    }
});

// Run on extension startup (e.g., PC boot or Chrome start)
chrome.runtime.onStartup.addListener(() => {
    scheduleUpdateCheck();
});

// Run when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    scheduleUpdateCheck();
});

// Immediate check for debugging (optional, remove in production if not needed)
checkForUpdates();