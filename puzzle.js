function Puzzle () {
  this.canvas = document.getElementById('puzzle');
  this.ctx = this.canvas.getContext('2d');
  this.img = new Image();
  this.pieces = [];
  
  this.setUpImg = function(){
    let randomNum = Math.floor(Math.random() * 10) + 1 ;

    if (document.documentElement.clientWidth<500) {
      this.img.width = document.documentElement.clientWidth/2;
      // this.img.style.height = "auto"
    }
    this.img.src = 'images/collage'+`${randomNum}`+'b.jpg';
    $("#clue-img").attr("src",'images/collage'+`${randomNum}`+'b.jpg');
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

      let ratioX = this.img.naturalWidth / this.img.width;
      let ratioY = this.img.naturalHeight / this.img.height;
      
      this.ctx.drawImage(this.img, op.x*ratioX, op.y*ratioY, op.width*ratioX, op.height*ratioY, cp.x, cp.y, op.width, op.height)
      // pbm ici car op.width et op.height vont récupérer par ex 33px*33px (si l'on a indiqué comme dimensions 100*100) sur la grande image qui elle fait plus que 100*100
    }

  };

}