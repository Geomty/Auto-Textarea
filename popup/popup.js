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
        
            items.detected.innerHTML = "Textarea and submit button detected";
            items.settings.style.display = "flex";

            items.settings.addEventListener("submit", event => {
                event.preventDefault();

                items.progress.innerHTML = "Automation in progress...";
                items.start.disabled = true;

                chrome.storage.session.set({ tab: tab.id, character: items.character.value, interval: items.interval.value, times: items.times.value });
            });
        }
    })
})();

function checkTextarea() {
    return document.getElementsByTagName("textarea").length && document.querySelectorAll("input[type=submit]").length;
}
