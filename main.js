var playing = new Playing()

$("#record-puzzles").html(3);
$("#record-time").html(30);
var recordPuzzle = $("#record-puzzles").html();
var recordTime = $("#record-time").html();

// FUNCTIONS I USE FOR DOM MANIPULATION

function showHideClue() {
  $("#puzzle").toggleClass("invisible");
  $("#clue-img").toggleClass("invisible");
  $("#message-instructions-one").toggleClass("not-shown");
  $("#message-instructions-two").toggleClass("not-shown");
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

// THE TIMER

setInterval(() => {
  $("#counter").html(playing.timer);
  if(playing.timer > recordTime){
    showHideContent();
    restartAndDraw();
    $("#games").html(playing.solvedPuzzles);
  }
});

// THE PUZZLE

$("#puzzle").on( "click", function(e) {

  playing.game.clicks +=1;

  // get the position where we clicked
  var clickX = e.pageX;
  var clickY = e.pageY;
  clickX -= $(this).offset().left;
  clickY -= $(this).offset().top;

  if (playing.game.checkClickPuzzle(clickX,clickY) === true) {
    $("#message-instructions-one").toggleClass("invisible");
    $("#message-instructions-two").toggleClass("invisible");
  }

  if (playing.game.checkClickCanvas(clickX,clickY) === true){
    $("#message-instructions-one").toggleClass("invisible");
    $("#message-instructions-two").toggleClass("invisible");
  }
  
  if (playing.game.checkIfFinished() === true){
    playing.solvedPuzzles +=1;
    setTimeout(function(){
      $("#games").html(playing.solvedPuzzles);
      $("#number-pieces").val("50");
      playing.gainLife();
      drawLives();
    },1000)

    // CHECK IF WINNER
    if (playing.timer <= recordTime && playing.solvedPuzzles >= recordPuzzle) {
      showHideContentWinner();
      $("#user-record").html(playing.solvedPuzzles);
      $("#user-time").html(playing.timer);
    }
  };

});

// NEW PLAYING

$("#new-play-looser").on("click", function(){
  showHideContent();
  restartAndDraw();
  $("#games").html(playing.solvedPuzzles);
});

$("#new-play-winner").on("click", function(){
  showHideContentWinner()
  restartAndDraw();
  $("#games").html(playing.solvedPuzzles);
});
