const fs=require("fs");

const requestHandler=(req,res)=>{
    console.log("server is created");
    const url = req.url;
    const method = req.method;

    if (url === '/' && method=="GET") {
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <form action="/" method="POST">
                <label>Name:</label>
                <input type="text" name="username"></input>
                <button type="submit">Add</button>
            </form>
            
        `);
    } else if (url === '/' && method === 'POST') {
        res.setHeader('Content-Type', 'text/html');

        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(body);
        });

        req.on('end', () => {
            let buffer = Buffer.concat(body);
            console.log(buffer);
            let formData = buffer.toString();
            console.log(formData);
            let formValue = formData.split('=')[1]; // Extract value from the form
            formValue=formValue.replaceAll("+"," ");
            fs.writeFile("formValues.txt", formValue, (err) => {
                if (err) {
                    console.log('Error writing to file', err);
                    //return;
                    res.statusCode = 302; // Redirect
                    res.setHeader("Location", "/");
                }
               
            }
        );

        fs.readFile("formValues.txt", (err, data) => {
            if (err) {
                console.log('Error reading file', err);
                res.statusCode = 500;
                res.end('Server error');
                return;
            }
            res.setHeader('Content-Type', 'text/html');
            res.end(`
                <form action="/" method="POST">
                <h1>Hello, ${data.toString()}!</h1>
                    <label>Name:</label>
                    <input type="text" name="username" value="${formValue}"></input>
                    <button type="submit">Add</button>
                    
                </form>
                `);
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
}

const anotherFunction=()=>{
    console.log("We can export more than one function or object through module.exports.")
   }
   module.exports={
       requestHandler
       //anotherFunction
   }