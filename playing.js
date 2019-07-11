function Playing() {
  this.game = new Game();
  this.solvedPuzzles = 0;
  this.timer = 0;

  this.setTimer = function(){
    setInterval(() => {
      this.timer +=1;
    }, 1000);
  }

  this.setTimer();
}


