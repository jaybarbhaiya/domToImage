import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const port = 3000;

const server = http.createServer((req, res) => {
	let fileReqPath = "." + req.url;
	let contentType = "";

	if (fileReqPath === "./") {
		fileReqPath = "./index.html";
		contentType = "text/html";
	} else {
		let fileExtension = path.extname(req.url);
		switch(fileExtension) {
			case '.css':
				contentType = "text/css";
				break;
			case '.js':
				contentType = "text/javascript";
				let aFilePathParts = req.url.split("/").filter(sPath => sPath.length);
				if (aFilePathParts.length > 1) {
					fileReqPath = "./node_modules/" + aFilePathParts[1] + "/dist/" + aFilePathParts[2];
				}
				break;
		}
	}

	fs.readFile(fileReqPath, "UTF-8", (error, data) => {
		if (error) {
			res.writeHead(404);
			res.write("File not found");
		} else {
			res.writeHead(200, {
				'Content-Type' : contentType
			});
			res.end(data);
		}
	});
});

server.listen(port, (error) => {
	if (error) {
		console.log("Something when wrong");
	} else {
		console.log("Server listening on http://localhost:" + port);
	}
})