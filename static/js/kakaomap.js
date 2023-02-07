"use strict";

var mapContainer = document.getElementById("kakaoMap");
var address = document.getElementById("jsAddress").innerText;

var geocoder = new daum.maps.services.Geocoder();

var mapOption = {
    center: new daum.maps.LatLng(37.537187, 127.005476),
    level: 5
};
var map = new daum.maps.Map(mapContainer, mapOption);

var init = function init() {
    var handleGeocoder = function handleGeocoder(results, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(results[0].y, results[0].x);

            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            marker.setPosition(coords);
            map.setCenter(coords);
        }
    };

    var geocoder = new daum.maps.services.Geocoder();
    geocoder.addressSearch(address, handleGeocoder);
};
init();