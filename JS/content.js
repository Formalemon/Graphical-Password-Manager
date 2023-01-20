document.getElementById("login-button").addEventListener("click", function () {
  location.href = "login.html";
});
document.getElementById("signup-button").addEventListener("click", function () {
  location.href = "signup.html";
});

// Copy to Clipboard
async function CopyToClip() {
  var copyText = document.getElementById("saved-pass").innerHTML;
  try {
    await navigator.clipboard.writeText(copyText);
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}
