// background.js
// background.js

// import the storage API
const storage = chrome.storage.local;

// function to save data to storage
function saveData(data) {
  storage.set({ userData: data }, function () {
    console.log("Data saved successfully:", data);
  });
}

// function to retrieve data from storage
function retrieveData() {
  storage.get("userData", function (items) {
    console.log("Data retrieved successfully:", items);
  });
}

// listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "save") {
    saveData(request.data);
    sendResponse({ status: "success" });
  } else if (request.action === "retrieve") {
    retrieveData();
    sendResponse({ status: "success" });
  } else {
    sendResponse({ status: "error" });
  }
});
