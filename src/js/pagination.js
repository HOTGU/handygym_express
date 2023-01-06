const pageContainer = document.querySelector(".jsPageContainer");
const params = new URLSearchParams(window.location.search);
const PAGE_TYPE = window.location.href.split("?")[0].split("/").pop();

const PAGE = Number(params.get("page")) || 1;
const TOTAL_PAGE = Number(pageContainer.id);
const PAGE_CONTAINER_SIZE = 2;
const CURRENT_PAGE_CONTAINER = Math.ceil(PAGE / PAGE_CONTAINER_SIZE);
const TOTAL_PAGE_CONTAINER = Math.ceil(TOTAL_PAGE / PAGE_CONTAINER_SIZE);

const setHref = (aEle, pageNum) => {
    let queryString = `?page=${pageNum}`;
    if (PAGE_TYPE === "gym") {
        const searchTerm = params.get("searchTerm");
        const yearRound = params.get("yearRound");
        const oneday = params.get("oneday");
        if (searchTerm) queryString += `&searchTerm=${searchTerm}`;
        if (yearRound) queryString += `&yearRound=on`;
        if (oneday) queryString += `&oneday=on`;
    }
    aEle.href = `/${PAGE_TYPE}${queryString}`;
};

const paintPage = (page) => {
    const pageLink = document.createElement("a");
    const pageText = document.createElement("div");
    setHref(pageLink, page);
    pageText.innerText = page;
    pageText.classList.add("page");
    if (PAGE === +page) {
        pageText.classList.add("currentPage");
    }
    pageLink.appendChild(pageText);
    pageContainer.appendChild(pageLink);
};

const paintPagination = (TOTAL_PAGE) => {
    if (CURRENT_PAGE_CONTAINER > 1) {
        const prevLink = document.createElement("a");
        prevLink.innerText = "<";

        setHref(prevLink, (CURRENT_PAGE_CONTAINER - 1) * PAGE_CONTAINER_SIZE);

        pageContainer.append(prevLink);
    }
    for (let i = 1; i <= TOTAL_PAGE; i++) {
        const iPageContainer = Math.ceil(i / PAGE_CONTAINER_SIZE);

        if (CURRENT_PAGE_CONTAINER === iPageContainer) {
            paintPage(i);
        }

        if (
            i === TOTAL_PAGE &&
            TOTAL_PAGE > PAGE_CONTAINER_SIZE &&
            TOTAL_PAGE_CONTAINER !== CURRENT_PAGE_CONTAINER
        ) {
            const nextLink = document.createElement("a");
            nextLink.innerText = ">";
            setHref(nextLink, CURRENT_PAGE_CONTAINER * PAGE_CONTAINER_SIZE + 1);
            pageContainer.append(nextLink);
        }
    }
};

const init = () => {
    // if (PAGE > TOTAL_PAGE) {
    //     window.location.href = `/gym?page=1`;
    // }
    paintPagination(TOTAL_PAGE);
};

init();
