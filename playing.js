function Playing() {
  this.game = new Game();
  this.solvedPuzzles = 0;
  this.timer = 0;
  this.lives = 7;


  this.setTimer = function(){
    setInterval(() => {
      this.timer +=1;
    }, 1000);
  }

  this.looseLife = function() {
    this.lives -=1;
  }

  this.gainLife = function(){
    this.lives +=1;
  }

  this.setTimer();

  this.ultimateLost = function() {
    if (this.lives <= 0) {
      return "looser";
    }
  }

  this.restart = function() {
    this.game = new Game();
    this.solvedPuzzles = 0;
    this.timer = 0;
    this.lives = 7;
  }
}


