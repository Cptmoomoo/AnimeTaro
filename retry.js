function find_new_link() {
    chrome.storage.sync.get({prefsource: 'gogo'}, function(result) {
        var current_source = chrome.extension.getBackgroundPage().currentDomain;
        var carried_title = chrome.extension.getBackgroundPage().anime_title;
        var new_url;

        if (current_source === "www6.gogoanimehub.tv") {
            //send to kiss
            new_url = "https://www.kiss-anime.ws/Anime/" + carried_title;
        }
        else {
            // send to gogo
            new_url = "https://www6.gogoanimehub.tv/category/" + carried_title;
        }
        chrome.tabs.create({url: new_url, active: false});
    });
}

document.getElementById('retry').addEventListener('click', find_new_link);
