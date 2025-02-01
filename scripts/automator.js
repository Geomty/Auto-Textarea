try {
    var textarea = document.getElementsByTagName("textarea")[0];
    var submit = document.querySelectorAll("[type=submit]")[0];

    chrome.storage.session.get(["character", "times"]).then(storage => {
        if (storage.times > 1) {
            chrome.storage.session.set({ times: storage.times - 1 });
        } else {
            chrome.storage.session.clear();
        }

        textarea.value += storage.character;
        submit.click();
    });
} catch (error) {
    console.log(error);
    chrome.storage.session.clear();
}