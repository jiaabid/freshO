const app = require("express")()
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
module.exports ={ httpServer,io}