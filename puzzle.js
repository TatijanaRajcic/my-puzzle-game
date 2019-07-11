function Puzzle () {
  this.canvas = document.getElementById('puzzle');
  this.ctx = this.canvas.getContext('2d');
  this.img = new Image();
  this.pieces = [];
  
  this.setUpImg = function(){
    let randomNum = Math.floor(Math.random() * 10) + 1 ;
    this.img.src = 'images/collage'+`${randomNum}`+'.jpg';
    $("#clue-img").attr("src",'images/collage'+`${randomNum}`+'.jpg');
  }

  this.setUpCanvas = function(){
    this.canvas.width = this.img.width*2;
    this.canvas.height = this.img.height;
  }

  // drawing the puzzle pieces
  this.createPuzzle = function(columns,rows){  

    this.pieces = [];
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
    return this.pieces;
  };

  this.shufflePuzzle = function(columns,rows) {

    var arrayOfIndexes = [];
    for (let j=0; j<rows; j++) {
      for (let i=0; i<columns; i++) {
        arrayOfIndexes.push([i,j]);
      }
    } 

    var m = arrayOfIndexes.length, t, i;
    
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = arrayOfIndexes[m];
      arrayOfIndexes[m] = arrayOfIndexes[i];
      arrayOfIndexes[i] = t;
    }
  
    return arrayOfIndexes;
  }

  this.drawPuzzle = function(puzzle,columns,rows) {

    var reshuffledArrayOfIndexes = this.shufflePuzzle(columns,rows);

    for(let i = 0; i < puzzle.length; i++) {
      
      let op = puzzle[i].sprite
      let cp = puzzle[i].currentPosition
      let newCoordinates = reshuffledArrayOfIndexes[i];

      cp.x = this.img.width + op.width*newCoordinates[0]; 
      cp.y = op.height*newCoordinates[1];

      this.ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
      this.ctx.fillRect(op.x, op.y, op.width, op.height)
      this.ctx.drawImage(this.img, op.x, op.y, op.width, op.height, cp.x, cp.y, op.width, op.height)
    }

  };

}


