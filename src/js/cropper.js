const body = document.querySelector("body");
const modalContainer = document.querySelector(".modalContainer");
const modalWrapper = document.querySelector(".modalWrapper");
const croppperContainer = document.querySelector(".croppperContainer");
const closeBtn = document.getElementById("closeBtn");

const inputFile = document.getElementById("cropperFile");
const galleryPreview = document.getElementById("galleryPreview");
const result = document.querySelector(".result");
const saveBtn = document.querySelector(".save");

let cropper;

const dataTransfer = new DataTransfer();

const cropImgToData = (blob, targetId, newId) => {
    const convertFile = new File([blob], blob.name || "croppedImg", {
        type: "images/*",
    });
    convertFile.id = newId;

    const updatedFiles = Array.from(dataTransfer.files).map((dataFile) => {
        if (targetId === dataFile.id) {
            return convertFile;
        }
        return dataFile;
    });

    dataTransfer.items.clear();

    for (let i = 0; i < updatedFiles.length; i++) {
        dataTransfer.items.add(updatedFiles[i]);
    }

    inputFile.files = dataTransfer.files;
};

const cropSave = (e, id) => {
    e.preventDefault();
    cropper
        .getCroppedCanvas({
            minWidth: 256,
            minHeight: 256,
            maxWidth: 1280,
            maxHeight: 1280,
        })
        .toBlob((blob) => {
            const randomId = Math.random().toString(16).slice(2);

            const previewContainer = document.getElementById(id);
            previewContainer.innerHTML = "";
            previewContainer.id = randomId;

            paintPreview(previewContainer, blob, randomId);

            cropImgToData(blob, id, randomId);

            closeModal();
        });
};

const openCrop = (imgSrc, id) => {
    croppperContainer.innerHTML = "";
    modalContainer.style.transform = "translateY(0)";
    modalWrapper.style.top = `${window.scrollY}px`;
    body.style.overflowY = "hidden";
    const img = document.createElement("img");
    img.src = imgSrc;
    const cropSaveBtn = document.createElement("div");
    cropSaveBtn.addEventListener("click", (e) => cropSave(e, id));
    cropSaveBtn.innerText = "저장";
    cropSaveBtn.classList.add("saveBtn");
    cropSaveBtn.classList.add("btn");
    croppperContainer.appendChild(img);
    modalWrapper.appendChild(cropSaveBtn);
    cropper = new Cropper(img, { aspectRatio: 4 / 3, zoomable: false });
};
const closeModal = () => {
    modalContainer.style.transform = "translateY(-100%)";
    body.style.overflowY = "scroll";
};

const deletePreview = (id) => {
    const ok = confirm("정말 삭제하시겠습니까?");
    if (ok) {
        const container = document.getElementById(id);
        container.remove();

        deleteImgData(id);
    }
};

const paintPreview = (containerEle, file, newId) => {
    const blob = URL.createObjectURL(file);

    const img = document.createElement("img");
    img.src = blob;
    img.classList.add("previewImg");

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");

    const cropBtn = document.createElement("div");
    cropBtn.innerText = "수정";
    cropBtn.classList.add("cropBtn");
    cropBtn.addEventListener("click", (e) => openCrop(blob, newId));

    const deleteBtn = document.createElement("div");
    deleteBtn.innerText = "삭제";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", (e) => deletePreview(newId));

    btnContainer.append(cropBtn);
    btnContainer.append(deleteBtn);

    containerEle.append(img);
    containerEle.append(btnContainer);
};

const newImgTodData = (file, newId) => {
    file.id = newId;
    dataTransfer.items.add(file);
    inputFile.files = dataTransfer.files;
};

const deleteImgData = (id) => {
    const findIndexById = [...dataTransfer.files].findIndex((file) => file.id === id);

    dataTransfer.items.remove(findIndexById);

    inputFile.files = dataTransfer.files;
};

const handleChange = (e) => {
    const files = e.target.files;

    const preview = (file) => {
        const randomId = Math.random().toString(16).slice(2);

        const previewContainer = document.createElement("div");
        previewContainer.id = randomId;
        previewContainer.classList.add("previewContainer");

        paintPreview(previewContainer, file, randomId);

        galleryPreview.appendChild(previewContainer);

        newImgTodData(file, randomId);
    };

    for (let i = 0; i < files.length; i++) {
        preview(files[i]);
    }
};

inputFile.addEventListener("change", handleChange);
closeBtn.addEventListener("click", closeModal);
