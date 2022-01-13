/**
  * Nom du fichier: Jeton.js
  * Auteur: Eliot Masset
  * Dernière modification : 06/01/2021
  * Description: Ce fichier contient les fonctions de la classe Jeton
  * Version: 1.0
 **/
class Jeton {
    constructor(context) {
        this.context = context;
        this.x= 40;
        this.y= 50;
        this.vx= 0;
        this.vy= 2;
        this.radius= 35;
        this.color= 'red';
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        this.context.closePath();
        this.context.fillStyle = this.color;
        this.context.fill();
    }
}

export {Jeton};