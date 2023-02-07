"use strict";

var createdTexts = document.querySelectorAll(".createdAt");

var convertDate = function convertDate(ele) {
    var rawText = ele.innerText;
    var createdDate = new Date(rawText);
    var currentDate = new Date();

    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();

    var createdYear = createdDate.getFullYear();
    var createdMonth = createdDate.getMonth() + 1;
    var createdDay = createdDate.getDate();

    if (currentYear === createdYear && currentMonth === createdMonth && currentDay === createdDay) {
        var createdHour = createdDate.getHours();
        var currentHour = currentDate.getHours();
        var substractHour = currentHour - createdHour;
        if (createdHour === currentHour) {
            var createMinuites = createdDate.getMinutes();
            var currentMinuites = currentDate.getMinutes();
            var substactMiniutes = currentMinuites - createMinuites;
            ele.innerText = substactMiniutes + "\uBD84 \uC804";
            return;
        }
        ele.innerText = substractHour + "\uC2DC\uAC04 \uC804";
        return;
    }

    ele.innerText = createdYear + "." + createdMonth + "." + createdDay;
    return;
};

for (var i = 0; i < createdTexts.length; i++) {
    convertDate(createdTexts[i]);
}