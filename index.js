const http = require("http");
const fs = require("fs");

const files = fs.readdirSync("./", { withFileTypes: true });
const htmlFiles = files
  .filter((file) => {
    if (file.name.endsWith(".html") || file.name.endsWith(".css")) {
      return file.name;
    }
  })
  .map((file) => {
    if (file.name.endsWith(".html")) {
        if (file.name === "index.html") {
          return "";
        } else {
          return file.name.slice(0, -5);
        }
      } else {
        return file.name;
      }
  });


const port = process.env.port || 3000;

const server = http.createServer((req, res) => {
    const requestedURL = req.url.slice(1);
    if (htmlFiles.includes(requestedURL)) {
      if (requestedURL.endsWith(".css")) {
        const cssFile = fs.readFileSync("./" + requestedURL, "utf8");
        res.setHeader("Content-Type", "text/css");
        res.end(cssFile);
      } else {
        if (requestedURL === "") {
          const file = fs.readFileSync("./index.html", "utf8");
          res.end(file);
        } else {
          const file = fs.readFileSync("./" + requestedURL + ".html");
          res.end(file);
        }
      }
    } else {
      const file = fs.readFileSync("./404.html", "utf8");
      res.end(file);
    }
});

server.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
});
