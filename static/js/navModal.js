"use strict";var menuModal=document.querySelector(".menuModal"),menuBar=document.querySelector(".menuBar"),navLinks=document.querySelectorAll(".navLink"),documentClick=function(e){menuModal.contains(e.target)||menuBar.contains(e.target)||menuModal.classList.contains("hidden")||menuModal.classList.add("hidden")};document.addEventListener("click",documentClick),menuBar.addEventListener("click",function(e){menuModal.classList.toggle("hidden")});for(var i=0;i<navLinks.length;i++){var href=window.location.href,aTag=navLinks[i],aHref=aTag.href;href===aHref&&(aTag.style.fontWeight="700",aTag.style.textDecoration="underline")}