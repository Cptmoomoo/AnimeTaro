chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"action": "clicked_browser_action"});
    });
});

// On page load, check to see if page not found, if not try another source.

// You thought this would be a comment, but it's me, DIO!

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.action === "find_source") {

            // check for search query
            // unicode characters? - ☆

            var url_parsed = request.url.split("/");
            var mal_title = url_parsed[url_parsed.length - 1];
            mal_title = mal_title.toLowerCase();
            var anime_title = mal_title.replace(/__/g, "-");
            anime_title = anime_title.replace(/[^a-zA-Z\d]/g, "-");
            var new_url;

            chrome.storage.sync.get({prefsource: 'gogo'}, function(result) {
                var user_op = result.prefsource;

                // Add 10% chance for dio

                if (user_op === "gogo") {
                    new_url = "https://www6.gogoanimehub.tv/category/" + anime_title;
                }
                else {
                    new_url = "https://www.kiss-anime.ws/Anime/" + anime_title;
                }
                chrome.tabs.create({"url": new_url});
            });
        }
    });
