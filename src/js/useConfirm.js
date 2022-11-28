const deleteBtn = document.getElementById("deleteBtn");
const { pathname } = new URL(window.location);
const gymId = pathname.split("/")[2];

const handleDelete = async () => {
    const ok = confirm("정말 삭제하시겠습니까?");
    if (ok) {
        window.location = `/gym/${gymId}/remove`;
    } else {
        return;
    }
};

deleteBtn.addEventListener("click", handleDelete);
