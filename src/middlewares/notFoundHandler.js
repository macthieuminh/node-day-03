const notFoundHandler = (_, res, next) => {
    res.error(404, 'Resource not found')
    next()
};

module.exports = notFoundHandler;