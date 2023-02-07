"use strict";

var onedayRadios = document.querySelectorAll("input[name=oneday]");
var onedayPayContainer = document.getElementById("jsOnedayPay");
var onedayPayInput = document.querySelector("input[name=onedayPay]");
var onedayPayCheckbox = document.getElementById("onedayPayCheckbox");

var handleRadio = function handleRadio(e) {
    var _e$target = e.target,
        checked = _e$target.checked,
        value = _e$target.value;

    if (checked) {
        if (value === "가능") {
            onedayPayContainer.style.display = "flex";
            return;
        }
        if (value === "불가능" || value === "모름") {
            onedayPayContainer.style.display = "none";
            return;
        }
    }
};

var onlyNumber = function onlyNumber(e) {
    if (onedayPayCheckbox.checked) {
        e.target.value = "모름";
        return;
    }
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
};

var handleCheckbox = function handleCheckbox(e) {
    var checked = e.target.checked;

    if (checked) {
        onedayPayInput.value = "모름";
    } else {
        onedayPayInput.value = "";
    }
};
var init = function init() {
    for (var i = 0; i < onedayRadios.length; i++) {
        onedayRadios[i].addEventListener("change", handleRadio);
    }
    onedayPayContainer.style.display = "none";
    onedayPayInput.addEventListener("input", onlyNumber);
    onedayPayCheckbox.addEventListener("change", handleCheckbox);
};

init();