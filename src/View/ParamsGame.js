/**
 * Nom du fichier: Nav.js
 * Auteur: Eliot Masset & Maid Sultanovic
 * Dernière modification : 06/01/2021
 * Description: Ce fichier contient les fonctions de la classe Nav
 * Version: 1.0
 **/
import $ from "jquery";

class ParamsGame {
  constructor(setFirstColor, setSecondColor) {
    this.switchAnimateSpeed = document.createElement("div");
    this.switchAnimateSpeed.id = "nav-toggle-animateSpeed";
    this.speed = false;
    this.setFirstColor = setFirstColor;
    this.setSecondColor = setSecondColor;
  }

  // Draw the switch for animate speed
  drawSwitchAnimateSpeed() {
    this.container = document.createElement("div");
    this.container.id = "pan-bottom";
    let checkAnimateSpeed = document.createElement("input");
    checkAnimateSpeed.type = "checkbox";
    checkAnimateSpeed.name = "animateSpeed";
    checkAnimateSpeed.removeAttribute("checked");
    checkAnimateSpeed.addEventListener("change", () => {
      this.speed = checkAnimateSpeed.checked;
    });
    let labelAnimateSpeed = document.createElement("label");
    labelAnimateSpeed.htmlFor = "animateSpeed";
    labelAnimateSpeed.innerHTML = '<i class="fas fa-stopwatch"></i>';
    this.switchAnimateSpeed.appendChild(checkAnimateSpeed);
    this.switchAnimateSpeed.appendChild(labelAnimateSpeed);
    this.container.appendChild(this.switchAnimateSpeed);
    document.querySelector("content").appendChild(this.container);

    this.colorPlayer1 = document.createElement("div");
    this.colorPlayer1.className = "button";
    this.colorPlayer1.innerHTML =
      '<div class="center center1"><div class="wrapper__pin wrapper__pin1"><div class="pin"></div></div></div><div class="wheel wheel1"><ul class="colors"><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li></ul></div>';
    this.colorPlayer2 = document.createElement("div");
    this.colorPlayer2.className = "button button2";
    this.colorPlayer2.innerHTML =
      '<div class="center center2"><div class="wrapper__pin wrapper__pin2"><div class="pin"></div></div></div><div class="wheel wheel2"><ul class="colors"><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li><li class="color"></li></ul></div>';
    document.querySelector("content").appendChild(this.colorPlayer1);
    document.querySelector("content").appendChild(this.colorPlayer2);

    // Color pickers : (Algorythme récuprer sur codepen.io)

    $(".wheel").on("click", (e) => {
      var parentOffset = $(e.target).offset();
      var offX = e.pageX - parentOffset.left - 31;
      var offY = e.pageY - parentOffset.top - 31;
      // calculate degree of rotation to click position
      var calcDeg = Math.atan2(offY, offX) * (180 / Math.PI);
      // max and min rgb value
      var rgbHigh = 134;
      var rgbLow = 37;
      // difference between highest rgb value and lowest
      var rgbDiff = rgbHigh - rgbLow;
      if (calcDeg < -89) {
        var actualDeg = 270 + (180 + calcDeg);
      } else {
        var actualDeg = 90 + calcDeg;
      }
      var rotateCss = "rotate(" + actualDeg + "deg)";
      let element = $(e.currentTarget).hasClass("wheel1")
        ? $(".wrapper__pin1")
        : $(".wrapper__pin2");
      let setColor = $(e.currentTarget).hasClass("wheel1")
        ? (color) => this.setFirstColor(color)
        : (color) => this.setSecondColor(color);
      element.css("transform", rotateCss);
      // check which half I'm in
      if (calcDeg >= 0) {
        // in what part of the half did the click happen?
        var percent = calcDeg / 180;
        if (percent >= 0 && percent < 0.33) {
          // what position in the part did the click happen in
          var currentPos = percent / 0.33;
          // how much value must be deducted/added to the rgb value
          var rgbChange = rgbDiff * currentPos;
          // deduct value
          var rgbNew = Math.round(rgbHigh - rgbChange);
          // put value in css
          var cssValue = "rgb(" + rgbLow + "," + rgbHigh + "," + rgbNew + ")";
          setColor(cssValue);
        } else if (percent >= 0.33 && percent < 0.66) {
          // what position in the part did the click happen in
          var currentPos = (percent - 0.33) / 0.33;
          // how much value must be deducted/added to the rgb value
          var rgbChange = rgbDiff * currentPos;
          // deduct value
          var rgbNew = Math.round(rgbHigh + rgbChange);
          // put value in css
          var cssValue = "rgb(" + rgbNew + "," + rgbHigh + "," + rgbLow + ")";
          setColor(cssValue);
        } else {
          // what position in the part did the click happen in
          var currentPos = (percent - 0.66) / 0.33;
          // how much value must be deducted/added to the rgb value
          var rgbChange = rgbDiff * currentPos;
          // deduct value
          var rgbNew = Math.round(rgbHigh - rgbChange);
          // put value in css
          var cssValue = "rgb(" + rgbHigh + "," + rgbNew + "," + rgbLow + ")";
          setColor(cssValue);
        }
      } else {
        var percent = -(calcDeg / 180);

        if (percent >= 0 && percent < 0.33) {
          // what position in the part did the click happen in
          var currentPos = percent / 0.33;
          // how much value must be deducted/added to the rgb value
          var rgbChange = rgbDiff * currentPos;
          // deduct value
          var rgbNew = Math.round(rgbHigh - rgbChange);
          // put value in css
          var cssValue = "rgb(" + rgbLow + "," + rgbNew + "," + rgbHigh + ")";
          setColor(cssValue);
        } else if (percent >= 0.33 && percent < 0.66) {
          // what position in the part did the click happen in
          var currentPos = (percent - 0.33) / 0.33;
          // how much value must be deducted/added to the rgb value
          var rgbChange = rgbDiff * currentPos;
          // deduct value
          var rgbNew = Math.round(rgbHigh + rgbChange);
          // put value in css
          var cssValue = "rgb(" + rgbNew + "," + rgbLow + "," + rgbHigh + ")";
          setColor(cssValue);
        } else {
          // what position in the part did the click happen in
          var currentPos = (percent - 0.66) / 0.33;
          // how much value must be deducted/added to the rgb value
          var rgbChange = rgbDiff * currentPos;
          // deduct value
          var rgbNew = Math.round(rgbHigh - rgbChange);
          // put value in css
          var cssValue = "rgb(" + rgbHigh + "," + rgbLow + "," + rgbNew + ")";
          setColor(cssValue);
        }
      }
    });
  }
}

export { ParamsGame };
