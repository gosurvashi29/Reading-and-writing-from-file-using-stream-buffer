const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log("server is created");
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <form action="/message" method="POST">
                <label>Name:</label>
                <input type="text" name="username"></input>
                <button type="submit">Add</button>
            </form>
        `);
    } else if (url === '/message' && method === 'POST') {
        res.setHeader('Content-Type', 'text/html');

        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            let buffer = Buffer.concat(body);
            console.log(buffer);
            let formData = buffer.toString();
            console.log(formData);
            let formValue = formData.split('=')[1]; // Extract value from the form
            fs.writeFile("formValues.txt", formValue, (err) => {
                if (err) {
                    console.log('Error writing to file', err);
                }
                res.statusCode = 302; // Redirect
                res.setHeader("Location", "/");
                res.end();
            });
        });

    } else if (url === '/read') {
        fs.readFile("formValues.txt", (err, data) => {
            if (err) {
                console.log('Error reading file', err);
                res.statusCode = 500;
                res.end('Server error');
                return;
            }
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>${data.toString()}</h1>`);
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

const port = 3090;
server.listen(port, () => {
    console.log("Server is running on port", port);
});
