var clickedImages = [];

for (let i = 1; i <= 9; i++) {
  document.getElementById(i).addEventListener("click", function () {
    clickedImages.push(i);
  });
}

document.getElementById("signup-button").onclick = (e) => {
  saveData(clickedImages);
  location.href = "../index.html";
};

function saveData(data) {
  chrome.runtime.sendMessage(
    { action: "smp", data: data },
    function (response) {
      console.log(response.status);
    }
  );
}