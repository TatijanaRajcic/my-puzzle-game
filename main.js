function Puzzle () {
  let fixThis = this;
  this.canvas = document.getElementById('puzzle');
  this.ctx = this.canvas.getContext('2d');
  this.img = new Image();
  this.pieces = [];

  this.setUpImg = function(){
    this.img.src = 'collage1.jpg';
    // prompt user input/choice
    debugger
  }

  this.setUpCanvas = function(){
    this.canvas.width = this.img.width *2;
    this.canvas.height = this.img.height;
    debugger
  }

  // drawing the puzzle pieces
  this.createPuzzle = function(columns,rows){  

    var width = this.canvas.width/columns; //the number of pieces horizontally
    var height = this.canvas.height/rows; //the number of pieces vertically

    for (let i=0; i<columns; i++) {
      for (let j=0; j<rows; j++) {

        let puzzlePiece = { 
          sprite: {
              x: i * width,
              y: j * height,
              width: width,
              height: height
          },
          currentPosition: {
              x: i * width,
              y: j * height
          }
        }
        this.pieces.push(puzzlePiece)
      }
    }
    console.log(this.pieces);
    return this.pieces;
  };

  this.drawPuzzle = function(puzzle) {

    for(let i = 0; i < puzzle.length; i++) {
      
      let op = puzzle[i].sprite
      let cp = puzzle[i].currentPosition
  
      cp.x = (cp.x * Math.random()) + this.img.width
      cp.y *= Math.random() 
      this.ctx.drawImage(this.img, op.x, op.y, op.width, op.height, cp.x, cp.y, op.width, op.height)
    }

  };

  this.launchPuzzle = function() {
    this.setUpImg();
    this.img.addEventListener("load", function(){
      fixThis.setUpCanvas();
      fixThis.drawPuzzle(fixThis.createPuzzle(2,3));
    });
  }
}

var myPuzzle = new Puzzle(); 
myPuzzle.launchPuzzle();