const express = require("express");
const processedImage = require("../util/processImage");
const axios = require("axios");
const random = require("../controller/random");
const getImageById = require("../controller/getImageById");
const createNewImage = require("../controller/createNewImage");

function createImageRouter() {
  const router = express.Router();

  router.get("/random", (req, res) => random(req, res, req.imageUrls));
  router.get("/:id", (req, res) => getImageById(req, res, req.imageUrls));
  router.post("/", (req, res) => createNewImage(req, res, req.imageUrls));
  // router.delete("/:id", (req, res) => {});

  return router;
}

module.exports = createImageRouter;
