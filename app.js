const config = require('./config/config');
const constants = require('./config/constants');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const userRoutes = require('./src/routes/user/user.route.js');

// MARK: Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: config.JSON_BODY_LIMIT }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", constants.CORS_OPTIONS.ALLOWED_ORIGINS);
    res.header("Access-Control-Allow-Methods", constants.CORS_OPTIONS.ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", constants.CORS_OPTIONS.ALLOWED_HEADERS);
    res.header("Accept", "*/*");
    res.header("Connection", "keep-alive");
    next();
});

// MARK: Default route
app.get('/', (req, res) => {
    res.status(200).json({
        message: constants.STRINGS.APP_NAME
    });
});

// MARK: Routes
app.use('/user', userRoutes);

// MARK: Error handling
app.use((req, res, next) => {
    const error = new Error(constants.ERROR_MESSAGES.NOT_FOUND);
    error.status = 404;
    next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;