const body = document.querySelector("body");
const modalBtn = document.getElementById("modalBtn");
const modalContainer = document.querySelector(".modalContainer");
const modalWrapper = document.querySelector(".modalWrapper");
const modal = document.querySelector(".modal");

const openModal = () => {
    modalContainer.style.transform = "translateY(0)";
    modalWrapper.style.top = `${window.scrollY}px`;
    body.style.overflowY = "hidden";
};

const closeModal = (e) => {
    if (e.target === modalContainer || e.target === modalWrapper) {
        modalContainer.style.transform = "translateY(-100%)";
        modalWrapper.style.top = 0;
        body.style.overflowY = "scroll";
        return;
    }
};

const init = () => {
    modalBtn.addEventListener("click", openModal);
    modalContainer.addEventListener("click", closeModal);
};

if (modalBtn) init();
