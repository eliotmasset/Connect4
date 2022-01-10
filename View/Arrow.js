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

    draw(collumn) {
        if(collumn === undefined || collumn === null || collumn === 0) {
            this.hide();
            return 0;
        }
        console.log(collumn);
        this.element.style.display = 'block';
        this.element.style.left = collumn+this.canvas.getBoundingClientRect().left + 'px';
    }

    hide() {
        console.log('hide');
        this.element.style.display = 'none';
    }
}