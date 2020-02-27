const router = require("express").Router();
const Path = require("path");

router.get("/:filename", (req, res) => {
  const filePath = Path.resolve(
    __dirname,
    "../../../",
    "assets",
    req.params.filename
  );
  res.sendFile(filePath);
});

module.exports = router;
