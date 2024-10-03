module.exports = {
    CORS_OPTIONS: {
        ALLOWED_HEADERS: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        ALLOWED_METHODS: 'OPTIONS, GET, POST, PUT, DELETE',
        ALLOWED_ORIGINS: '*',
    },
    ERROR_MESSAGES: {
        AUTHENTICATION_ERROR: 'Authentication error',
        ERROR_CREATING_RESOURCE: 'Error creating resource',
        ERROR_DELETING_RESOURCE: 'Error deleting resource',
        ERROR_FETCHING_DATA: 'Error fetching data',
        ERROR_UPDATING_RESOURCE: 'Error updating resource',
        INVALID_PASSWORD: 'Invalid password',
        NOT_FOUND: 'Resource not found',
        SERVER_ERROR: 'Internal server error',
        UNAUTHORIZED: 'Unauthorized'
    },
    STRINGS: {
        APP_NAME: 'Node Express Starter by @devSpagette'
    },
    SUCCESS_MESSAGES: {
        RESOURCE_CREATED: 'Resource created successfully',
        RESOURCE_DELETED: 'Resource deleted',
        RESOURCE_FETCHED: 'Resource fetched',
        RESOURCE_UPDATED: 'Resource updated',
        USER_LOGGED_IN: 'User logged in successfully',
        USER_SIGNED_UP: 'User signed up successfully',
    },
};