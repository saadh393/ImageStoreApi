const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const createImageRouter = require("./util/routeFactory");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Database setup
const db = new sqlite3.Database("images.db", (err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to SQLite database");
    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Database interface
const dbInterface = {
  async getImageUrls(category) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT url FROM images WHERE category = ?",
        [category],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows.map((row) => row.url));
        }
      );
    });
  },

  async addImageUrl(category, url) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO images (category, url) VALUES (?, ?)",
        [category, url],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  },
};

// Middleware to attach database interface to requests
app.use(
  "/property",
  async (req, res, next) => {
    try {
      req.imageUrls = await dbInterface.getImageUrls("property");
      req.db = dbInterface;
      next();
    } catch (err) {
      next(err);
    }
  },
  createImageRouter()
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, () => {
  console.log(`Image proxy server running at http://localhost:${port}`);
});

// Export app for use in other modules
module.exports = app;
