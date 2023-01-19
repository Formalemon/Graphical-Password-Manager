document.getElementById("test-button").addEventListener("click", function () {
  if (JSON.stringify(clickedImages) === JSON.stringify(masterPass)) {
    location.href = "../pass_handler.html";
  } else {
    clickedImages = [];
    document.getElementById("clicks").innerHTML = "Wrong Password";
    randomizePositions();
  }
});

window.onload = (e) => {
  randomizePositions();
};

var masterPass = [];

retrieveMp();

async function retrieveMp() {
  const response = await new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { action: "rmp" },
      function (response) {
        if (response) {
          resolve(response);
        } else {
          reject("Error retrieving data");
        }
      }
    );
  });
  masterPass = response.main;
}

var clickedImages = [];

for (let i = 1; i <= 9; i++) {
  document.getElementById(i).addEventListener("click", function () {
    clickedImages.push(i);
  });
}

var imageElements = [
  document.getElementById("1"),
  document.getElementById("2"),
  document.getElementById("3"),
  document.getElementById("4"),
  document.getElementById("5"),
  document.getElementById("6"),
  document.getElementById("7"),
  document.getElementById("8"),
  document.getElementById("9"),
];

function randomizePositions() {
  // Shuffle the array
  imageElements.sort(() => Math.random() - 0.5);

  // Update the grid
  for (let i = 0; i < imageElements.length; i++) {
    document
      .getElementsByClassName("column")
      [i % 3].appendChild(imageElements[i]);
  }
}
