import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
    {
        creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
        text: String,
        where: String,
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
