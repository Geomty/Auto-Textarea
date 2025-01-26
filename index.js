(async () => {
    let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    chrome.scripting.executeScript({
        func: checkTextarea,
        target: { tabId: tab.id }
    }, ([results]) => {
        if (results.result) {
            document.getElementById("detected").innerHTML = "Textarea detected";
            document.getElementById("settings").style.display = "flex";
        }
    })
})();

function checkTextarea() {
    return document.getElementsByTagName("textarea").length > 0;
}