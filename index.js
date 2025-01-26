(async () => {
    let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    chrome.scripting.executeScript({
        func: checkTextarea,
        target: { tabId: tab.id }
    }, ([results]) => {
        if (results.result) {
            let items = {};
            ["detected", "settings", "character", "interval", "times", "start", "progress"].forEach(item => {
                items[item] = document.getElementById(item);
            });
        
            items.detected.innerHTML = "Textarea detected";
            items.settings.style.display = "flex";
        }
    })
})();

function checkTextarea() {
    return document.getElementsByTagName("textarea").length > 0;
}