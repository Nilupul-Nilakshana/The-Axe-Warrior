// Import Sounds
var runSound = new Audio("sounds/run.mp3");
var jumpSound = new Audio("sounds/jump.mp3");
var backgroundSound = new Audio("sounds/background.mp3");
var dieSound = new Audio("sounds/die.mp3");
runSound.loop = true; // loop run sound
backgroundSound.loop = true; // Loop background sound

function backgroundSoundPlay(){
    backgroundSound.play();
}

var startGame = 0; //  is start start or not

// Key Check Function
function keyCheck(event) {
  // Enter Key
  if (event.which == 13) {
    if (runWorkerId == 0) {
      startGame = 1;
      clearInterval(idleWorkerId);
      runWorkerId = setInterval(run, 100);
      backgroundWorkerId = setInterval(moveBackground, 100);
      generateplantId = setInterval(generateplant, 100);
      scoreWorkerId = setInterval(updateScore, 100);
      moveplantId = setInterval(moveplant, 150);

      runSound.play();

      score.style.visibility = "visible";
    }
  }

  //Space Key
  if (event.which == 32) {
    if (startGame == 1) {
      if (jumpWorkerId == 0) {
        clearInterval(runWorkerId);
        runSound.pause();
        jumpSound.play();
        jumpWorkerId = setInterval(jump, 150);
      }
    }
  }

  if(event.which == 77){
    muteSoundsId =  setInterval(muteSounds);
  }
}

// Mute Game Function
var muteSoundsId = 0;
function muteSounds() {
  runSound.pause();
  jumpSound.pause();
  dieSound.pause();
  backgroundSound.pause();
}

// Idle Function
var idleImageCount = 1;
var idleWorkerId = 0;
function idle() {
  idleImageCount++;
  if (idleImageCount == 11) {
    idleImageCount = 1;
  }
  viking.src = "images/idle/idle (" + idleImageCount + ").png";
}

function idleAnimation() {
  idleWorkerId = setInterval(idle, 100);
}

// Run Function
var viking = document.getElementById("viking");
var runImageCount = 0;
var runWorkerId = 0;

function run() {
  runImageCount++;

  if (runImageCount == 11) {
    runImageCount = 1;
  }

  viking.src = "images/run/run (" + runImageCount + ").png";
}

// Jump Function
var jumpImageCount = 1;
var jumpWorkerId = 0;
var vikingMarginTop = 300;
function jump() {
  jumpImageCount++;

  if (jumpImageCount <= 7) {
    vikingMarginTop = vikingMarginTop - 25;
    viking.style.marginTop = vikingMarginTop + "px";
  }

  if (jumpImageCount >= 8) {
    vikingMarginTop = vikingMarginTop + 25;
    viking.style.marginTop = vikingMarginTop + "px";
  }

  if (jumpImageCount == 13) {
    jumpImageCount = 1;
    clearInterval(jumpWorkerId);
    jumpWorkerId = 0;

    runWorkerId = setInterval(run, 100);
    runSound.play();
  }

  viking.src = "images/jump/jump (" + jumpImageCount + ").png";
}

// Move Background Function
var background = document.getElementById("background2");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground() {
  backgroundX = backgroundX - 20;
  background.style.backgroundPositionX = backgroundX + "px";
}

// Generate plant Function
var generateplantId = 0;
var plantMarginLeft = 600;
var plantId = 1;
function generateplant() {
  var plant = document.createElement("div");
  plant.className = "plant";

  plant.id = "plant" + plantId;
  plantId++;

  var gap = Math.random() * (1000 - 400) + 400;
  plantMarginLeft = plantMarginLeft + gap;
  plant.style.marginLeft = plantMarginLeft + "px";

  background.appendChild(plant);
}

// Move plants function
var moveplantId = 0;
function moveplant() {
  for (var i = 1; i <= plantId; i++) {
    var currentplant = document.getElementById("plant" + i);
    var currentMarginLeft = currentplant.style.marginLeft;
    var newMarginLeft = parseInt(currentMarginLeft) - 20;
    currentplant.style.marginLeft = newMarginLeft + "px";

    if ((newMarginLeft <= 221) & (newMarginLeft >= 61)) {
      if (vikingMarginTop > 250) {
        clearInterval(runWorkerId);
        runSound.pause();

        clearInterval(jumpWorkerId);
        jumpSound.pause();
        jumpWorkerId = -1;

        clearInterval(backgroundWorkerId);
        clearInterval(generateplantId);
        clearInterval(moveplantId);
        clearInterval(scoreWorkerId);

        diedWorkerId = setInterval(die, 100);
        dieSound.play();
      }
    }
  }
}

// Update Score Function
var score = document.getElementById("score");
var finalScore = document.getElementById("finalScore");
var newScore = 0;
var scoreWorkerId = 0;
function updateScore() {
  newScore++;
  score.innerHTML = newScore;
}

// Dead Function
var dieImageCount = 1;
var diedWorkerId = 0;
var endScreen = document.getElementById("endScreen");
function die() {
  dieImageCount++;

  if (dieImageCount == 11) {
    dieImageCount = 10;

    viking.style.marginTop = "300px";
    finalScore.innerHTML = newScore;
  }
  viking.src = "images/die/die (" + dieImageCount + ").png";
  endScreen.style.visibility = "visible";
  score.style.visibility = "hidden";
}

// Restart The Game
function restart() {
  location.reload();
}
