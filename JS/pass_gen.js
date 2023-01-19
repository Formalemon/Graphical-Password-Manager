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

function generatePassword(length, numLower, numUpper, numDigits, numSpecial) {
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
