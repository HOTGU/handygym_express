"use strict";

var deleteBtn = document.getElementById("deleteBtn");
var url = new URL(window.location);
var urlArr = url.pathname.split("/");
var type = urlArr[1];
var id = urlArr[2];

var handleDelete = async function handleDelete() {
    var ok = confirm("정말 삭제하시겠습니까?");
    if (ok) {
        window.location = "/" + type + "/" + id + "/remove";
    } else {
        return;
    }
};

var init = function init() {
    deleteBtn.addEventListener("click", handleDelete);
};

if (deleteBtn) {
    init();
}