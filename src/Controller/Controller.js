/**
  * Nom du fichier: Controller.js
  * Auteur: Eliot Masset
  * Dernière modification : 06/01/2021
  * Description: Ce fichier contient les fonctions de la classe Controller
  * Version: 1.0
 **/
import { GameController } from "./GameController.js";
import { View } from "../View/View.js";
import { Model } from "../Model/Model.js";

 class Controller {

    // Constructeur
    constructor() {
      this.model = new Model(); //Référence sur le modèle
      this.view = new View("connect4Canvas"); //Référence sur la vue
      this.gameController = new GameController(this.model, this.view); //On crée un nouveau BoardController
      this.init(); //On lance la fonction d'initialisation
    }

    init() {
    }
  }
  

  export {Controller};