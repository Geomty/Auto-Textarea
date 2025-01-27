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

                    chrome.scripting.executeScript({
                        func: automate,
                        args: [items.character.value, items.interval.value, items.times.value],
                        target: { tabId: tab.id }
                    });
                }
            });
        }
    })
})();

function checkTextarea() {
    return document.getElementsByTagName("textarea").length && document.querySelectorAll("input[type=submit]").length;
}

function automate(character, interval, times) {
    let textarea = document.getElementsByTagName("textarea")[0];
    let submit = document.querySelectorAll("input[type=submit]")[0];

    let i = 0;
    let myInterval = setInterval(() => {
        textarea.value += character;
        submit.click();
        i++;
        if (i == times) clearInterval(myInterval);
    }, interval * 1000);
}