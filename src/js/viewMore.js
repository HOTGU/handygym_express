const viewMoreBtn = document.getElementById("viewMore");
const modalContainer = document.querySelector(".modalContainer");
const modal = document.querySelector(".modal");
const body = document.querySelector("body");
const xBtn = document.getElementById("xBtn");

const slideContainer = document.querySelector(".slideContainer");
const imgs = document.querySelectorAll(".gymImg");
const nextBtn = document.getElementById("nextSlideBtn");
const prevBtn = document.getElementById("prevSlideBtn");

let SLIDE_INDEX = 0;

const modalOpen = () => {
    modalContainer.style.transform = "translateY(0)";
    modalContainer.style.opacity = 1;
    modal.style.top = `${window.scrollY}px`;
    body.style.overflowY = "hidden";
};

const modalClose = () => {
    modalContainer.style.transform = "translateY(-100%)";
    modalContainer.style.opacity = 0;
    body.style.overflowY = "scroll";
};

const paintImgsSlide = (index) => {
    console.log(index);
    for (let i = 0; i < imgs.length; i++) {
        if (i === index) {
            imgs[i].style.display = "block";
        } else {
            imgs[i].style.display = "none";
        }
    }
};
// const percent = -100 * index;
// slideContainer.style.transform = `translateX(${percent}%)`;

const handleNext = () => {
    if (SLIDE_INDEX === imgs.length - 1) {
        SLIDE_INDEX = 0;
    } else {
        SLIDE_INDEX++;
    }
    paintImgsSlide(SLIDE_INDEX);
};

const handlePrev = () => {
    if (SLIDE_INDEX === 0) {
        SLIDE_INDEX = imgs.length - 1;
    } else {
        SLIDE_INDEX--;
    }
    paintImgsSlide(SLIDE_INDEX);
};

const init = () => {
    paintImgsSlide(SLIDE_INDEX);
    viewMoreBtn.addEventListener("click", modalOpen);
    xBtn.addEventListener("click", modalClose);
    nextBtn.addEventListener("click", handleNext);
    prevBtn.addEventListener("click", handlePrev);
};

if (viewMoreBtn) {
    init();
}
