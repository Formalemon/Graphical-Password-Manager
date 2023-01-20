// import the storage API
const storage = chrome.storage.local;

function saveMp(masterPass) {
  storage.set({ main: masterPass });
}

function retrieveMp(sendResponse) {
  storage.get("main", function (item) {
    sendResponse(item);
  });
}

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

function rD(sendResponse) {
  storage.get("userData", function (items) {
    sendResponse(items);
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
  } else if (request.action === "retrieve_pass") {
    rD(sendResponse);
    return true;
  } else if (request.action === "smp") {
    saveMp(request.data);
  } else if (request.action === "rmp") {
    retrieveMp(sendResponse);
    return true;
  } else {
    sendResponse({ status: "error" });
  }
});
