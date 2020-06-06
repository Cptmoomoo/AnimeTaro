var anime_title;
var currentDomain;
var currentPath;
var isValidPage;

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"action": "clicked_browser_action"});
    });
});
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.sendMessage(activeInfo.tabId, {"action": "tab_changed"});
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

        if (request.action === "parse_response") {
            isValidPage = request.pagestatus;
            if (!isValidPage) chrome.browserAction.setPopup({popup: "failedpopup.html"});
            else chrome.browserAction.setPopup({popup: "successpopup.html"});
        }
        else if (request.action === "tabswitch") {
            currentDomain = request.tabURL;
            if (currentDomain !== "myanimelist.net") {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    var activeTab = tabs[0];
                    chrome.tabs.sendMessage((activeTab.id), {"action": "parse_page"});
                });
            }
            else {
                chrome.browserAction.setPopup({popup: ""});
            }
        }
        else if (request.action === "pageloaded") {
            currentDomain = request.pageinfo[0];
            currentPath = request.pageinfo[1];

            // unicode characters? - ☆

            var url_parsed = currentPath;
            if (url_parsed.includes("?")) {
                url_parsed = url_parsed.split("?");
                url_parsed.pop();
            }
            url_parsed = url_parsed.split("/");
            var mal_title = url_parsed[url_parsed.length - 1];
            mal_title = mal_title.toLowerCase();
            anime_title = mal_title.replace(/__/g, "-");
            anime_title = anime_title.replace(/[^a-zA-Z\d]/g, "-");
            var new_url;

            chrome.storage.sync.get({prefsource: 'gogo'}, function(result) {
                var user_op = result.prefsource;

                // You thought this would be a variable, but it was me, DIO!
                var dio = Math.floor(Math.random() * 20);

                if (dio === 0) {
                    new_url = "https://imgur.com/a/JP5TS2s";
                }
                else if (user_op === "gogo") {
                    new_url = "https://www6.gogoanimehub.tv/category/" + anime_title;
                }
                else if (user_op === "crunchy") {
                    new_url = "https://www.crunchyroll.com/en-gb/" + anime_title;
                }
                else {
                    new_url = "https://www.kiss-anime.ws/Anime/" + anime_title;
                }
                chrome.tabs.create({url: new_url, active: false});
            });
        }
    });
