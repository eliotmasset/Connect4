/**
  * Nom du fichier: Controller.js
  * Auteur: Eliot Masset
  * Dernière modification : 06/01/2021
  * Description: Ce fichier contient les fonctions de la classe Controller
  * Version: 1.0
 **/
class Controller {

  // Constructeur
  constructor(model, view) {
    this.model = model; //Référence sur le modèle
    this.view = view; //Référence sur la vue
    this.view.render(
      [
        [2, 2, 2, 2, 1, 2, 2],
        [2, 2, 2, 1, 1, 2, 2],
        [2, 2, 1, 2, 1, 2, 2],
        [2, 1, 2, 2, 1, 2, 2],
        [1, 1, 1, 1, 1, 1, 2],
        [2, 2, 2, 2, 1, 2, 2]
      ]
    ); // On affiche le plateau en 4

    $.fn.serializeObject = function(){
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
    }; //Fonction de copie du formulaire

    let self=this; //On garde une référence vers this
    $(document).ready(function() {
      $(document).on('submit', '#form-connect4', function() {
        let out = JSON.stringify($('form').serializeObject()); //On récupère les données du formulaire
        self.startGame(out);
        return false;
      });
    }); // On lance le jeu à l'envoi du formulaire
  }



  // Fonction de début de partie
  startGame(out) {
    let state =this.model.getState();
    this.model.startGame(); //On lance le jeu
    this.view.openPlate(()=>{}, state); //On affiche le plateau
    //this.view.render(this.model.getState()); //On affiche le plateau
    let self=this; //On garde une référence vers this
    this.view.MyCanva.addEventListener("click", (e) =>  //On ajoute un écouteur d'événement de clic sur le canvas
        self.clickOnCanva(e, self)
    );
  }


  //Fonction qui vérifie si le jeu est terminé
  isEndGame(state) {
    let winner = this.model.getWinner(this.model.board);
    if(winner) { //Si le jeu est terminé 
      this.model.gameState = 0;
      if(winner === 3) { //Si il y a match nul
        this.view.MyCanva.removeEventListener("click", this.clickOnCanva); //On supprime l'écouteur d'événement de clic)
        alert("La partie se termine sur un match nul"); //On affiche un message de fin de partie
      } else {
        this.endGame(state, winner); //On aappelle la fonction de fin de partie
      }
    }
  }

  //Fonction lancée lorsque le jeu est terminé
  endGame(state, winner) {
    this.view.MyCanva.removeEventListener("click", this.clickOnCanva); //On supprime l'écouteur d'événement de clic)
    alert("Le joueur " + (winner===1 ? "rouge" : "jaune") + " a gagné"); //On affiche un message de fin de partie
  }

  //Fonction au clic sur le canvas
  clickOnCanva(e, self) {
    if(!this.view.getCanAnimate() || this.model.gameState === 0) return 0; //Si le jeton est en train de tomber, on ne fait rien
    let pos = self.view.getMousePos(e); //On récupère la position du clic
    let range = self.view.getRangeByX(pos.x); //On récupère la rangée de l'emplacement du clic
    let col = (range-145)/85; //On récupère la colonne de l'emplacement du clic
    if(!self.model.isValidMove(self.model.board,col)) { //On vérifie si le coup est valide
      alert("Cette colonne est pleine");  //Si non, on affiche un message d'erreur
    } else { //Sinon, on joue le coup
      self.view.animateFalling(pos.x,self.model.getState(), () => { self.view.render(self.model.makeMove(self.model.board,col,self.model.currentPlayer)); self.isEndGame(self.model.getState()); }); //On anime le jeton
    }
  }
}
