var myPuzzle = new Puzzle(); 
myPuzzle.launchDefaultPuzzle();


// NUMBER OF PUZZLE PIECES

$("#number-pieces").on("click", function() {
  var difficulty = $(this).val();

  if (difficulty > 66) {
    difficulty = 6;
  } else if (difficulty > 33 ) {
    difficulty = 3;
  } else {
    difficulty = 2;
  }

  myPuzzle = new Puzzle();
  myPuzzle.launchNewPuzzle(difficulty,difficulty)
})

// CHOOSE ANOTHER PUZZLE

$("#other-game").on("click", function() {
  myPuzzle = new Puzzle();
  myPuzzle.launchDefaultPuzzle();
})

// THE CLUE

$("#clue").on("click", function(){
  $("#puzzle").toggleClass("invisible");
  $("#clue-img").toggleClass("invisible");
  $("#message-instructions-one").toggleClass("hidden");
  setTimeout(function(){
    $("#puzzle").toggleClass("invisible");
    $("#clue-img").toggleClass("invisible");
  },1000)
  $("#message-instructions-one").toggleClass("hidden");
})

// TOTAL PUZZLES SOLVED
var solvedPuzzles = 0;
$("#games").html(solvedPuzzles);

// THE PUZZLE

$( "#puzzle" ).on( "click", function(e) {

  myPuzzle.clicks +=1;

  // get the position where we clicked
  var clickX = e.pageX;
  var clickY = e.pageY;
  clickX -= $(this).offset().left;
  clickY -= $(this).offset().top;

  // for every puzzle piece: check if the location we cliked matches one of their current position
  for (let i=0; i<myPuzzle.pieces.length;i++) {

    var originalP = myPuzzle.pieces[i].sprite;
    var currentP = myPuzzle.pieces[i].currentPosition;

    // if the user clicked on a puzzle piece, we store it 
    if (currentP.x < clickX && clickX < currentP.x + originalP.width
      && currentP.y < clickY && clickY < currentP.y + originalP.height) {

        console.log("the selected sprite :"+ originalP.position)
        $("#message-instructions-one").toggleClass("hidden");
        $("#message-instructions-two").toggleClass("hidden");

        myPuzzle.clickedPieces.push(originalP.position);
    } 
  }

  // if the user clicked on the empty canvas
  if (clickX < myPuzzle.img.width && clickY < myPuzzle.canvas.height) {
    
    // first, we retrieve the position of the last clicked piece of puzzle
    var indexClickedPiece = myPuzzle.clickedPieces[myPuzzle.clickedPieces.length - 1] - 1;

    // that will be our current Puzzle Piece. We are going to compare its original position to where the user just clicked on the canvas
    var currentPiece = myPuzzle.pieces[indexClickedPiece];

    // if the user positionned its puzzle piece where it should be
    if (currentPiece.sprite.x < clickX && clickX < currentPiece.sprite.x + currentPiece.sprite.width
      && currentPiece.sprite.y < clickY && clickY < currentPiece.sprite.y + currentPiece.sprite.height) {

      console.log("piece well placed");
      $("#message-instructions-one").toggleClass("hidden");
      $("#message-instructions-two").toggleClass("hidden");

      // we fill the empty rectangle with color on the right side of the canvas
      myPuzzle.ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
      myPuzzle.ctx.fillRect(currentPiece.currentPosition.x, currentPiece.currentPosition.y, currentPiece.sprite.width, currentPiece.sprite.height)
     
      // we draw the original puzzle piece on the left side of the canvas  
      myPuzzle.ctx.drawImage(myPuzzle.img, currentPiece.sprite.x, currentPiece.sprite.y, currentPiece.sprite.width, currentPiece.sprite.height,currentPiece.sprite.x, currentPiece.sprite.y, currentPiece.sprite.width, currentPiece.sprite.height)
      myPuzzle.foundPieces +=1;

      if (myPuzzle.foundPieces === myPuzzle.pieces.length) {
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

  if (myPuzzle.foundPieces === myPuzzle.pieces.length) {
    myPuzzle.finishPuzzle();
    solvedPuzzles+=1;
      setTimeout(function(){
      myPuzzle = new Puzzle();
      myPuzzle.launchDefaultPuzzle();
    },1000)
  }

});




