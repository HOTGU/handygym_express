const mapContainer = document.getElementById("kakaoMap");
const address = document.getElementById("jsAddress").innerText;

const geocoder = new daum.maps.services.Geocoder();

let mapOption = {
    center: new daum.maps.LatLng(37.537187, 127.005476),
    level: 5,
};
let map = new daum.maps.Map(mapContainer, mapOption);

const init = () => {
    const handleGeocoder = (results, status) => {
        if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(results[0].y, results[0].x);

            var marker = new kakao.maps.Marker({
                map: map,
                position: coords,
            });

            marker.setPosition(coords);
            map.setCenter(coords);
        } else {
            console.log(results);
        }
    };

    const geocoder = new daum.maps.services.Geocoder();
    geocoder.addressSearch(address, handleGeocoder);
};
init();
