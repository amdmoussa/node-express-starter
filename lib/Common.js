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

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
};
