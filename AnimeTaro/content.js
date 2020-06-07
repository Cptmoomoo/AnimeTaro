chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var pathname = window.location.pathname;
    var hostURL = window.location.hostname;

    if (request.action === "clicked_browser_action") {
        chrome.runtime.sendMessage({"action": "pageloaded", "pageinfo": [hostURL, pathname]});
    }
    else if (request.action === "tab_changed") {
        chrome.runtime.sendMessage({"action": "tabswitch", "tabURL": hostURL});
    }
    else if (request.action === "parse_page") {
        var header = $('h1').text();
        var body = $('body').text();
        var span = $('span').text();
        var status = true;
        if (header.includes("Page not found") || body.includes("404") || span.includes("404")) status = false;
        chrome.runtime.sendMessage({"action": "parse_response", "pagestatus": status});
    }

});
