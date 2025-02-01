chrome.runtime.onStartup.addListener(() => chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' }));
let tab, interval;

chrome.storage.onChanged.addListener(changes => {
    tab = changes.tab?.newValue || tab;
    interval = changes.interval?.newValue || interval;

    if (changes.times.newValue) {
        setTimeout(() => {
            chrome.storage.session.get(["times"]).then(newStorage => {
                if (newStorage.times) {
                    chrome.scripting.executeScript({
                        files: ["./scripts/automator.js"],
                        target: { tabId: tab }
                    });
                }
            });
        }, interval * 1000);
    }
});

chrome.tabs.onRemoved.addListener(tabId => {
    chrome.storage.session.get(["tab"]).then(({ tab }) => {
        if (tabId == tab) chrome.storage.session.clear();
    });
});