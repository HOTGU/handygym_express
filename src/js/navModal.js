const menuModal = document.querySelector(".menuModal");
const menuBar = document.querySelector(".menuBar");
const navLinks = document.querySelectorAll(".navLink");

const documentClick = (e) => {
    let isModalClick = menuModal.contains(e.target) || menuBar.contains(e.target);
    if (!isModalClick) {
        if (!menuModal.classList.contains("hidden")) {
            menuModal.classList.add("hidden");
        }
    }
};

document.addEventListener("click", documentClick);
menuBar.addEventListener("click", (e) => {
    menuModal.classList.toggle("hidden");
});
for (let i = 0; i < navLinks.length; i++) {
    const href = window.location.href;
    const aTag = navLinks[i];
    const aHref = aTag.href;
    if (href === aHref) {
        aTag.style.fontWeight = "700";
        aTag.style.textDecoration = "underline";
    }
}
