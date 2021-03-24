const protocol = require('http');
const app = require('./app');
// require('./models').sequelize.sync({force:true});

const normalizePort = (val) => {
    var port = parseInt(val,10);
    if (isNaN(port)) {
        //named pipe
        return val;
    }
    if (port >= 0) {
        return port;
    }

    return false;
};

const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = "string" ? "pipe" + addr : "port" + port;
    switch (error.code) {
        case "EACCESS":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE": 
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default: throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
    console.log('\x1b[32m\u2713\x1b[0m \x1b[36mserver is listenning on port\x1b[0m',port);
};

const port = normalizePort(process.env.PORT || 3000); 
app.set('port',port);

const server = protocol.createServer(app);
server.listen(port);
server.on("error",onError);
server.on("listening",onListening);
