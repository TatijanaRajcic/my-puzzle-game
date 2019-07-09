var myPuzzle = new Puzzle(); 
myPuzzle.launchPuzzle();
var clickedPieces = [];

$( "#puzzle" ).on( "click", function(e) {
  var clickX = e.pageX;
  var clickY = e.pageY;

  myPuzzle.clicks +=1;

  for (let i=0; i<myPuzzle.pieces.length;i++) {

    var originalP = myPuzzle.pieces[i].sprite;
    var currentP = myPuzzle.pieces[i].currentPosition;

    // if the user's first click selects a piece
    if (currentP.x < clickX && clickX < currentP.x + originalP.width
      && currentP.y < clickY && clickY < currentP.y + originalP.height) {
        console.log("the selected sprite :"+ originalP.position)
        // we store the reference of the selected puzzle piece
        clickedPieces.push(originalP.position);
    } 
  }
  console.log(clickedPieces)

  // the user should first click on a puzzle piece and then to an empty space on the canvas
  // therefore, we should compare the coordinates of the selected piece puzzle and the selected space at every 2 clicks
  if (myPuzzle.clicks % 2 === 0) {
    
    // first, we retrieve the position of the last clicked piece of puzzle
    var indexClickedPiece = clickedPieces[clickedPieces.length - 1] - 1;

    // that will be our current Puzzle Piece. We are going to compare its original position to where the user just clicked on the canvas
    var currentPiece = myPuzzle.pieces[indexClickedPiece];

    // if the user positionned its puzzle piece where it should be
    if (currentPiece.sprite.x < clickX && clickX < currentPiece.sprite.x + currentPiece.sprite.width
      && currentPiece.sprite.y < clickY && clickY < currentPiece.sprite.y + currentPiece.sprite.height) {
      console.log("piece well placed");
      myPuzzle.ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
      myPuzzle.ctx.fillRect(currentPiece.currentPosition.x, currentPiece.currentPosition.y, currentPiece.sprite.width, currentPiece.sprite.height)
      myPuzzle.ctx.drawImage(myPuzzle.img, currentPiece.sprite.x, currentPiece.sprite.y, currentPiece.sprite.width, currentPiece.sprite.height,currentPiece.sprite.x, currentPiece.sprite.y, currentPiece.sprite.width, currentPiece.sprite.height)
    } else {
      // if the user did not position its puzzle piece at the right place
      console.log("piece not well placed")
    } 
  } else {
    console.log("not comparing")
  }
});