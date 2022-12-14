import Comment from "../models/Comment.js";
import Gym from "../models/Gym.js";

export const create = async (req, res) => {
    const {
        body: { text },
        params: { gymId },
        user: { _id: userId },
    } = req;
    // console.log(gymId, text);
    try {
        const comment = await Comment.create({
            text,
            where: gymId,
            creator: userId,
        });
        await Gym.findOneAndUpdate(gymId, {
            $push: { comments: String(comment._id) },
        });
        return res.status(201).json({ comment, user: req.user });
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
};

export const update = (req, res) => {
    console.log("없데이트");
};

export const remove = async (req, res) => {
    const {
        params: { commentId, gymId },
    } = req;
    try {
        await Comment.findByIdAndDelete(commentId);
        await Gym.findOneAndUpdate(gymId, { $pull: { comments: commentId } });
        return res.status(200).json({ message: "삭제성공" });
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
};
