var textarea = document.getElementsByTagName("textarea")[0];
var submit = document.querySelectorAll("input[type=submit]")[0];

chrome.storage.session.get(["character"]).then(({ character }) => {
    textarea.value += character;
    submit.click();
    chrome.storage.session.clear();
});