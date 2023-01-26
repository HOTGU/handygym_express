const createdTexts = document.querySelectorAll(".createdAt");

const convertDate = (ele) => {
    const rawText = ele.innerText;
    const createdDate = new Date(rawText);
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const createdYear = createdDate.getFullYear();
    const createdMonth = createdDate.getMonth() + 1;
    const createdDay = createdDate.getDate();

    if (
        currentYear === createdYear &&
        currentMonth === createdMonth &&
        currentDay === createdDay
    ) {
        const createdHour = createdDate.getHours();
        const currentHour = currentDate.getHours();
        const substractHour = currentHour - createdHour;
        if (createdHour === currentHour) {
            const createMinuites = createdDate.getMinutes();
            const currentMinuites = currentDate.getMinutes();
            const substactMiniutes = currentMinuites - createMinuites;
            ele.innerText = `${substactMiniutes}분 전`;
            return;
        }
        ele.innerText = `${substractHour}시간 전`;
        return;
    }

    ele.innerText = `${createdYear}.${createdMonth}.${createdDay}`;
    return;
};

for (let i = 0; i < createdTexts.length; i++) {
    convertDate(createdTexts[i]);
}
