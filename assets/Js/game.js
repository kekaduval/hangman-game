var gameOn = ['this town', 'paradise', 'vibe', 'ocean eyes', 'love of my life', 'high', 'orbit', 'falls'];
var wordToGuess = ""; //word to guess
var lettersInWord = []; //letters in each word
var correctGuess = []; //letter guessed correctly
var incorrectGuess = []; //letter guessed incorrectly
var wins = 0;
var loss = 0;
var spaces = 0; //spaces in words
var guessesLeft = 12; //guesses user has left
var clue = ['artist is kygo/Sasha sloan', 'Artist is Paloma', 'Artist is franck pierce/famba', 'Artist is Billie Eillish', 'Artist is Edward maya', 'Artist is JPB', 'Artist is Syde/ashe', 'Artist is Odesza/sasha sloan']; //sentence that describes each words
var clueToGuess = ""; //clue associated with wordToGuess

//start/reset Game
function PickWord() {
  guessesLeft =12;
  wordToGuess = gameOn[Math.floor(Math.random() * gameOn.length)];
  lettersInWord = wordToGuess.split("");
  spaces = lettersInWord.length;
  console.log(wordToGuess);
  incorrectGuess = [];
  correctGuess = [];

  //show blank spaces for words
  for (var i = 0; i < spaces; i++) {
    correctGuess.push("_");
  }
  console.log(correctGuess);
  document.getElementById('remainingGuesses').innerHTML = ("Guesses Left: " + guessesLeft);
  document.getElementById('currentWord').innerHTML = ("Current Word: " + correctGuess);
  document.getElementById('UsersGuesses').innerHTML = ("Letters Guessed: " + incorrectGuess);
}

//gives user a hint that is assigned to each wordToGuess; make hint change as wordToGuess changes
function showHint() {
  clueToGuess = clue[Math.floor(Math.random() * clue.length)];
 for (var i = 0; i < clue; i++) {
   if (correctGuess === wordToGuess) {
      clue++;
    }
   clueToGuess.push(" ");
  }
  document.getElementById("hint").innerHTML = ("Hint: " + clueToGuess);
};
console.log(clueToGuess);

//if player guesses correct letter, show letters in spaces and letters guessed
function playerGuesses(letter) {
  var lettersInWord = false;
  for (var i = 0; i < spaces; i++) {
    if (wordToGuess[i] === letter) {
      lettersInWord = true;
    }
  }
  if (lettersInWord) {
    for (var t = 0; t < spaces; t++) {
      if (wordToGuess[t] === letter) {
        correctGuess[t] = letter;
      }

    }
    //if guess is incorrect decrease guessesLeft
  } else {
    incorrectGuess.push(letter);
    guessesLeft--;
  }
}

//if player guesses word before player runs out of guesses .......
function calculate() {
  document.getElementById('remainingGuesses').innerHTML = ("Guesses Left: " + guessesLeft);
  document.getElementById('UsersGuesses').innerHTML = ("Letters Guessed: " + incorrectGuess.join(" "));
  document.getElementById('currentWord').innerHTML = ("Current Word: " + correctGuess.join(" "));
  if (lettersInWord.join("") === correctGuess.join("")) {
    wins++;
    document.getElementById('Wins').innerHTML = ("Wins: " + wins);
    alert('YAAYYYYYY!!!');
    PickWord();
    showHint();
  }
  //if player runs out of guesses before winning add one losses
  else if (guessesLeft === 0) {
    loss++;
    document.getElementById('loss').innerHTML = ("Loses: " + loss);
    alert('Ohh nooo, you lost, please try again');
    PickWord();
    showHint();
  }
}
//call functions
PickWord();
showHint();

//initiate game
document.onkeydown = function(event) {
  var chosenLetter = String.fromCharCode(event.keyCode).toLowerCase();
  console.log(chosenLetter)
  playerGuesses(chosenLetter);
  calculate();
};
