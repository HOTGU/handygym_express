export default (req, res, next) => {
    if (req.user) {
        next();
    }
    // flash 처리
    return res.status(401);
};
