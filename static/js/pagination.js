"use strict";

var pageContainer = document.querySelector(".jsPageContainer");
var params = new URLSearchParams(window.location.search);
var PAGE_TYPE = window.location.href.split("?")[0].split("/").pop();

var PAGE = Number(params.get("page")) || 1; // String이 false면  1로 리턴;
var TOTAL_PAGE = Number(pageContainer.id);

var PAGE_CONTAINER_SIZE = 2;
var CURRENT_PAGE_CONTAINER = Math.ceil(PAGE / PAGE_CONTAINER_SIZE);
var TOTAL_PAGE_CONTAINER = Math.ceil(TOTAL_PAGE / PAGE_CONTAINER_SIZE);

var searchQueryString = "";

if (PAGE_TYPE === "gym") {
    var searchTerm = params.get("searchTerm");
    var yearRound = params.get("yearRound");
    var oneday = params.get("oneday");
    if (searchTerm) searchQueryString += "&searchTerm=" + searchTerm;
    if (yearRound) searchQueryString += "&yearRound=on";
    if (oneday) searchQueryString += "&oneday=on";
}

if (PAGE_TYPE === "post") {
    var _searchTerm = params.get("searchTerm");
    var category = params.get("category");
    if (_searchTerm) searchQueryString += "&searchTerm=" + _searchTerm;
    if (category) searchQueryString += "&category=" + category;
}

if (PAGE_TYPE === "gallery") {}

var setHref = function setHref(aEle, pageNum) {
    aEle.href = "/" + PAGE_TYPE + "?page=" + pageNum + searchQueryString;
};

var paintPage = function paintPage(page) {
    var pageLink = document.createElement("a");
    var pageText = document.createElement("div");
    setHref(pageLink, page);
    pageText.innerText = page;
    pageText.classList.add("page");
    if (PAGE === +page) {
        pageText.classList.add("currentPage");
    }
    pageLink.appendChild(pageText);
    pageContainer.appendChild(pageLink);
};

var paintPagination = function paintPagination(TOTAL_PAGE) {
    if (CURRENT_PAGE_CONTAINER > 1) {
        var prevLink = document.createElement("a");
        prevLink.innerText = "<";

        setHref(prevLink, (CURRENT_PAGE_CONTAINER - 1) * PAGE_CONTAINER_SIZE);

        pageContainer.append(prevLink);
    }
    for (var i = 1; i <= TOTAL_PAGE; i++) {
        var iPageContainer = Math.ceil(i / PAGE_CONTAINER_SIZE);

        if (CURRENT_PAGE_CONTAINER === iPageContainer) {
            paintPage(i);
        }

        if (i === TOTAL_PAGE && TOTAL_PAGE > PAGE_CONTAINER_SIZE && TOTAL_PAGE_CONTAINER !== CURRENT_PAGE_CONTAINER) {
            var nextLink = document.createElement("a");
            nextLink.innerText = ">";
            setHref(nextLink, CURRENT_PAGE_CONTAINER * PAGE_CONTAINER_SIZE + 1);
            pageContainer.append(nextLink);
        }
    }
};

var init = function init() {
    paintPagination(TOTAL_PAGE);
};

init();