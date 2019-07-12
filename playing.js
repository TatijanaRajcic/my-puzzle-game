function Playing() {
  this.game = new Game();
  this.solvedPuzzles = 0;
  this.timer = 0;
  this.lives = 8;
  var playing = this;
  this.countDownRef;


  this.looseLife = function() {
    this.lives -=1;
  }

  this.gainLife = function(){
    this.lives +=1;
  }


  this.ultimateLost = function() {
    if (this.lives <= 0) {
      clearInterval(playing.countDownRef);
      return "looser";
    }
  }

  this.restart = function() {
    this.game = new Game();
    this.solvedPuzzles = 0;
    this.timer = 0;
    this.lives = 8;
  }

  this.countingUp = function(){
    playing.timer +=1;
    if(playing.timer > recordTime){
      clearInterval(playing.countDownRef)
      showHideContent();
      restartAndDraw();
      $("#games").html(playing.solvedPuzzles);
    }
    $("#counter").html(playing.timer);
  }
  this.countDownRef = setInterval(this.countingUp,1000);


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
        clearInterval(playing.countDownRef);
      }
    };
  
  });
}


