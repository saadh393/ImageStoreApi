const fs = require("fs").promises;
const axios = require("axios");
const path = require("path");
const cache = require("../main"); // Import cache

async function createNewImage(req, res, imageUrls) {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).send("Image URL is required");
  }

  try {
    // Validate image URL
    const response = await axios.head(imageUrl);
    if (!response.headers["content-type"].includes("image")) {
      return res.status(400).send("URL is not an image");
    }

    // Get current URLs from cache
    const currentData = imageUrls;

    // Add new URL if not exists
    if (!currentData.includes(imageUrl)) {
      currentData.push(imageUrl);
      req.cache.updateData();

      // File watcher will automatically update cache
      res.status(201).json({
        message: "Image URL added successfully",
        imageUrl,
      });
    } else {
      res.status(409).json({
        message: "Image URL already exists",
        imageUrl,
      });
    }
  } catch (error) {
    console.error("Error creating new image:", error);
    res.status(500).send("Error processing request");
  }
}

module.exports = createNewImage;
