const constants = require('../config/constants');

// MARK: Success responses
/**
 * Sends a success response.
 * @param {Object} res - The Express response object.
 * @param {number} status - HTTP status code.
 * @param {string} message - Success message.
 * @param {Object|null} data - Optional data to send in response.
 */
function sendSuccessResponse(res, status, message, data = null) {
    res.status(status).json({
        message: message,
        data: data
    });
}

// 200 OK
function sendOkResponse(res, message, data = null) {
    sendSuccessResponse(res, 200, message, data);
}

// 201 Created
function sendCreatedResponse(res, message, data = null) {
    sendSuccessResponse(res, 201, message, data);
}

// 204 No Content
function sendNoContentResponse(res) {
    res.status(204).send();
}

// MARK: Error responses
/**
 * Sends an error response.
 * @param {Object} res - The Express response object.
 * @param {number} status - HTTP status code.
 * @param {string} message - Human-readable error message.
 * @param {string|null} error - Optional error details.
 */
function sendErrorResponse(res, status, message, error = null) {
    res.status(status).json({
        message,
        error: error || null
    });
}

// 404 Not Found
function sendNotFoundResponse(res, message = constants.ERROR_MESSAGES.NOT_FOUND) {
    sendErrorResponse(res, 404, message);
}

// 500 Internal Server Error
function sendServerErrorResponse(res, message = constants.ERROR_MESSAGES.SERVER_ERROR) {
    sendErrorResponse(res, 500, message);
}

module.exports = {
    sendSuccessResponse,
    sendOkResponse,
    sendCreatedResponse,
    sendNoContentResponse,
    sendErrorResponse,
    sendNotFoundResponse,
    sendServerErrorResponse,
};
