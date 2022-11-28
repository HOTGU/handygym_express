const pageContainer = document.querySelector(".jsPageContainer");
const params = new URLSearchParams(window.location.search);

const PAGE = Number(params.get("page")) || 1;
const TOTAL_PAGE = Number(pageContainer.id);
const PAGE_CONTAINER_SIZE = 5;
const CURRENT_PAGE_CONTAINER = Math.ceil(PAGE / PAGE_CONTAINER_SIZE);
const TOTAL_PAGE_CONTAINER = Math.ceil(TOTAL_PAGE / PAGE_CONTAINER_SIZE);

const paintPage = (page) => {
    const pageLink = document.createElement("a");
    pageLink.innerText = page;
    pageLink.href = `/gym?page=${page}`;
    pageContainer.appendChild(pageLink);
};

const paintPagination = (TOTAL_PAGE) => {
    if (CURRENT_PAGE_CONTAINER > 1) {
        const nextLink = document.createElement("a");
        nextLink.innerText = "<";
        nextLink.href = `/gym?page=${(CURRENT_PAGE_CONTAINER - 1) * PAGE_CONTAINER_SIZE}`;
        pageContainer.append(nextLink);
    }
    for (let i = 1; i <= TOTAL_PAGE; i++) {
        const iPageContainer = Math.ceil(i / PAGE_CONTAINER_SIZE);

        if (CURRENT_PAGE_CONTAINER === iPageContainer) {
            paintPage(i);
        }

        if (
            i === TOTAL_PAGE &&
            TOTAL_PAGE > 5 &&
            TOTAL_PAGE_CONTAINER !== CURRENT_PAGE_CONTAINER
        ) {
            const nextLink = document.createElement("a");
            nextLink.innerText = ">";
            nextLink.href = `/gym?page=${
                CURRENT_PAGE_CONTAINER * PAGE_CONTAINER_SIZE + 1
            }`;
            pageContainer.append(nextLink);
        }
    }
};

const init = () => {
    if (PAGE > TOTAL_PAGE) {
        window.location.href = `/gym?page=1`;
    }
    paintPagination(TOTAL_PAGE);
};

init();
