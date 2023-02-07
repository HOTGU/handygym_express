"use strict";

var searchAddressBtn = document.getElementById("searchAddressBtn");
var result = document.getElementById("result");
var mapContainer = document.getElementById("kakaoMap");
var addressInput = document.querySelector("input[name=address]");
var locationInput = document.querySelector("input[name=location]");

var mapOption = {
    center: new daum.maps.LatLng(37.537187, 127.005476),
    level: 5
};
var map = new daum.maps.Map(mapContainer, mapOption);

var marker = new daum.maps.Marker({
    position: new daum.maps.LatLng(37.537187, 127.005476),
    map: map
});

var paintMap = function paintMap(lat, lng) {
    var coords = new daum.maps.LatLng(lat, lng);
    map.setCenter(coords);
    marker.setPosition(coords);
};

var paintInitMap = function paintInitMap() {
    if (addressInput.value) {
        moveMapByAddress(addressInput.value);
        paintAddress(addressInput.value);
    } else {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            paintMap(lat, lng);
        }, function () {
            alert("위치 허용을 하셔야 이용가능합니다");
        }, { enableHighAccuracy: true });
    }
};

var paintAddress = function paintAddress(address) {
    result.innerHTML = "";
    var div = document.createElement("div");
    div.innerText = "\uC8FC\uC18C: " + address;
    result.appendChild(div);
};

var moveMapByAddress = function moveMapByAddress(address) {
    var handleGeocoder = function handleGeocoder(results, status) {
        if (status === daum.maps.services.Status.OK) {
            var _result = results[0];
            var lat = Number(_result.y);
            var lng = Number(_result.x);
            paintMap(lat, lng);
        } else {
            alert("오류발생");
        }
    };

    var geocoder = new daum.maps.services.Geocoder();
    geocoder.addressSearch(address, handleGeocoder);
};

var show = function show() {
    new daum.Postcode({
        oncomplete: function oncomplete(data) {
            addressInput.value = data.roadAddress;
            locationInput.value = data.sido + " " + data.sigungu + " " + data.bname;
            paintAddress(data.roadAddress);

            moveMapByAddress(data.roadAddress);
        }
    }).open();
};

var init = function init() {
    paintInitMap();
    searchAddressBtn.addEventListener("click", show);
};

init();