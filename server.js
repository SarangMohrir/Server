const http = require('http')
const fs = require("fs")
const path = require('path')

const port = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url)
    const extName = String(path.extname(filePath)).toLowerCase()

    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'text/png',
    } //Type of file I am supporting/ I am alowing only these extensions
    const contentType = mimeTypes[extName] || 'application/octet-stream';

    //Upto this point we only grab files address now we are going for serving content using fs

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === "ENOENT") {
                res.writeHead(404, {"content-type": 'text/html'});
                res.end("404: File not found BROOOoOooOoO.......")
            }
        } else {
            res.writeHead(200, {'content-type': contentType});
            res.end(content, 'utf-8');
        }
    })
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});