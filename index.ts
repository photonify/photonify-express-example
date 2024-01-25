import express from "express";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import photonify from "photonify";

const app = express();

const upload = multer();

//Configure dotenv to set environment variables
dotenv.config();

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

//Test using filesystem storage
app.post("/filesystem_test", upload.single("photo"), async (req, res) => {
  if (req.file) {
    const result = await photonify.processFiles([req.file.buffer], {
      outputDest: path.join(process.cwd(), "tmp_resized_images"),
    });

    return res.status(201).json({ createdFiles: result.createdFiles });
  }

  res.sendStatus(400);
});

//Test using S3 storage
app.post("/s3_test", (req, res) => {});

const PORT = 9000;

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}...`);
});
