chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "clicked_browser_action") {
        var currentURL = window.location.pathname;
        chrome.runtime.sendMessage({"action": "find_source", "url": currentURL});
    }
});
