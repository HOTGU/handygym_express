import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const create = async (req, res) => {
    const {
        user,
        body: { to, message },
    } = req;
    const from = String(user._id);
    try {
        const existsConversation = await Conversation.findOne({
            users: { $all: [to, from] },
        });
        if (existsConversation) {
            await Message.create({
                from,
                to,
                message,
                conversationId: String(existsConversation._id),
            });
            req.flash("success", "쪽지 보내기 성공");
            return res.redirect(req.session.current_url);
        } else {
            const newConversation = await Conversation.create({
                users: [to, from],
            });
            await Message.create({
                from,
                to,
                message,
                conversationId: String(newConversation._id),
            });
            req.flash("success", "쪽지 보내기 성공");
            return res.redirect(req.session.current_url);
        }
    } catch (error) {
        req.flash(
            "error",
            "쪽지 보내는 도중 서버오류가 발생했습니다\n불편함을 드려 죄송합니다"
        );
        return res.redirect(req.session.current_url);
    }
};
