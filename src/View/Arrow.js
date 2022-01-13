/**
  * Nom du fichier: Arrow.js
  * Auteur: Eliot Masset
  * Dernière modification : 06/01/2021
  * Description: Ce fichier contient les fonctions de la classe Arrow
  * Version: 1.0
 **/
class Arrow {
    constructor(element, canvas) {
        this.element = element;
        this.canvas = canvas;
    }

    draw(collumn,evt) {
        if(collumn === undefined || collumn === null || collumn === 0 || evt.clientX < this.canvas.getBoundingClientRect().left+95 ) {
            this.hide();
            return 0;
        }
        this.element.style.display = 'block';
        this.element.style.left = collumn+this.canvas.getBoundingClientRect().left+5-((collumn-145)/85) + 'px';
    }

    hide() {
        this.element.style.display = 'none';
    }
}

export {Arrow};