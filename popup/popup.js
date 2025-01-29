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
        
            // Show form
            items.detected.innerHTML = "Textarea and submit button detected";
            items.settings.style.display = "flex";

            // Detect automation
            chrome.storage.session.get(["tab"]).then(storage => {
                if (storage.tab) inProgress(items);
            });

            // Detect automation finish
            chrome.storage.onChanged.addListener(changes => {
                if (!changes.times.newValue && changes.times.oldValue) finished(items);
            });

            // Create automation
            items.settings.addEventListener("submit", event => {
                event.preventDefault();
                inProgress(items);
                chrome.storage.session.set({ tab: tab.id, character: items.character.value, interval: items.interval.value, times: items.times.value });
            });
        }
    })
})();

function checkTextarea() {
    return document.getElementsByTagName("textarea").length && document.querySelectorAll("input[type=submit]").length;
}

function inProgress(items) {
    items.progress.innerHTML = "Automation in progress...";
    items.start.disabled = true;
}

function finished(items) {
    items.progress.innerHTML = "";
    items.start.disabled = false;
}