const fileInput = document.querySelector("input[name=photos]");

const handleChange = (event) => {
    const imgFiles = event.target.files;

    const dataTransfer = new DataTransfer();

    const compressOption = {
        maxSizeMB: 1,
        maxWidthOrHeight: 760,
        initialQuality: 0.8,
        // useWebWorker: false,
    };

    const compressFile = async (file) => {
        try {
            let compressedBlob = await imageCompression(file, compressOption);
            compressedBlob.name = `${file.name}_compressed`;

            const compressedFile = new File([compressedBlob], compressedBlob.name, {
                type: "images/*",
            });

            dataTransfer.items.add(compressedFile);

            fileInput.files = dataTransfer.files;
        } catch (error) {
            console.log(error);
            alert("파일 올리는 도중 오류발생");
            return;
        }
    };

    for (let i = 0; i < imgFiles.length; i++) {
        compressFile(imgFiles[i]);
    }
};

fileInput.addEventListener("change", handleChange);
