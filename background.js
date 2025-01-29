chrome.runtime.onStartup.addListener(() => chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' }));

chrome.storage.onChanged.addListener(changes => {
    if (changes.tab.newValue) {
        chrome.scripting.executeScript({
            files: ["./scripts/automator.js"],
            target: { tabId: changes.tab.newValue }
        });
    }
});