"use strict";var mapContainer=document.getElementById("kakaoMap"),address=document.getElementById("jsAddress").innerText,geocoder=new daum.maps.services.Geocoder,mapOption={center:new daum.maps.LatLng(37.537187,127.005476),level:5},map=new daum.maps.Map(mapContainer,mapOption),init=function(){(new daum.maps.services.Geocoder).addressSearch(address,function(e,a){a===kakao.maps.services.Status.OK?(a=new kakao.maps.LatLng(e[0].y,e[0].x),new kakao.maps.Marker({map:map,position:a}).setPosition(a),map.setCenter(a)):console.log(e)})};init();