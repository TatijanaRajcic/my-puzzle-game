function Game () {
  this.puzzle = new Puzzle();
  let myPuzzle = this.puzzle;
  let myGame = this;
  this.clicks = 0;
  this.clickedPieces = [];
  this.foundPieces = 0;

  this.start = function(columns,rows) {
    this.puzzle.setUpImg();
    this.clicks = 0;
    this.clickedPieces = [];
    this.foundPieces = 0;
    this.puzzle.img.addEventListener("load", function(){
      myPuzzle.setUpCanvas();
      myPuzzle.drawPuzzle(myPuzzle.createPuzzle(columns,rows),columns,rows); 
    });
  };

  this.restart = function(difficulty) {
    this.puzzle.ctx.clearRect(0,0,this.puzzle.canvas.width,this.puzzle.canvas.height);
    this.start(difficulty,difficulty);
    this.checkForDifficulty(difficulty);
  }

  this.checkForDifficulty = function(difficulty) {

    if (difficulty === 1) {
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
        myGame.restart(3);
      },1500)
    }
  }

  this.checkClickPuzzle = function(mouseX,mouseY) {

    for (let i=0; i<this.puzzle.pieces.length;i++) {
  
      var originalP = this.puzzle.pieces[i].sprite;
      var currentP = this.puzzle.pieces[i].currentPosition;
  
      if (currentP.x < mouseX && mouseX < currentP.x + originalP.width 
        && currentP.y < mouseY && mouseY < currentP.y + originalP.height) {  
        this.clickedPieces.push(originalP.position);
        return true
      } 
    }
  
  }
  
  this.checkClickCanvas = function(mouseX,mouseY) {
  
    if (mouseX < this.puzzle.img.width && mouseY < this.puzzle.canvas.height) {
    
      var indexClickedPiece = this.clickedPieces[this.clickedPieces.length - 1] - 1;
      var currentPiece = this.puzzle.pieces[indexClickedPiece];
  
      if (currentPiece.sprite.x < mouseX && mouseX < currentPiece.sprite.x + currentPiece.sprite.width
        && currentPiece.sprite.y < mouseY && mouseY < currentPiece.sprite.y + currentPiece.sprite.height) {
    
        this.puzzle.ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        this.puzzle.ctx.fillRect(currentPiece.currentPosition.x, currentPiece.currentPosition.y, currentPiece.sprite.width, currentPiece.sprite.height)
        
        let ratioX = this.puzzle.img.naturalWidth / this.puzzle.img.width;
        let ratioY = this.puzzle.img.naturalHeight / this.puzzle.img.height;

        this.puzzle.ctx.drawImage(this.puzzle.img, currentPiece.sprite.x*ratioX, currentPiece.sprite.y*ratioY, currentPiece.sprite.width*ratioX, currentPiece.sprite.height*ratioY,currentPiece.sprite.x, currentPiece.sprite.y, currentPiece.sprite.width, currentPiece.sprite.height)
        
        this.foundPieces +=1;
  
        return true
      } 
    } 
  } 

  this.checkIfFinished = function(){
    if (this.foundPieces === this.puzzle.pieces.length) {
        setTimeout(function(){
        myGame.restart(3);
      },1000)
    return true
    }
  }

  this.start(3,3);
}
