"use strict";

window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "hello";
});