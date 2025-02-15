const http = require("http");
//const fs = require("fs");
const routes=require("./route.js")
const server = http.createServer((routes) => {

});

const port = 3090;
server.listen(port, () => {
    console.log("Server is running on port", port);
});
