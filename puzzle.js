function Puzzle () {
  let fixThis = this;
  this.canvas = document.getElementById('puzzle');
  this.ctx = this.canvas.getContext('2d');
  this.img = new Image();
  this.pieces = [];
  this.shuffledCoordinates = [];
  this.clicks = 0;

  this.setUpImg = function(){
    this.img.src = 'collage4.jpg';
    // prompt user input/choice
  }

  this.setUpCanvas = function(){
    this.canvas.width = this.img.width *2;
    this.canvas.height = this.img.height;
  }

  // drawing the puzzle pieces
  this.createPuzzle = function(columns,rows){  

    var width = (this.canvas.width/2)/columns; //the number of pieces horizontally / we divide by 2 so that we have the right number of pieces horizontally
    var height = this.canvas.height/rows; //the number of pieces vertically

    for (let i=0; i<columns; i++) {
      for (let j=0; j<rows; j++) {

        let puzzlePiece = { 
          sprite: {
              x: i * width,
              y: j * height,
              width: width,
              height: height, 
              position: i+j
          },
          currentPosition: {
              x: i * width,
              y: j * height
          }
        }
        this.pieces.push(puzzlePiece)
      }
    }
    /* console.log(this.pieces); */
    return this.pieces;
  };

  this.drawPuzzle = function(puzzle) {

    for(let i = 0; i < puzzle.length; i++) {
      
      let op = puzzle[i].sprite
      let cp = puzzle[i].currentPosition
  
      cp.x =  (cp.x*Math.random()) + this.img.width;
      cp.y = Math.floor(cp.y*Math.random()); 
/*       cp.x =  cp.x + this.img.width;*/      
      this.ctx.drawImage(this.img, op.x, op.y, op.width, op.height, cp.x, cp.y, op.width, op.height)

      this.shuffledCoordinates.push({x: cp.x, y: cp.y, width: op.width, height: op.height}); /* do i need that since i have it in the object? */
    }

    return this.shuffledCoordinates;
  };

  this.movePiece = function() {
    let clicksCoordinates = [];
    $(document).on("click", function(e){
      var x = e.clientX;
      var y = e.clientY;
      clicksCoordinates.push({mousex: x, mousey:y})
      console.log(clicksCoordinates);
    })


  }

  this.launchPuzzle = function() {
    this.setUpImg();
    this.img.addEventListener("load", function(){
      fixThis.setUpCanvas();
      fixThis.drawPuzzle(fixThis.createPuzzle(4,3)); 
    });
    this.movePiece();
  }
}