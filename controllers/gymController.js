import Gym from "../models/Gym.js";
import User from "../models/User.js";

export const fetch = async (req, res) => {
    const {
        query: { page = 1 },
    } = req;
    const searchQuery = new Object();
    try {
        if (Number(page) <= 0) {
            res.redirect("/gym?page=1");
            return;
        }
        if (req.query.searchTerm) {
            searchQuery.$or = [
                { name: { $regex: req.query.searchTerm } },
                { location: { $regex: req.query.searchTerm } },
            ];
        }
        if (req.query.oneday) {
            searchQuery.oneday = "가능";
        }
        if (req.query.yearRound) {
            searchQuery.yearRound = "네";
        }
        const LIMIT_SIZE = 10;
        const SKIP_PAGE = (page - 1) * LIMIT_SIZE;
        const TOTAL_GYMS = await Gym.countDocuments(searchQuery);
        const TOTAL_PAGE = Math.ceil(TOTAL_GYMS / LIMIT_SIZE) || 1;
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
    try {
        const currentUser = await User.findById(String(req.user._id)).populate(
            "like_gyms"
        );
        const gyms = currentUser.like_gyms;
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
        const gym = await Gym.findById(req.params.gymId).populate("creator");
        return res.render("gymDetail", { title: gym.name, gym });
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

        const updatedGym = await Gym.findByIdAndUpdate(gymId, {
            ...body,
            photos: returnPath.length > 0 ? returnPath : gym.photos,
        });

        req.flash("success", "업데이트 성공");

        return res.redirect(`/gym/${updatedGym._id}`);
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (req, res) => {
    console.log("api 요청 들어옴");
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

        console.log("삭제전");
        await gym.remove();
        console.log("삭제후");

        req.flash("success", "삭제 성공");
        return res.redirect("/gym");
        return res.status(200).json({ message: "ok" });
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
        const currentUser = await User.findById(userId);
        const currentGym = await Gym.findById(gymId);
        const existsUser = currentGym.like_users.includes(userId);
        if (existsUser) {
            const deletedUserArr = currentGym.like_users.filter(
                (user) => user !== userId
            );
            const deletedGymArr = currentUser.like_gyms.filter(
                (gym) => String(gym._id) !== String(gymId)
            );
            currentGym.like_users = deletedUserArr;
            currentUser.like_gyms = deletedGymArr;
        } else {
            currentGym.like_users.push(String(userId));
            currentUser.like_gyms.push(currentGym._id);
        }
        await currentUser.save();
        await currentGym.save();
        return res.status(200).json();
    } catch (error) {}
    res.status(200).json({ message: `${req.params.gymId}로 좋아요 신청` });
};
