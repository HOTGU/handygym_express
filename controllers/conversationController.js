import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const fetch = async (req, res) => {
    console.log("----------------나--------------");
    console.log(req.user);
    try {
        const conversations = await Conversation.find({
            users: { $in: [req.user._id] },
        }).populate("users");
        console.log(conversations);
        return res.render("conversation", { title: "쪽지함", conversations });
    } catch (error) {
        console.log(error);
    }
};

export const detail = async (req, res) => {
    const {
        params: { id },
        user,
    } = req;
    try {
        // req.user conversation.users contains
        const conversation = await Conversation.findById(id);

        const inUser = conversation.users.includes(String(user._id));

        if (!inUser) {
            req.flash("잘못된 접근입니다");
            return res.redirect("/");
        }

        const messages = await Message.find({ conversationId: id })
            .populate("from")
            .populate("to");

        console.log(messages);

        res.render("conversationDetail", { title: "쪽지함", messages });
    } catch (error) {
        console.log(error);
    }
};
