import mongoose from "mongoose";

const GalleryScehma = mongoose.Schema({
    title: String,
    photos: [
        {
            photo: String,
            caption: String,
        },
    ],
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

const Gallery = mongoose.model("Gallery", GalleryScehma);

export default Gallery;
