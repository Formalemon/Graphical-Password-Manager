var clickedImages = [];

for (let i = 1; i <= 9; i++) {
  document.getElementById(i).addEventListener("click", function () {
    clickedImages.push(i);
  });
}

document.getElementById("signup-button").onclick = (e) => {
  location.href = "../index.html";
};
