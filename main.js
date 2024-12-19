const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs").promises;
const chokidar = require("chokidar"); // You'll need to install this: npm install chokidar
const path = require("path");
const createImageRouter = require("./util/routeFactory");

app.use(express.json());

// Cache mechanism
const cache = {
  imageUrls: {},
  async updateData() {
    try {
      await fs.writeFile(
        path.join(__dirname, "data.json"),
        JSON.stringify(this.imageUrls, null, 2)
      );
    } catch (error) {
      console.error("Error updating cache:", error);
    }
  },
  async updateCache() {
    try {
      const data = await fs.readFile(
        path.join(__dirname, "data.json"),
        "utf-8"
      );
      this.imageUrls = JSON.parse(data);
      console.log("Cache updated successfully");
    } catch (error) {
      console.error("Error updating cache:", error);
    }
  },
};

// File watcher
const watcher = chokidar.watch(path.join(__dirname, "data.json"), {
  persistent: true,
});

watcher.on("change", async (path) => {
  console.log(`File ${path} has been changed`);
  await cache.updateCache();
});

// Initialize cache before starting server
async function initializeServer() {
  await cache.updateCache();

  // Use cached data in router
  app.use(
    "/property",
    (req, res, next) => {
      req.imageUrls = cache.imageUrls.property;
      req.cache = cache;
      next();
    },
    createImageRouter()
  );

  app.get("/", (req, res) => {
    res.json(cache.imageUrls);
  });

  app.listen(port, () => {
    console.log(`Image proxy server running at http://localhost:${port}`);
  });
}

initializeServer();

// Export cache for use in other modules
module.exports = cache;
