/**
  * Nom du fichier: Nav.js
  * Auteur: Eliot Masset
  * Dernière modification : 06/01/2021
  * Description: Ce fichier contient les fonctions de la classe Nav
  * Version: 1.0
 **/
 import $ from "jquery";

 class ParamsGame {
    constructor() {
        this.switchAnimateSpeed = document.createElement('div');
        this.switchAnimateSpeed.id = 'nav-toggle-animateSpeed';
        this.speed = false;
    }

    drawSwitchAnimateSpeed() {
        let checkAnimateSpeed = document.createElement('input');
        checkAnimateSpeed.type = 'checkbox';
        checkAnimateSpeed.name = 'animateSpeed';
        checkAnimateSpeed.removeAttribute('checked');
        checkAnimateSpeed.addEventListener('change', () => {
            this.speed = checkAnimateSpeed.checked;
        });
        let labelAnimateSpeed = document.createElement('label');
        labelAnimateSpeed.htmlFor = 'animateSpeed';
        labelAnimateSpeed.innerHTML = 'Quick Mode';
        this.switchAnimateSpeed.appendChild(checkAnimateSpeed);
        this.switchAnimateSpeed.appendChild(labelAnimateSpeed);
        document.querySelector('content').appendChild(this.switchAnimateSpeed);
    }
}

export {ParamsGame};