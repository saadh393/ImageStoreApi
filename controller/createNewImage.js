const axios = require("axios");

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

    // Check for duplicates
    if (imageUrls.includes(imageUrl)) {
      return res.status(409).json({
        message: "Image URL already exists",
        imageUrl,
      });
    }

    // Add new URL to database
    await req.db.addImageUrl("property", imageUrl);

    res.status(201).json({
      message: "Image URL added successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Error creating new image:", error);
    res.status(500).send("Error processing request");
  }
}

module.exports = createNewImage;
