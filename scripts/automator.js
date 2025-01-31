try {
    var textarea = document.getElementsByTagName("textarea")[0];
    var submit = document.querySelectorAll("[type=submit]")[0];

    chrome.storage.session.get(["character", "interval", "times"]).then(storage => {
        textarea.value += storage.character;
        submit.click();
        setTimeout(() => {
            chrome.storage.session.get(["times"]).then(newStorage => {
                if (newStorage.times) {
                    if (storage.times > 1) {
                        chrome.storage.session.set({ times: storage.times - 1 });
                    } else {
                        chrome.storage.session.clear();
                    }
                }
            });
        }, storage.interval * 1000);
    });
} catch (error) {
    console.log(error);
    chrome.storage.session.clear();
}