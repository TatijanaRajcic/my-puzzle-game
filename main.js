var playing = new Playing()

$("#record-puzzles").html(2);
$("#record-time").html(30);
var recordPuzzle = $("#record-puzzles").html();
var recordTime = $("#record-time").html();

// FUNCTIONS I USE FOR DOM MANIPULATION

function showHideClue() {
  $("#puzzle").toggleClass("invisible");
  $("#clue-img").toggleClass("invisible");
}

function showHideContent() {
  $(".user-input-container").toggleClass("hide");
  $(".message-container").toggleClass("invisible");
  $(".creative-container").toggleClass("invisible");
  $(".final-message-container").toggleClass("invisible");  
  $(".final-message-container").toggleClass("flex");
}

function showHideContentWinner() {
  $(".user-input-container").toggleClass("hide");
  $(".message-container").toggleClass("invisible");
  $(".creative-container").toggleClass("invisible");
  $(".winner-message-container").toggleClass("flex");
}

function drawLives() {
  $('.lives-container img').remove();
  for (i=0;i<playing.lives; i++) {
    $("<img />").attr('src', "images/heart.png").appendTo($(".lives-container"))
  }
}

drawLives();

function restartAndDraw() {
  playing.restart();
  drawLives();
}

// CHOICE OF PUZZLE DIFFICULTY

$("#number-pieces").on("click", function() {
  var difficulty = $(this).val();
  if (difficulty > 88) {
    difficulty = 1;
  } else if (difficulty > 66) {
    difficulty = 2;
  } else if (difficulty > 42) {
    difficulty = 3;
  } else if (difficulty > 33 ) {
    difficulty = 5;
  } else if (difficulty > 5) {
    difficulty = 7;
  } else {
    difficulty = 9;
  }
  playing.game.restart(difficulty);
})

// CHOOSE ANOTHER PUZZLE

$("#other-game").on("click", function() {
  $("#number-pieces").val("50");
  playing.game.restart(3);
})

// THE CLUE

$("#clue").on("click", function(){
  /* Showing the clue image */
  showHideClue();
  /* loose one life */
  playing.looseLife();
  drawLives();
  /* hidding the clue image */
  setTimeout(function(){
    showHideClue();
  },1000)
  /* when you click on the last clue and loose all your lives */
  if (playing.ultimateLost() === "looser") {
    showHideContent();
  }
})

// NEW PLAYING

$("#new-play-looser").on("click", function(){
  showHideContent();
  restartAndDraw();
  playing.countDownRef = setInterval(playing.countingUp,1000);
  $("#games").html(playing.solvedPuzzles);
});

$("#new-play-winner").on("click", function(){
  showHideContentWinner()
  restartAndDraw();
  playing.countDownRef = setInterval(playing.countingUp,1000);
  $("#games").html(playing.solvedPuzzles);
});
