var playing = new Playing()

$("#record-puzzles").html(3);
$("#record-time").html(30);

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
    $("#lazy-img").toggleClass("invisible");
    $("#puzzle").toggleClass("invisible");
    $("#message-cheering").toggleClass("invisible");
    $("#message-instructions-one").toggleClass("not-shown");
    $("#message-instructions-two").toggleClass("not-shown");

    setTimeout(function(){
      $("#lazy-img").toggleClass("invisible");
      $("#puzzle").toggleClass("invisible");
      $("#message-cheering").toggleClass("invisible");
      $("#message-instructions-one").toggleClass("not-shown");
      $("#message-instructions-two").toggleClass("not-shown");
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
  $("#message-instructions-one").toggleClass("not-shown");
  $("#message-instructions-two").toggleClass("not-shown");

  /* loose one life */
  playing.looseLife();
  $('.lives-container img:last-child').remove();

  /* hidding the clue image */
  setTimeout(function(){
    $("#puzzle").toggleClass("invisible");
    $("#clue-img").toggleClass("invisible");
    $("#message-instructions-one").toggleClass("not-shown");
    $("#message-instructions-two").toggleClass("not-shown");
  },1000)

  /* if the life you loose is the last one you had */
  var endOfPlaying = playing.ultimateLost();
  if (endOfPlaying === "looser") {
    $(".user-input-container").toggleClass("hide");
    $(".message-container").toggleClass("invisible");
    $(".creative-container").toggleClass("invisible");
    $(".final-message-container").toggleClass("invisible");  
    $(".final-message-container").toggleClass("flex");
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
      $("<img />").attr('src', "heart.png").appendTo($(".lives-container"))
    },1000)

    // CHECK IF WINNER

    var recordPuzzle = $("#record-puzzles").html();
    var recordTime = $("#record-time").html();

    if (playing.timer <= recordTime && playing.solvedPuzzles >= recordPuzzle) {
      console.log("you're the best!")
      $(".message-container").toggleClass("invisible");
      $(".creative-container").toggleClass("invisible");
      $(".user-input-container").toggleClass("hide");
      $(".winner-message-container").toggleClass("flex");
      $("#user-record").html(playing.solvedPuzzles);
      $("#user-time").html(playing.timer);
    }

  };

});

// NEW PLAYING

$("#new-play-looser").on("click", function(){

  $(".message-container").toggleClass("invisible");
  $(".creative-container").toggleClass("invisible");
  $(".user-input-container").toggleClass("hide");
  $(".final-message-container").toggleClass("flex");
  $(".final-message-container").toggleClass("invisible");

  playing.restart();

  for (i=0;i<playing.lives; i++) {
    $("<img />").attr('src', "heart.png").appendTo($(".lives-container"))
  }

  $("#games").html(playing.solvedPuzzles);

});


$("#new-play-winner").on("click", function(){

  $(".message-container").toggleClass("invisible");
  $(".creative-container").toggleClass("invisible");
  $(".user-input-container").toggleClass("hide");
  $(".winner-message-container").toggleClass("flex");

  playing.restart();

  for (i=0;i<playing.lives; i++) {
    $("<img />").attr('src', "heart.png").appendTo($(".lives-container"))
  }

  $("#games").html(playing.solvedPuzzles);

});