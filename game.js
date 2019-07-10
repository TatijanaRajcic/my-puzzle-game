function Game () {
  this.puzzle = new Puzzle();
  let fixThis = this.puzzle;
  this.piecesNumber = 0;

  this.start = function(columns,rows) {
    this.puzzle.setUpImg();
    this.puzzle.img.addEventListener("load", function(){
      fixThis.setUpCanvas();
      fixThis.drawPuzzle(fixThis.createPuzzle(columns,rows),columns,rows); 
    });
  };

  this.restart = function(difficulty) {
    this.puzzle.ctx.clearRect(0,0,this.puzzle.canvas.width,this.puzzle.canvas.height);
    this.start(difficulty,difficulty);
  }

  this.finish = function() {
    setTimeout(function(){ console.log("finished"); }, 500);
  }
}