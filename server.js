const app = require('./app');
const config = require('./config/config');
const http = require('http');
const { logInfo } = require('./lib/CommonLogger');

const port = config.PORT;
const server = http.createServer(app);

server.listen(port, () => {
    logInfo(`Server is running on port ${port}`);
});