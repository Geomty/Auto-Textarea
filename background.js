chrome.runtime.onStartup.addListener(() => chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' }));
let tab;

chrome.storage.onChanged.addListener(changes => {
    tab = changes.tab?.newValue || tab;
    if (changes.times.newValue) {
        chrome.scripting.executeScript({
            files: ["./scripts/automator.js"],
            target: { tabId: tab }
        });
    }
});