try {
    var textarea = document.getElementsByTagName("textarea")[0];
    var submit = document.querySelectorAll("input[type=submit]")[0];

    chrome.storage.session.get(["character", "interval", "times"]).then(items => {
        textarea.value += items.character;
        submit.click();
        setTimeout(() => {
            if (items.times > 0) {
                chrome.storage.session.set({ times: items.times - 1 });
            } else {
                chrome.storage.session.clear();
            }
        }, items.interval * 1000);
    });
} catch (error) {
    console.log(error);
}