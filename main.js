var myPuzzle = new Puzzle(); 
myPuzzle.launchDefaultPuzzle();

$( "#puzzle" ).on( "click", function(e) {
  var clickX = e.pageX;
  var clickY = e.pageY;

  var testDiv = document.getElementById("puzzle");

  // problem with line 87 in puzzle.js when I set style.css 
  clickX -= testDiv.offsetLeft;
  clickY -= testDiv.offsetTop;

  myPuzzle.clicks +=1;

  for (let i=0; i<myPuzzle.pieces.length;i++) {

    var originalP = myPuzzle.pieces[i].sprite;
    var currentP = myPuzzle.pieces[i].currentPosition;

// CHANGE THIS PART OF THE CODE SO THAT IT WORKS EVEN IF THE USER DOES NOT CLICK ON A PIECE FIRST

    // if the user's first click selects a piece
    if (currentP.x < clickX && clickX < currentP.x + originalP.width
      && currentP.y < clickY && clickY < currentP.y + originalP.height) {
        console.log("the selected sprite :"+ originalP.position)
        // we store the reference of the selected puzzle piece
        myPuzzle.clickedPieces.push(originalP.position);

        myPuzzle.ctx.beginPath();
        myPuzzle.ctx.strokeStyle="red";   
        myPuzzle.ctx.lineWidth="2";   
        myPuzzle.ctx.rect(currentP.x+1, currentP.y+1, originalP.width-4, originalP.height-4);
        myPuzzle.ctx.stroke();
    } 

  }
  console.log(myPuzzle.clickedPieces)

// CHANGE THIS PART OF THE CODE SO THAT IT WORKS EVEN IF THE USER CLICKS TWICE NOT ON A PIECE

// CHANGE THIS PART SO THAT THE USER, ONCE WE CLICKED ON A IMAGE, CAN CLICK ON SEVERAL LOCATIONS UNTIL HE FINDS THE RIGHT ONE


  // the user should first click on a puzzle piece and then to an empty space on the canvas
  // therefore, we should compare the coordinates of the selected piece puzzle and the selected space at every 2 clicks
  if (myPuzzle.clicks % 2 === 0) {
    
    // first, we retrieve the position of the last clicked piece of puzzle
    var indexClickedPiece = myPuzzle.clickedPieces[myPuzzle.clickedPieces.length - 1] - 1;

    // that will be our current Puzzle Piece. We are going to compare its original position to where the user just clicked on the canvas
    var currentPiece = myPuzzle.pieces[indexClickedPiece];

    // if the user positionned its puzzle piece where it should be
    if (currentPiece.sprite.x < clickX && clickX < currentPiece.sprite.x + currentPiece.sprite.width
      && currentPiece.sprite.y < clickY && clickY < currentPiece.sprite.y + currentPiece.sprite.height) {
      console.log("piece well placed");
      myPuzzle.ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
      myPuzzle.ctx.fillRect(currentPiece.currentPosition.x, currentPiece.currentPosition.y, currentPiece.sprite.width, currentPiece.sprite.height)
      myPuzzle.ctx.drawImage(myPuzzle.img, currentPiece.sprite.x, currentPiece.sprite.y, currentPiece.sprite.width, currentPiece.sprite.height,currentPiece.sprite.x, currentPiece.sprite.y, currentPiece.sprite.width, currentPiece.sprite.height)
      myPuzzle.foundPieces +=1;

      if (myPuzzle.foundPieces === 9) {
        myPuzzle.finishPuzzle();
      }
    } else {
      // if the user did not position its puzzle piece at the right place
      console.log("piece not well placed")
      // ADD A SOUND TO SHOW THAT'S IT'S NOT THE RIGHT LOCATION
      
    } 
  } else {
    console.log("not comparing")
  }
});

$("#number-pieces").on("click", function() {
  var difficulty = $(this).val();
  console.log(difficulty)
  if (difficulty > 66) {
    difficulty = 6;
  } else if (difficulty > 33 ) {
    difficulty = 3;
  } else {
    difficulty = 2;
  }
 
  // ISSUES WITH UPLOADS OF NEW PUZZLES
  /* myPuzzle.ctx.clearRect(0,0,myPuzzle.canvas.width,myPuzzle.canvas.height); */
  myPuzzle.launchNewPuzzle(difficulty,difficulty); 
  
})

// REVOIR LE SE TIMEOUT

$("#clue").on("click", function(){
  var idTimeout = setTimeout(function(){
    $("#puzzle").toggleClass("invisible");
    $("#clue-img").toggleClass("invisible");
  },1000)
})




