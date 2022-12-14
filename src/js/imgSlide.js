const container = document.querySelector(".imgContainer");
const imgs = document.querySelectorAll(".gymImg");
const nextBtn = document.getElementById("nextSlideBtn");
const prevBtn = document.getElementById("prevSlideBtn");

let SLIDE_INDEX = 0;

const paintImgsSlide = (index) => {
    const percent = -100 * index;
    container.style.transform = `translateX(${percent}%)`;
};

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
    nextBtn.addEventListener("click", handleNext);
    prevBtn.addEventListener("click", handlePrev);
};

if (imgs.length > 0) {
    init();
}
