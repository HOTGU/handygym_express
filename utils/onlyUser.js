export default (req, res, next) => {
    if (req.user) {
        next();
    }
    // flash 처리
    console.log("유저가 아닙니다");
    return res.status(401);
};
