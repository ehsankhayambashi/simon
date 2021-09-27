var level = 1;
var patterns = [];
var start = false;
var divNames = ["blue", "green", "red", "yellow"]
var userSelects = [];
var index = 0;

function playSound(audioName) {

  if (audioName == "wrong") {
    audioName = "wrong"
  } else {
    audioName = "blue";
  }

  var audio = new Audio("sounds/" + audioName + '.mp3');
  audio.play();
}

function presssed(wichButton, auto) {

  if (auto) {
    $(wichButton).addClass("touched");
    setTimeout(function() {
      $(wichButton).removeClass("touched");
    }, 500);
  } else {
    $(wichButton).addClass("touched");
    setTimeout(function() {
      $(wichButton).removeClass("touched");
    }, 100);
  }

}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function playPattern() {
  // Sleep in loop
  await sleep(2000);
  for (var i = 0; i < patterns.length; i++) {
    presssed("." + patterns[i], true);

    await sleep(1000);
  }
}

function makePattern() {
  for (var i = 1; i <= level; i++) {
    var randomNum = Math.floor((Math.random() * divNames.length));
    patterns.push(divNames[randomNum]);
  }

  console.log(patterns);
}

function nextLevel() {
  index = 0;
  level++;
  $(".level").text("Level " + level);
  patterns = [];
  makePattern();
  playPattern();
}

$(document).on("keypress", function() {
  if (start === false) {
    $(".level").text("Level " + level);
    makePattern();
    playPattern();
    start = true;
  }
});


$("div").on("click", function() {

  var currentDiv = this.className.split(" ")[0];
  presssed("." + currentDiv, false);
  playSound(currentDiv);

  if (index < patterns.length) {
    //marhale edame dare

    if (currentDiv === patterns[index]) {
      //dorost dorost zade
      index++;
      //tamame pattern ha check shode
      if (index === patterns.length) {
        nextLevel();
      }
    } else {
      //karbar eshteba zade GameOver
      playSound("wrong");
      $(".level").text("Game Over you Complete " + (level - 1) + " level");
    }
  } else {
    //marhale tamum shode
    nextLevel();
  }


});
