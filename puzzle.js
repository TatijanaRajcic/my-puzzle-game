function Puzzle () {
  let fixThis = this;
  this.canvas = document.getElementById('puzzle');
  this.ctx = this.canvas.getContext('2d');
  this.img = new Image();
  this.pieces = [];
  this.clicks = 0;
  this.clickedPieces = [];
  this.foundPieces = 0;
  this.time = 1;
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)

  // AJOUTER UN CHRONO
  
  this.setUpImg = function(){
    let randomNum = Math.floor(Math.random() * 6) + 1 ;
    this.img.src = 'collage'+`${randomNum}`+'.jpg';
    $("#clue-img").attr("src",'collage'+`${randomNum}`+'.jpg');
    /* this.img.height = "200"; */
  }

  this.setUpCanvas = function(){
    this.canvas.width = this.img.width*2;
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

  this.shuffle = function(array) {
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
  
    return array;
  }

  this.drawPuzzle = function(puzzle,columns,rows) {

    var normalArrayOfIndexes = [];
    for (let j=0; j<rows; j++) {
      for (let i=0; i<columns; i++) {
        normalArrayOfIndexes.push([i,j]);
      }
    } 
    this.shuffle(normalArrayOfIndexes);

    for(let i = 0; i < puzzle.length; i++) {
      
      let op = puzzle[i].sprite
      let cp = puzzle[i].currentPosition
      let newCoordinates = normalArrayOfIndexes[i];

      cp.x = this.img.width + op.width*newCoordinates[0]; 
      // problem with lin 11 in main.js when I set style.css

      cp.y = op.height*newCoordinates[1];

      this.ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
      this.ctx.fillRect(op.x, op.y, op.width, op.height)
      this.ctx.drawImage(this.img, op.x, op.y, op.width, op.height, cp.x, cp.y, op.width, op.height)
    }
  };

  this.counter = function() {
    setInterval(() => {
      this.time +=1;
    }, 1000);
  }

  this.launchPuzzle = function(columns,rows) {
    this.setUpImg();
    this.img.addEventListener("load", function(){
      fixThis.setUpCanvas();
      fixThis.counter();
      fixThis.drawPuzzle(fixThis.createPuzzle(columns,rows),columns,rows); 
    });
  }

  this.launchDefaultPuzzle = function(){
    this.launchPuzzle(3,3);
  }

  this.launchNewPuzzle = function(difficulty) {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.launchPuzzle(difficulty,difficulty)
  }


  this.finishPuzzle = function() {
    setTimeout(function(){ console.log("finished"); }, 500);
  }

}


