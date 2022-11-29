let testArr = [];
let score = 1;
let checkArr = [];
let randomValue = 0;
const redAudio = new Audio("sounds/red.mp3");
const yellowAudio = new Audio("sounds/yellow.mp3");
const blueAudio = new Audio("sounds/blue.mp3");
const greenAudio = new Audio("sounds/green.mp3");
const wrongAudio = new Audio("sounds/wrong.mp3");
const displayScore = function (score) {
  $(".label-message").html(`Score : ${score}`);
};
const displayHighScore = function (highscore) {
  $(".highscore").html(String(highscore));
};

function playSound(color) {
  switch (color) {
    case "red":
    case 1:
      redAudio.play();
      break;
    case "yellow":
    case 2:
      yellowAudio.play();
      break;
    case "blue":
    case 3:
      blueAudio.play();
      break;
    case "green":
    case 4:
      greenAudio.play();
      break;
    default:
      wrongAudio.play();
      break;
  }
}
function gameInit() {
  testArr = [];
  checkArr = [];
  displayScore("Press any key to start!");
  $(document).keypress(function () {
    pushSecuence();
    displayScore(score);
    $(document).off("keypress");
  });
  if (testArr.length >= checkArr.length) {
    $(".btn").click(function (button) {
      //push into checkARR

      checkArr.push(Number(button.target.classList[1]));
      playSound(button.target.classList[2]);
      console.log(checkArr);

      //check arrays equality
      checkArr.forEach((element, i) => {
        if (element != testArr[i]) youLose();
        else if (testArr.length === checkArr.length) {
          score++;
          displayScore(score);
          nextLevel();
        }
      });
    });
  }
}
function reInit() {
  displayHighScore(score);
  score = 1;
  gameInit();
}
function pushSecuence() {
  randomValue = Math.trunc(Math.random() * 4 + 1);
  testArr.push(randomValue);
  playSound(randomValue);
  $(".btn")[randomValue - 1].classList.add("btn-pressed");
  setTimeout(function () {
    $(".btn")[randomValue - 1].classList.remove("btn-pressed");
  }, 200);
  console.log(testArr);
}

function nextLevel() {
  checkArr = [];
  console.log(score);
  setTimeout(function () {
    pushSecuence();
  }, 1000);
}
function youLose() {
  playSound(wrongAudio);
  $(".btn").off("click");
  reInit();
}
// game init
gameInit();
