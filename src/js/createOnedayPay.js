const onedayRadios = document.querySelectorAll("input[name=oneday]");
const onedayPayContainer = document.getElementById("jsOnedayPay");
const onedayPayInput = document.querySelector("input[name=onedayPay]");
const onedayPayCheckbox = document.getElementById("onedayPayCheckbox");

const handleRadio = (e) => {
    const {
        target: { checked, value },
    } = e;
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

const onlyNumber = (e) => {
    if (onedayPayCheckbox.checked) {
        e.target.value = "모름";
        return;
    }
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
};

const handleCheckbox = (e) => {
    const {
        target: { checked },
    } = e;
    if (checked) {
        onedayPayInput.value = "모름";
    } else {
        onedayPayInput.value = "";
    }
};
const init = () => {
    for (let i = 0; i < onedayRadios.length; i++) {
        onedayRadios[i].addEventListener("change", handleRadio);
    }
    onedayPayContainer.style.display = "none";
    onedayPayInput.addEventListener("input", onlyNumber);
    onedayPayCheckbox.addEventListener("change", handleCheckbox);
};

init();
