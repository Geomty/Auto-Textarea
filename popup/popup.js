(async () => {
    let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    chrome.scripting.executeScript({
        func: checkTextarea,
        target: { tabId: tab.id }
    }, ([results]) => {
        if (results.result) {
            let items = {};
            ["detected", "settings", "character", "interval", "times", "start", "running", "stop"].forEach(item => {
                items[item] = document.getElementById(item);
            });
        
            // Show form
            items.detected.innerHTML = "Textarea and submit button detected";
            items.detected.style.position = "inherit";
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

            // Cancel automation
            items.stop.addEventListener("click", () => {
                chrome.storage.session.clear();
            })
        }
    })
})();

function checkTextarea() {
    return document.getElementsByTagName("textarea").length && document.querySelectorAll("input[type=submit]").length;
}

function inProgress(items) {
    items.running.style.display = "flex";
    items.character.disabled = true;
    items.interval.disabled = true;
    items.times.disabled = true;
    items.start.disabled = true;
}

function finished(items) {
    items.running.style.display = "none";
    items.character.disabled = false;
    items.interval.disabled = false;
    items.times.disabled = false;
    items.start.disabled = false;
}