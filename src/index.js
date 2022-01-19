//Impportation des dépendances
import regeneratorRuntime from "regenerator-runtime";
import css from "./connect4.css";
import body from "./connect4.html";
import { Controller } from "./Controller/Controller.js";
import { View } from "./View/View.js";
import { Model } from "./Model/Model.js";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
//Initialisation des variables :
document.body.innerHTML = body;
const app = new Controller(new Model(), new View("connect4Canvas"));
