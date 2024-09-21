const responseMessages = {
    validationFailed: 'Validation failed',
    operationSuccessful: 'Operation successful',
    notFound: 'Resource not found',
    unauthorized: 'Unauthorized access',
    internalServerError: 'Internal server error',
};

const statusCodes = {
    success: 200,
    created: 201,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    internalServerError: 500,
};

const resError = (res, errors, message, dynamicStatus = false) => {
    let statusCode = statusCodes.badRequest;

    if (dynamicStatus) {
        if (message.toLowerCase().includes('not found')) {
            statusCode = statusCodes.notFound;
        } else if (message.toLowerCase().includes('unauthorized')) {
            statusCode = statusCodes.unauthorized;
        }
    }

    console.error(`[Error ${statusCode}]: ${message}`, errors);

    return res.status(statusCode).json({
        data: null,
        errors: true,
        message: message || responseMessages.validationFailed,
        success: false,
    });
};

const resSuccess = (res, data, message, dynamicStatus = false) => {
    let statusCode = statusCodes.success;

    if (dynamicStatus && data && data.status) {
        statusCode = data.status === 'created' ? statusCodes.created : statusCodes.success;
    }

    return res.status(statusCode).json({
        data,
        errors: false,
        message: message || responseMessages.operationSuccessful,
        success: true,
    });
};

module.exports = { resError, resSuccess };
