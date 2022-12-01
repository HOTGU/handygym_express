const deleteBtn = document.getElementById("deleteBtn");
const url = new URL(window.location);
const urlArr = url.pathname.split("/");
const type = urlArr[1];
const id = urlArr[2];

const handleDelete = async () => {
    const ok = confirm("정말 삭제하시겠습니까?");
    if (ok) {
        window.location = `/${type}/${id}/remove`;
    } else {
        return;
    }
};

deleteBtn.addEventListener("click", handleDelete);
