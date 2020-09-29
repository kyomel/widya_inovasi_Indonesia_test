exports.success = (message, data) => {
    return ({
        message: message,
        status: 'success',
        data: data
    })
}

exports.error = (message, err) => {
    return ({
        message: message,
        error: err,
        status: 'failed',
        data: null
    })
}