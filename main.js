var myPuzzle = new Puzzle(); 
myPuzzle.launchPuzzle();

$( "#puzzle" ).on( "click", function(e) {
  var clickX = e.pageX;
  var clickY = e.pageY;
  var clicksOnPuzzlePieces = [];
  var pieceSelected;

  myPuzzle.clicks +=1;


  for (let i=0; i<myPuzzle.pieces.length;i++) {
    if (myPuzzle.pieces[i].currentPosition.x < clickX 
      && clickX < myPuzzle.pieces[i].currentPosition.x + myPuzzle.pieces[i].sprite.width
      && myPuzzle.pieces[i].currentPosition.y < clickY 
      && clickY < myPuzzle.pieces[i].currentPosition.y + myPuzzle.pieces[i].sprite.height) {
      // that means that the user selected one piece of puzzle
      console.log("!!!!!!!! THIS PIECE WAS SELECTED !!!!!!!!!!!!!")
      clicksOnPuzzlePieces.push(myPuzzle.pieces[i].sprite.position);
    } else {
      console.log("THIS PIECE WAS NOT SELECTED")
    }
  }

  console.log("total clicks "+myPuzzle.clicks)
  console.log(clicksOnPuzzlePieces)

  if (myPuzzle.clicks.length % 2 === 0) {
    if (myPuzzle.pieces[i].sprite.x < clickX 
      && clickX < myPuzzle.pieces[i].sprite.x + myPuzzle.pieces[i].sprite.width
      && myPuzzle.pieces[i].sprite.y < clickY 
      && clickY < myPuzzle.pieces[i].sprite.y + myPuzzle.pieces[i].sprite.height) {
      // that means that the user selected one piece of puzzle
      console.log("piece well placed");
    } else {
      console.log("piece not well placed")
    } 

  } else {
    console.log("don't do nothing");
  }
});



$('#draggable').draggable(); 

/* $( "body" ).on( "drag", function(e,ui) {
  var dragX = e.pageX;
  var dragY = e.pageY;
  console.log("X: "+dragX+" Y: "+dragY);
  function moveImg() {
    myPuzzle.ctx.clearRect(dragX,dragY,150,150); 
    myPuzzle.ctx.drawImage(myPuzzle.img, 0, 0, 150, 150, dragX, dragY, 150, 150);
  };
  moveImg();
}); */

/* TO READ: http://www.java2s.com/Tutorials/Javascript/Canvas_How_to/Image/Move_image_with_keyboard_arrow_key.htm */

/* give some DIV the same coordinates as the puzzle pieces (like a background), give them a draggable class, and create divs for the grid, as droppable,
and compare their coordinates, to see if they matches. utiliser l'aimant pr faciliter la chose */