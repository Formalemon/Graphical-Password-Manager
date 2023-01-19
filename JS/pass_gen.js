function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function generatePassword(
  length = 16,
  numLower = 4,
  numUpper = 4,
  numDigits = 4,
  numSpecial = 4
) {
  // create strings of each character type
  var lower = "abcdefghijklmnopqrstuvwxyz";
  var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var digits = "0123456789";
  var special = "!@#$%^&*()_+-=[]{}|;':\"<>,.?/\\";

  // create an array to store the password characters
  var password = [];

  // add the required number of each character type to the password
  for (var i = 0; i < numLower; i++) {
    password.push(lower[Math.floor(Math.random() * lower.length)]);
  }
  for (var i = 0; i < numUpper; i++) {
    password.push(upper[Math.floor(Math.random() * upper.length)]);
  }
  for (var i = 0; i < numDigits; i++) {
    password.push(digits[Math.floor(Math.random() * digits.length)]);
  }
  for (var i = 0; i < numSpecial; i++) {
    password.push(special[Math.floor(Math.random() * special.length)]);
  }

  // add remaining characters to fill out the password to the desired length
  var remaining = length - password.length;
  for (var i = 0; i < remaining; i++) {
    password.push(
      lower[
        Math.floor(
          Math.random() * lower.length +
            upper.length +
            digits.length +
            special.length
        )
      ]
    );
  }

  // shuffle the password to add an extra level of randomness
  password = shuffle(password);

  // convert the array of characters to a string
  password = password.join("");

  return password;
}

//Functions for saving and retrieving data
function saveData(data) {
  chrome.runtime.sendMessage(
    { action: "save", data: data },
    function (response) {
      console.log(response.status);
    }
  );
}

// function to retrieve data from the background script
function retrieveData() {
  chrome.runtime.sendMessage({ action: "retrieve" }, function (response) {
    console.log(response.status);
  });
}

pass_dict = [];

async function retrievePass() {
  const response = await new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { action: "retrieve_pass" },
      function (response) {
        if (response) {
          resolve(response);
        } else {
          reject("Error retrieving data");
        }
      }
    );
  });
  pass_dict = response.userData;
  document.getElementById("stored_pass").innerHTML = pass_dict;
}

retrievePass();

document.getElementById("generate").addEventListener("click", function () {
  var textField = document.getElementById("gen_pass");
  var password = generatePassword();
  textField.value = password;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentUrl = tabs[0].url;
    // Check if the url is in pass_dict

    var tempArr = [];
    pass_dict.forEach((element) => {
      tempArr.push(element);
    });

    var processedUrl = currentUrl.split("/")[2];

    arr = [].concat.apply([], tempArr);

    if (arr.includes(processedUrl)) {
      let index = arr.indexOf(processedUrl);
      document.getElementById("saved-pass").innerHTML = arr[index + 1];
    } else {
      pass_dict.push([processedUrl, password]);
      saveData(pass_dict);
    }
  });
});

document.getElementById("reset-button").onclick = (e) => {
  pass_dict = [];
  saveData([]);
};

document.getElementById("inject").onclick = (e) => {
  let inputElements = document.getElementsByTagName("input");
  for (let i = 0; i < inputElements.length; i++) {
    if (inputElements[i].type === "password") {
      document.getElementById("pass").innerHTML = inputElements[i].value;
    }
  }
};
