const express = require("express");
const processImage = require("../util/processImage");
const { default: axios } = require("axios");
const router = express.Router();

const imageUrls = [
  "https://a0.muscache.com/im/pictures/756a3baf-6756-487b-a89e-caaa3fa3ccc1.jpg?im_w=720&im_format=avif",
];

router.get("/random", async (req, res) => {
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
});

router.get("/:id", async (req, res) => {
  try {
    const quality = req.query.q;
    const id = req.params.id;
    const imageUrl = imageUrls[id % imageUrls.length];

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
});

router.post("/", (req, res) => {
  const imageUrl = req.body.url;

  if (!imageUrl) {
    return res.status(400).send("Image URL is required");
  }

  // Check Duplicate
  if (imageUrls.includes(imageUrl)) {
    return res.status(400).send("Image URL already exists");
  }

  // Check if the url is actually an image url with network call
  axios
    .head(imageUrl)
    .then((response) => {
      if (!response.headers["content-type"].includes("image")) {
        return res.status(400).send("URL is not an image");
      }
    })
    .catch((error) => {
      console.error("Error checking image URL:", error);
      return res.status(400).send("Error checking image URL");
    });

  imageUrls.push(imageUrl);
  res.status(201).send("Image URL added successfully");
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (id >= imageUrls.length) {
    return res.status(404).send("Image URL not found");
  }

  imageUrls.splice(id, 1);
  res.send("Image URL deleted successfully");
});

module.exports = router;
