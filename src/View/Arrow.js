/**
 * Nom du fichier: Arrow.js
 * Auteur: Eliot Masset & Maid Sultanovic
 * Dernière modification : 06/01/2021
 * Description: Ce fichier contient les fonctions de la classe Arrow
 * Version: 1.0
 **/
class Arrow {
  constructor(element, canvas) {
    this.element = element;
    this.canvas = canvas;
  }

  //Draw the arrow
  draw(collumn, evt) {
    if (
      collumn === undefined ||
      collumn === null ||
      collumn === 0 ||
      evt.clientX < this.canvas.getBoundingClientRect().left + 95
    ) {
      this.hide();
      return 0;
    }
    this.element.style.display = "block";
    this.element.style.left =
      collumn +
      this.canvas.getBoundingClientRect().left -
      35 -
      (collumn - 145) / 85 +
      "px";
  }

  // Hide the arrow
  hide() {
    this.element.style.display = "none";
  }
}

export { Arrow };
