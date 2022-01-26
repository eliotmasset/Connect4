/**
 * Nom du fichier: Nav.js
 * Auteur: Eliot Masset & Maid Sultanovic
 * Dernière modification : 06/01/2021
 * Description: Ce fichier contient les fonctions de la classe Nav
 * Version: 1.0
 **/
import $ from "jquery";

class Nav {
  constructor(div, submit_function) {
    this.div = div;
    this.submit_function = submit_function;
  }

  //Initialise le menu
  draw() {
    this.container = document.createElement("div");
    this.container.id = "pan-left";
    this.form = document.createElement("form");
    this.form.setAttribute("action", "");
    this.form.id = "form-connect4";
    let ai = document.createElement("input");
    ai.type = "checkbox";
    ai.name = "ai";
    ai.id = "nav-toggle-AI";
    ai.className = "nav-toggle-AI";
    let label_ai = document.createElement("label");
    label_ai.htmlFor = "nav-toggle-AI";
    label_ai.innerHTML = '<i class="fas fa-robot"></i>';
    label_ai.className = "nav-toggle-AI";
    let cat1 = document.createElement("h4");
    cat1.innerHTML = "Starting Player";
    let player1 = document.createElement("input");
    player1.type = "radio";
    player1.name = "player";
    player1.id = "player1";
    player1.value = "1";
    player1.checked = true;
    let label_player1 = document.createElement("label");
    label_player1.htmlFor = "player1";
    label_player1.innerHTML = "Player 1";
    let player2 = document.createElement("input");
    player2.type = "radio";
    player2.name = "player";
    player2.id = "player2";
    player2.value = "2";
    let label_player2 = document.createElement("label");
    label_player2.htmlFor = "player2";
    label_player2.innerHTML = "Player 2 (IA)";
    let cat2 = document.createElement("h4");
    cat2.innerHTML = "Difficulty";
    let difficulty = document.createElement("input");
    difficulty.type = "radio";
    difficulty.name = "difficulty";
    difficulty.id = "difficulty1";
    difficulty.value = "2";
    let label_difficulty = document.createElement("label");
    label_difficulty.htmlFor = "difficulty1";
    label_difficulty.innerHTML = "Easy";
    let difficulty2 = document.createElement("input");
    difficulty2.type = "radio";
    difficulty2.name = "difficulty";
    difficulty2.id = "difficulty2";
    difficulty2.value = "4";
    difficulty2.checked = true;
    let label_difficulty2 = document.createElement("label");
    label_difficulty2.htmlFor = "difficulty2";
    label_difficulty2.innerHTML = "Medium";
    let difficulty3 = document.createElement("input");
    difficulty3.type = "radio";
    difficulty3.name = "difficulty";
    difficulty3.id = "difficulty3";
    difficulty3.value = "6";
    let label_difficulty3 = document.createElement("label");
    label_difficulty3.htmlFor = "difficulty3";
    label_difficulty3.innerHTML = "Hard";
    let submit = document.createElement("button");
    submit.type = "submit";
    this.hologram3 = document.createElement("div");
    this.hologram3.id = "hologram3";

    this.form.appendChild(ai);
    this.form.appendChild(label_ai);
    this.form.appendChild(document.createElement("br"));
    this.form.appendChild(cat1);
    this.form.appendChild(player1);
    this.form.appendChild(label_player1);
    this.form.appendChild(document.createElement("br"));
    this.form.appendChild(player2);
    this.form.appendChild(label_player2);
    this.form.appendChild(document.createElement("br"));
    this.form.appendChild(cat2);
    this.form.appendChild(difficulty);
    this.form.appendChild(label_difficulty);
    this.form.appendChild(document.createElement("br"));
    this.form.appendChild(difficulty2);
    this.form.appendChild(label_difficulty2);
    this.form.appendChild(document.createElement("br"));
    this.form.appendChild(difficulty3);
    this.form.appendChild(label_difficulty3);
    this.form.appendChild(document.createElement("br"));
    this.form.appendChild(submit);
    this.form.appendChild(this.hologram3);
    this.container.appendChild(this.form);
    this.div.appendChild(this.container);

    $.fn.serializeObject = function () {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function () {
        if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || "");
        } else {
          o[this.name] = this.value || "";
        }
      });
      return o;
    }; //Fonction de copie du formulaire

    let self = this; //On garde une référence vers this
    $(document).ready(function () {
      $(document).on("submit", "#form-connect4", function () {
        return false;
      });
      $(document).on("mousedown", "#form-connect4 button", function () {
        let out = JSON.stringify($("form").serializeObject()); //On récupère les données du formulaire
        self.submit_function(out);
        return false;
      });
    }); // On lance le jeu à l'envoi du formulaire
  }
}

export { Nav };
