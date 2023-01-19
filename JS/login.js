document.getElementById("test-button").addEventListener("click", function () {
  location.href = "../pass_gen.html";
});

master = [];

var clicks = [];
function handleClick(id) {
  clicks.push(id);
  localStorage.setItem("clicks", JSON.stringify(clicks));
}
