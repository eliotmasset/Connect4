class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.startGame();
  }

  startGame() {
    this.model.startGame();
    this.view.render(this.model.getState());
    let self=this;
    this.view.MyCanva.addEventListener("click", (e) => {
      self.clickOnCanva(e, self);
    });
  }

  clickOnCanva(e, self) {
    let pos = self.view.getMousePos(e);
    let range = self.view.getRangeByX(pos.x);
    let col = (range-145)/85;
    if(!self.model.isValidMove(self.model.board,col)) {
      alert("Cette colonne est pleine");
    } else {
      self.view.animateFalling(pos.x,self.model.getState(), () => self.view.render(self.model.makeMove(self.model.board,col,self.model.currentPlayer)));
    }
  }
}
