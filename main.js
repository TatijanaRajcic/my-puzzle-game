var canvas = document.getElementById('puzzle');
var ctx = canvas.getContext('2d');

var img = new Image();
img.src = 'collage1.jpg'; 

img.addEventListener('load', function() {
  
  // image dimensions
  var widthImg = img.width;
  var heightImg = img.height;

  // canvas dimensions
  canvas.width = widthImg * 2;
  canvas.height = heightImg;

  // drawing the puzzle pieces
  function createPuzzle(columns,rows) {

    var width = widthImg/columns; //the number of pieces horizontally
    var height = heightImg/rows; //the number of pieces vertically
    var puzzle = [];

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
         
         puzzle.push(puzzlePiece)
      }
    }

    return puzzle
  }

  function drawPuzzle(puzzle) {


    for(let i = 0; i < puzzle.length; i++) {
      
      let op = puzzle[i].sprite
      let cp = puzzle[i].currentPosition
  
      cp.x = (cp.x * Math.random()) + widthImg
      cp.y *= Math.random() 
      ctx.drawImage(img, op.x, op.y, op.width, op.height, cp.x, cp.y, op.width, op.height)
    }
  
  }

  let puzzle = createPuzzle(5,7);
  drawPuzzle(puzzle)

  document.addEventListener("click", function(event){
     debugger 
    puzzle.forEach(puzzle)
  })
  debugger





}, false);


