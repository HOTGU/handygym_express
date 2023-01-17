import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

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

        const messages = await Message.find({ conversationId: id });

        console.log(messages);

        res.render("conversation", { title: "쪽지함", messages });
    } catch (error) {
        console.log(error);
    }
};
