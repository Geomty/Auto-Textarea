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

            items.start.addEventListener("click", event => {
                event.preventDefault();
                let error = false;
                for (i of [items.character, items.interval, items.times]) {
                    if (!i.value.length) error = true;
                }
                if (error) {
                    items.progress.innerHTML = "Error";
                } else {
                    items.progress.innerHTML = "Automation in progress...";
                    items.start.disabled = true;
                }
            });
        }
    })
})();

function checkTextarea() {
    return document.getElementsByTagName("textarea").length > 0;
}