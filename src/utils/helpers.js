
const responseFormatter = (res, payload, code = "200", message = "successful!") => {
    return res.status(code).json({
        status: code,
        message,
        payload,
    })
}

module.exports = { responseFormatter }