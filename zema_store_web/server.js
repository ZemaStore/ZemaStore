let path = require("path");
let fsp = require("fs/promises");
let express = require("express");

let root = process.cwd();
let isProduction = process.env.NODE_ENV === "production";

function resolve(p) {
  return path.resolve(__dirname, p);
}

async function createServer() {
  let app = express();

  app.use("*", async (req, res) => {
    let url = req.originalUrl;

    try {
      let template;
      let render;

      if (!isProduction) {
        template = await fsp.readFile(resolve("index.html"), "utf8");
        template = await vite.transformIndexHtml(url, template);
        render = await vite
          .ssrLoadModule("src/entry.server.tsx")
          .then((m) => m.render);
      } else {
        template = await fsp.readFile(
          resolve("dist/client/index.html"),
          "utf8"
        );
        render = require(resolve("dist/server/entry.server.js")).render;
      }

      let html = template.replace("<!--app-html-->", render(url));
      res.setHeader("Content-Type", "text/html");
      return res.status(200).end(html);
    } catch (error) {
      if (!isProduction) {
        vite.ssrFixStacktrace(error);
      }
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  });

  return app;
}

const PORT = process.env.PORT || 3000;
const server = createServer();
server().then((app) => {
  app.listen(PORT, () => {
    console.log("HTTP server is running at http://localhost:3000");
  });
});
