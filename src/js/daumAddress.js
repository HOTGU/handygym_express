const searchAddressBtn = document.getElementById("searchAddressBtn");
const result = document.getElementById("result");
const layer = document.getElementById("postcodeLayer");
const cancelBtn = document.getElementById("postcodeCancelBtn");
const addressInput = document.querySelector("input[name=address]");
const locationInput = document.querySelector("input[name=location]");

const paintAddress = (address) => {
    result.innerHTML = "";
    const div = document.createElement("div");
    div.innerText = address;
    result.appendChild(div);
};

const cancel = () => {
    layer.style.display = "none";
};

const show = () => {
    new daum.Postcode({
        oncomplete: function (data) {
            paintAddress(data.roadAddress);
            addressInput.value = data.roadAddress;
            locationInput.value = `${data.sido} ${data.sigungu} ${data.bname}`;
        },
    }).embed(layer);
    layer.style.display = "block";
};

searchAddressBtn.addEventListener("click", show);
cancelBtn.addEventListener("click", cancel);
