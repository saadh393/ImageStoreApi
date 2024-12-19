const axios = require("axios");
const processImage = require("../util/processImage");

async function getImageById(req, res, imageUrls) {
  try {
    const quality = req.query.q;
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const imageUrl = imageUrls[randomIndex];

    const response = await axios({
      url: imageUrl,
      responseType: "arraybuffer",
    });

    const processedImage = await processImage(response.data, quality);

    res.set("Content-Type", "image/jpeg");
    res.send(processedImage);
  } catch (error) {
    console.error("Error fetching random image:", error);
    res.status(500).send("Error processing image");
  }
}

module.exports = getImageById;
