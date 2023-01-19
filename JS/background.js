// background.js
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var currentURL = tabs[0].url;
  localStorage.setItem("lastURL", currentURL);
});
