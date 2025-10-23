// Background service worker to open player in new tab when extension icon is clicked
chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
        url: chrome.runtime.getURL('player.html')
    });
});
