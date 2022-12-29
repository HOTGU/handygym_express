import Comment from "../models/Comment.js";
import Gym from "../models/Gym.js";

export const create = async (req, res) => {
    try {
        const { text } = req.body;
        const newComment = await Comment.create({
            text,
            where: req.params.gymId,
            creator: req.user._id,
        });
        await Gym.findOneAndUpdate(req.params.gymId, {
            $push: { comments: String(newComment._id) },
        });
        return res.redirect(`/gym/${req.params.gymId}`);
    } catch (error) {
        console.log(error);
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
        res.redirect(`/gym/${gymId}`);
    } catch (error) {
        console.log(error);
    }
};
