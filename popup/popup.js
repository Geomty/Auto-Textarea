(async () => {
    let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    chrome.scripting.executeScript({
        files: ["./scripts/automator.js"],
        target: { tabId: tab.id }
    })
})();