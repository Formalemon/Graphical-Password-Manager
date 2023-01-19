document.getElementById("log-b").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        var activeTabURL = activeTab.url;
        console.log(activeTabURL);
    });
});