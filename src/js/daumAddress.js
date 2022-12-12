const searchAddressBtn = document.getElementById("searchAddressBtn");
const result = document.getElementById("result");
const mapContainer = document.getElementById("kakaoMap");
const addressInput = document.querySelector("input[name=address]");
const locationInput = document.querySelector("input[name=location]");

let mapOption = {
    center: new daum.maps.LatLng(37.537187, 127.005476),
    level: 5,
};
let map = new daum.maps.Map(mapContainer, mapOption);

let marker = new daum.maps.Marker({
    position: new daum.maps.LatLng(37.537187, 127.005476),
    map: map,
});

const paintMap = (lat, lng) => {
    mapContainer.style.display = "block";
    map.relayout();
    const moveLatLng = new daum.maps.LatLng(lat, lng);
    map.setCenter(moveLatLng);
    marker.setPosition(moveLatLng);
};

const loadingMap = () => {
    mapContainer.style.display = "none";
};

const paintInitMap = () => {
    if (addressInput.value) {
        moveMapByAddress(addressInput.value);
    } else {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                paintMap(lat, lng);
            },
            () => {
                alert("위치 허용을 하셔야 이용가능합니다");
            },
            { enableHighAccuracy: true }
        );
    }
};

const paintAddress = (address) => {
    result.innerHTML = "";
    const div = document.createElement("div");
    div.innerText = `주소: ${address}`;
    result.appendChild(div);
};

const moveMapByAddress = (address) => {
    const handleGeocoder = (results, status) => {
        if (status === daum.maps.services.Status.OK) {
            const result = results[0];
            const lat = Number(result.y);
            const lng = Number(result.x);
            loadingMap();
            paintMap(lat, lng);
        } else {
            alert("오류발생");
        }
    };

    const geocoder = new daum.maps.services.Geocoder();
    geocoder.addressSearch(address, handleGeocoder);
};

const show = () => {
    new daum.Postcode({
        oncomplete: function (data) {
            addressInput.value = data.roadAddress;
            locationInput.value = `${data.sido} ${data.sigungu} ${data.bname}`;
            paintAddress(data.roadAddress);

            moveMapByAddress(data.roadAddress);
        },
    }).open();
};

const init = () => {
    paintInitMap();
    searchAddressBtn.addEventListener("click", show);
};

init();
