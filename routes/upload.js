const express = require("express");
const router = express.Router();
const upload = require("../controller/upload");
router.post("/single", upload.single("image"), (req, res) => {
   res.send(`/${req.file.path}`);
});

router.post("/array", upload.array("listImage", 12), (req, res) => {
   res.json(req.files);
});

module.exports = router;
