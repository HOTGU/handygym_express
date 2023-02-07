"use strict";

var menuModal = document.querySelector(".menuModal");
var menuBar = document.querySelector(".menuBar");
var navLinks = document.querySelectorAll(".navLink");

var documentClick = function documentClick(e) {
    var isModalClick = menuModal.contains(e.target) || menuBar.contains(e.target);
    if (!isModalClick) {
        if (!menuModal.classList.contains("hidden")) {
            menuModal.classList.add("hidden");
        }
    }
};

document.addEventListener("click", documentClick);
menuBar.addEventListener("click", function (e) {
    menuModal.classList.toggle("hidden");
});
for (var i = 0; i < navLinks.length; i++) {
    var href = window.location.href;
    var aTag = navLinks[i];
    var aHref = aTag.href;
    if (href === aHref) {
        aTag.style.fontWeight = "700";
        aTag.style.textDecoration = "underline";
    }
}