//Enabling launching addon from right-click menu
//Customize to fit your needs
chrome.contextMenus.create({
    id: "context1",
    title: "Demo - Leave Feedback",
    contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    chrome.tabs.create({
        url: 'popup.html#contextMenu',
        active: false
    }, function(tab) {
        chrome.windows.create({
            tabId: tab.id,
            width: 360,
            height: 450,
            type: 'popup',
            focused: true
        });
    });
});