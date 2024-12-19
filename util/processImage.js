const sharp = require("sharp");

async function processImage(imageBuffer, quality) {
  try {
    return await sharp(imageBuffer)
      .jpeg({ quality: parseInt(quality) || 80 })
      .toBuffer();
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}

module.exports = processImage;
