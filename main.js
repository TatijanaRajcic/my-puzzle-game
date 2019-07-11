var playing = new Playing()

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

  var myNewGame = playing.game.restart(difficulty);
  if (myNewGame === "lazy") {
    $("#lazy-img").toggleClass("temp");
    $("#puzzle").toggleClass("invisible");
    $("#message-cheering").toggleClass("temp");
    $("#message-instructions-one").toggleClass("temp");
    $("#message-instructions-two").toggleClass("temp");

    setTimeout(function(){
      $("#lazy-img").toggleClass("temp");
      $("#puzzle").toggleClass("invisible");
      $("#message-cheering").toggleClass("temp");
      $("#message-instructions-one").toggleClass("temp");
      $("#message-instructions-two").toggleClass("temp");
      $("#number-pieces").val("50");
      playing.game.restart(3);
    },1500)
  }
})

// CHOOSE ANOTHER PUZZLE

$("#other-game").on("click", function() {
  $("#number-pieces").val("50");
  playing.game.restart(3);
})

// THE CLUE

$("#clue").on("click", function(){
  /* Showing the clue image */
  $("#puzzle").toggleClass("invisible");
  $("#clue-img").toggleClass("invisible");
  $("#message-instructions-one").toggleClass("hidden");

  /* loose one life */
  playing.looseLife();
  $('.lives-container img:last-child').remove();

  /* hidding the clue image */
  setTimeout(function(){
    $("#puzzle").toggleClass("invisible");
    $("#clue-img").toggleClass("invisible");
  },1000)
  $("#message-instructions-one").toggleClass("hidden");

  /* if the life you loose is the last one you had */
  var endOfPlaying = playing.ultimateLost();
  if (endOfPlaying === "looser") {
    $(".message-container").toggleClass("final-message");
    $(".creative-container").toggleClass("final-message");
    $(".user-input-container").toggleClass("final-message-hide");
    $(".final-message-container").toggleClass("final-message");
  }
})

// THE LIVES

for (i=0;i<playing.lives; i++) {
  $("<img />").attr('src', "heart.png").appendTo($(".lives-container"))
}

// THE TIMER

setInterval(() => {
  $("#counter").html(playing.timer);
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
    $("#message-instructions-one").toggleClass("hidden");
    $("#message-instructions-two").toggleClass("hidden");
  }

  if (playing.game.checkClickCanvas(clickX,clickY) === true){
    $("#message-instructions-one").toggleClass("hidden");
    $("#message-instructions-two").toggleClass("hidden");
  }
  
  if (playing.game.checkIfFinished() === true){
    playing.solvedPuzzles +=1;
    setTimeout(function(){
      $("#games").html(playing.solvedPuzzles);
      $("#number-pieces").val("50");
      playing.gainLife();
      $("<img />").attr('src', "heart.png").appendTo($(".lives-container"))
    },1000)
  };

});

// NEW PLAYING

$("#new-play").on("click", function(){
  playing.restart();
  $(".message-container").toggleClass("final-message");
  $(".creative-container").toggleClass("final-message");
  $(".user-input-container").toggleClass("final-message-hide");
  $(".final-message-container").toggleClass("final-message");

  for (i=0;i<playing.lives; i++) {
    $("<img />").attr('src', "heart.png").appendTo($(".lives-container"))
  }

  $("#games").html(playing.solvedPuzzles);

});
