const getDate = (req, res, next) => {
    req.date = new Date();
    next();
};

const showRandom = () => {
    console.log(Math.random())
}

module.exports.getDate = getDate;
module.exports.random = showRandom;