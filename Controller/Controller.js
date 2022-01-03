class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.startGame();
  }

  startGame() {
    this.model.startGame();
    this.view.render(this.model.getState());
  }
}
