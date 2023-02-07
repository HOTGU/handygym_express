"use strict";

var container = document.querySelector(".imgContainer");
var imgs = document.querySelectorAll(".gymImg");
var nextBtn = document.getElementById("nextSlideBtn");
var prevBtn = document.getElementById("prevSlideBtn");

var SLIDE_INDEX = 0;

var paintImgsSlide = function paintImgsSlide(index) {
    var percent = -100 * index;
    container.style.transform = "translateX(" + percent + "%)";
};

var handleNext = function handleNext() {
    if (SLIDE_INDEX === imgs.length - 1) {
        SLIDE_INDEX = 0;
    } else {
        SLIDE_INDEX++;
    }
    paintImgsSlide(SLIDE_INDEX);
};

var handlePrev = function handlePrev() {
    if (SLIDE_INDEX === 0) {
        SLIDE_INDEX = imgs.length - 1;
    } else {
        SLIDE_INDEX--;
    }
    paintImgsSlide(SLIDE_INDEX);
};

var init = function init() {
    nextBtn.addEventListener("click", handleNext);
    prevBtn.addEventListener("click", handlePrev);
};

if (imgs.length > 0) {
    init();
}