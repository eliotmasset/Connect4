

class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view
    }

    startGame() {
        this.model.startGame();
        this.view.render(this.model.getState());
    }
}