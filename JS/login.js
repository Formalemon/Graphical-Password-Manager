document.getElementById("test-button").addEventListener("click", function () {
  if(JSON.stringify(clickedImages) === JSON.stringify(masterPass)){
    location.href = "../pass_gen.html";
  }
  else{
    clickedImages = [];
    document.getElementById("clicks").innerHTML = "Wrong Password";
  }
});

var masterPass = [1, 5, 9];

var clickedImages = [];

for (let i = 1; i <= 9; i++){
  document.getElementById(i).addEventListener("click", function(){
    clickedImages.push(i);
    document.getElementById("clicks").innerHTML = clickedImages;
  });
}

