const http = require("http");
//const fs = require("fs");
const routes=require("./route.js")
//routes.requestHandler();
const server = http.createServer(routes.requestHandler)

const port = 3070;
server.listen(port, () => {
    console.log("Server is running on port", port);
});
