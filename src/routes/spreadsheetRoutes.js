const express = require("express");
const router = express.Router();
const controller = require("../controllers/spreadsheetcontroller");

router.get("/all", controller.getAllCells);
router.post("/set", controller.setCell);
router.post("/reset", controller.resetCell);
router.post("/value", controller.getValue);

module.exports = router;
