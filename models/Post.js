import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        creator: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
        comments: [String],
        like_users: [String],
        category: String,
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
