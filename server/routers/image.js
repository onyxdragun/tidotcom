import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { getDirname } from '../utils.js';
import { Image } from '../models/Image.js';

const router = new express.Router();
const __dirname = getDirname(import.meta.url);

const uploadsDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, {recursive: true});
}

// Configure Multer
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

//----------- Middleware ----------------------------------------------
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});

//----------- Routes --------------------------------------------------
// Create a new image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    const image = new Image({
      title: req.body.title,
      filename: `${req.file.filename}`
    });

    await image.save();
    res.status(201).send({ image });
  } catch (error) {
    res.status(500).send({error: 'Error uploading the image', details: error});
  }
});

router.get('/images', async (req, res) => {
  const {category} = req.query;
  try {
    const query = category ? {category} : {};
    const results = await Image.find(query);
    const images = results.sort(() => {
      return Math.random() - 0.5;
    });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/image/:image_id', async (req, res) => {
  const {image_id} = req.params;

  try {
    const deletedImage = await Image.findOneAndDelete({image_id});
    if (!deletedImage) {
      return res.status(404).json({error: 'Image not found'});
    }
    const imagePath = path.join(__dirname, '../uploads', deletedImage.filename);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting the file: ', err);
      }
    });
    return res.status(200).json({message: 'Image deleted successfully'});

  } catch(error) {
    return res.status(500).json({error: 'Server error', details: error.message});
  }
});

export { router }