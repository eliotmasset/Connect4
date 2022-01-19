/**
  * Nom du fichier: Nav.js
  * Auteur: Eliot Masset
  * Dernière modification : 06/01/2021
  * Description: Ce fichier contient les fonctions de la classe Nav
  * Version: 1.0
 **/

 class ParamsGame {
    constructor() {
        this.switchAnimateSpeed = document.createElement('div');
        this.switchAnimateSpeed.id = 'nav-toggle-animateSpeed';
        this.speed = false;
    }

    drawSwitchAnimateSpeed() {
        this.container = document.createElement('div');
        this.container.id = 'pan-bottom';
        let checkAnimateSpeed = document.createElement('input');
        checkAnimateSpeed.type = 'checkbox';
        checkAnimateSpeed.name = 'animateSpeed';
        checkAnimateSpeed.removeAttribute('checked');
        checkAnimateSpeed.addEventListener('change', () => {
            this.speed = checkAnimateSpeed.checked;
        });
        let labelAnimateSpeed = document.createElement('label');
        labelAnimateSpeed.htmlFor = 'animateSpeed';
        labelAnimateSpeed.innerHTML = '<i class="fas fa-stopwatch"></i>';
        this.switchAnimateSpeed.appendChild(checkAnimateSpeed);
        this.switchAnimateSpeed.appendChild(labelAnimateSpeed);
        this.container.appendChild(this.switchAnimateSpeed);
        document.querySelector('content').appendChild(this.container);
    }
}

export {ParamsGame};