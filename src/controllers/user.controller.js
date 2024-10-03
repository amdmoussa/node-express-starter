const argon = require('argon2');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const { ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../../config/constants');
const { sendErrorResponse, sendSuccessResponse } = require('../../lib/Common');

const signup = async (req, res) => {
    try {
        const userExists = await userService.getUserByEmail(req.body.email);
        if (userExists) {
            return sendErrorResponse(res, 401, ERROR_MESSAGES.AUTHENTICATION_ERROR);
        }

        const hashedPassword = await argon.hash(req.body.password);
        const user = await userService.createUser({
            ...req.body,
            password: hashedPassword,
        });

        const token = jwtSign({
            id: user._id,
            username: user.username
        });

        const userWithoutPassword = { ...user._doc, password: undefined };
        sendSuccessResponse(res, 201, SUCCESS_MESSAGES.USER_SIGNED_UP, { user: userWithoutPassword, token });
    } catch (error) {
        sendErrorResponse(res, 500, ERROR_MESSAGES.SERVER_ERROR, error);
    }
};

const login = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.body.email);
        if (!user) {
            return sendErrorResponse(res, 401, ERROR_MESSAGES.AUTHENTICATION_ERROR);
        }

        const isPasswordValid = await argon.verify(user.password, req.body.password);
        if (!isPasswordValid) {
            return sendErrorResponse(res, 401, ERROR_MESSAGES.INVALID_PASSWORD);
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        sendSuccessResponse(res, 200, SUCCESS_MESSAGES.USER_LOGGED_IN, { token });
    } catch (error) {
        sendErrorResponse(res, 500, ERROR_MESSAGES.SERVER_ERROR, error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        sendSuccessResponse(res, 200, SUCCESS_MESSAGES.RESOURCE_FETCHED, users);
    } catch (error) {
        sendErrorResponse(res, 500, ERROR_MESSAGES.ERROR_FETCHING_DATA, error);
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            return sendErrorResponse(res, 404, ERROR_MESSAGES.NOT_FOUND);
        }

        sendSuccessResponse(res, 200, SUCCESS_MESSAGES.RESOURCE_FETCHED, user);
    } catch (error) {
        sendErrorResponse(res, 500, ERROR_MESSAGES.ERROR_FETCHING_DATA, error);
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await userService.updateUser(id, req.body);
        if (!updatedUser) {
            return sendErrorResponse(res, 404, ERROR_MESSAGES.NOT_FOUND);
        }

        sendSuccessResponse(res, 200, SUCCESS_MESSAGES.RESOURCE_UPDATED, updatedUser);
    } catch (error) {
        sendErrorResponse(res, 500, ERROR_MESSAGES.ERROR_UPDATING_RESOURCE, error);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            return sendErrorResponse(res, 404, ERROR_MESSAGES.NOT_FOUND);
        }

        sendSuccessResponse(res, 200, SUCCESS_MESSAGES.RESOURCE_DELETED, deletedUser);
    } catch (error) {
        sendErrorResponse(res, 500, ERROR_MESSAGES.ERROR_DELETING_RESOURCE, error);
    }
};

const jwtSign = (payload) => {
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '3d' });
};

module.exports = {
    signup,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};