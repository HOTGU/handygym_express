"use strict";var container=document.querySelector(".imgContainer"),imgs=document.querySelectorAll(".gymImg"),nextBtn=document.getElementById("nextSlideBtn"),prevBtn=document.getElementById("prevSlideBtn"),SLIDE_INDEX=0,paintImgsSlide=function(e){container.style.transform="translateX("+-100*e+"%)"},handleNext=function(){SLIDE_INDEX===imgs.length-1?SLIDE_INDEX=0:SLIDE_INDEX++,paintImgsSlide(SLIDE_INDEX)},handlePrev=function(){0===SLIDE_INDEX?SLIDE_INDEX=imgs.length-1:SLIDE_INDEX--,paintImgsSlide(SLIDE_INDEX)},init=function(){nextBtn.addEventListener("click",handleNext),prevBtn.addEventListener("click",handlePrev)};0<imgs.length&&init();