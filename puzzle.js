function Puzzle () {
  let fixThis = this;
  this.canvas = document.getElementById('puzzle');
  this.ctx = this.canvas.getContext('2d');
  this.img = new Image();
  this.pieces = [];
  this.clicks = 0;

  this.setUpImg = function(){
    this.img.src = 'collage1.jpg';
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
    var count = 0;

    for (let j=0; j<rows; j++) {
      for (let i=0; i<columns; i++) {
        count +=1;
        let puzzlePiece = { 
          sprite: {
              x: i * width,
              y: j * height,
              width: width,
              height: height, 
              position: count
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

  this.drawPuzzle = function(puzzle,columns,rows) {

    var normalArrayOfIndexes = [];

    for (let j=0; j<rows; j++) {
      for (let i=0; i<columns; i++) {
        normalArrayOfIndexes.push([i,j]);
      }
    } 

    function shuffle(array) {
      var m = array.length, t, i;
    
      // While there remain elements to shuffle…
      while (m) {
    
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
    
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
    
      console.log(normalArrayOfIndexes)
      return array;
    }

    shuffle(normalArrayOfIndexes);

    for(let i = 0; i < puzzle.length; i++) {
      
      let op = puzzle[i].sprite
      let cp = puzzle[i].currentPosition
      let newCoordinates = normalArrayOfIndexes[i];

      cp.x = this.img.width + op.width*newCoordinates[0];
      cp.y = op.height*newCoordinates[1];

      this.ctx.drawImage(this.img, op.x, op.y, op.width, op.height, cp.x, cp.y, op.width, op.height)

    }
  };

  this.movePiece = function() {
    let clicksCoordinates = [];
    $(document).on("click", function(e){
      var x = e.clientX;
      var y = e.clientY;
      clicksCoordinates.push({mousex: x, mousey:y})
    })

  }

  this.launchPuzzle = function() {
    this.setUpImg();
    this.img.addEventListener("load", function(){
      fixThis.setUpCanvas();
      fixThis.drawPuzzle(fixThis.createPuzzle(3,3),3,3); 
    });
    this.movePiece();
  }
}