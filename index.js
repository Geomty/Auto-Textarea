(async () => {
    let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    chrome.scripting.executeScript({
        func: automator,
        args: ["#00c5ff"],
        target: { tabId: tab.id }
    })
})();

function automator(color) {
    document.getElementsByTagName("body")[0].style.backgroundColor = color;
}