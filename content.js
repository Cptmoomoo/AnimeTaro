chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var pathname = window.location.pathname;
    var hostURL = window.location.hostname;

    if (request.action === "clicked_browser_action") {
        chrome.runtime.sendMessage({"action": "pageloaded", "pageinfo": [hostURL, pathname]});
    }
    else if (request.action === "tab_changed") {
        chrome.runtime.sendMessage({"action": "tabswitch", "tabURL": hostURL});
    }

});
