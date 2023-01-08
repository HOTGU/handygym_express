import Gym from "../models/Gym.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

export const fetch = async (req, res) => {
    const {
        query: { page = 1 },
    } = req;
    const searchQuery = new Object();
    let searchQueryString = "";
    try {
        if (req.query.searchTerm) {
            searchQuery.$or = [
                { name: { $regex: req.query.searchTerm } },
                { location: { $regex: req.query.searchTerm } },
            ];
            searchQueryString += `&searchTerm=${req.query.searchTerm}`;
        }
        if (req.query.oneday) {
            searchQuery.oneday = "가능";
            searchQueryString += `&oneday=on`;
        }
        if (req.query.yearRound) {
            searchQuery.yearRound = "네";
            searchQueryString += `&yearRound=on`;
        }

        let PAGE = +page;

        const LIMIT_SIZE = 1;
        const TOTAL_GYMS = await Gym.countDocuments(searchQuery);
        const TOTAL_PAGE = Math.ceil(TOTAL_GYMS / LIMIT_SIZE) || 1;
        const SKIP_PAGE = (PAGE - 1) * LIMIT_SIZE;

        if (!PAGE || PAGE < 1 || PAGE > TOTAL_PAGE) {
            res.redirect(`/gym?page=1${searchQueryString}`);
            return;
        }

        const gyms = await Gym.find(searchQuery)
            .skip(SKIP_PAGE)
            .limit(LIMIT_SIZE)
            .sort({ createdAt: -1 });

        return res.render("gym", { title: "체욱관", gyms, totalPage: TOTAL_PAGE });
    } catch (error) {
        console.log(error);
    }
};

export const fetchLike = async (req, res) => {
    const {
        user: { _id },
    } = req;
    try {
        const gyms = await Gym.find({ like_users: { $in: `${_id}` } });
        console.log(gyms);
        res.render("likeGyms", { title: "좋아요", gyms });
    } catch (error) {
        console.log(error);
    }
};

export const upload = (req, res) => {
    return res.render("gymUpload", {
        title: "체육관 업로드",
        csrfToken: req.csrfToken(),
    });
};

export const uploadPost = async (req, res) => {
    const { body, files, user } = req;
    try {
        const returnPath = files.map((file) => {
            return file.path;
        });
        const newGym = new Gym({
            ...body,
            photos: returnPath,
            creator: user._id,
        });
        await newGym.save();
        req.flash("success", "업로드 성공");
        return res.redirect("/gym");
    } catch (error) {
        console.log(error);
    }
};

export const detail = async (req, res) => {
    try {
        const gym = await Gym.findById(req.params.gymId);
        const comments = await Comment.find({ where: req.params.gymId }).populate(
            "creator"
        );
        return res.render("gymDetail", { title: gym.name, gym, comments });
    } catch (error) {
        console.log(error);
    }
};

export const update = async (req, res) => {
    const {
        params: { gymId },
    } = req;
    try {
        const gym = await Gym.findById(gymId).populate("creator");
        return res.render("gymUpdate", {
            title: `${gym.name} 수정`,
            gym,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = async (req, res) => {
    const {
        body,
        files,
        params: { gymId },
    } = req;
    try {
        const gym = await Gym.findById(gymId).populate("creator");

        if (String(req.user._id) !== String(gym.creator._id)) {
            req.flash("error", "권한이 없습니다");
            res.redirect("/gym");
            return;
        }

        const returnPath = files.map((file) => {
            return file.path;
        });

        const updatedGym = await Gym.findByIdAndUpdate(
            gymId,
            {
                ...body,
                photos: returnPath.length > 0 ? returnPath : gym.photos,
            },
            { new: true }
        );

        req.flash("success", "업데이트 성공");

        return res.redirect(`/gym/${updatedGym._id}`);
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (req, res) => {
    const {
        params: { gymId },
    } = req;
    try {
        const gym = await Gym.findById(gymId).populate("creator");

        if (String(req.user._id) !== String(gym.creator._id)) {
            req.flash("error", "권한이 없습니다");
            res.redirect("/gym");
            return;
        }

        await gym.remove();

        req.flash("success", "삭제 성공");
        return res.redirect("/gym");
    } catch (error) {
        console.log(error);
    }
};

export const like = async (req, res) => {
    const {
        params: { gymId },
        user: { _id },
    } = req;
    const userId = String(_id);
    try {
        const currentGym = await Gym.findById(gymId);
        const existsUser = currentGym.like_users.includes(userId);
        if (existsUser) {
            await Gym.findByIdAndUpdate(gymId, { $pull: { like_users: userId } });
        } else {
            await Gym.findByIdAndUpdate(gymId, { $push: { like_users: userId } });
        }

        return res.status(200).json();
    } catch (error) {}
    res.status(200).json({ message: `${req.params.gymId}로 좋아요 신청` });
};
