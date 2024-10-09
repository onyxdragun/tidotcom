import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';

import { getDirname } from '../utils.js';
import { dbPool, debugQuery } from '../db.js';
// import { Image } from '../models/Image.js';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const router = new express.Router();
const __dirname = getDirname(import.meta.url);
const uploadsDir = process.env.UPLOADS_DIR;

console.log(uploadsDir);

async function ensureUploadsDirection() {
  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir, {recursive: true});
    console.log(`Uploads directory created at ${uploadsDir}`);
  }
}

// ensureUploadsDirection().catch(error => {
//   console.error('Error ensuring uploads directory: ', error);
// })

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
    console.log(req.body);
    const values = [
      req.body.cat_id,
      req.file.filename,
      req.body.title,
      req.body.keywords,
      req.body.info
    ];
    const query = `
      INSERT INTO photo (cat_id, filename, title, keywords, info, date_uploaded)
      VALUES(?, ?, ?, ?, ?, NOW())
      `;
    console.log(debugQuery(query, values));
    const [result] = await dbPool.query(query, values);

    res.status(201)
      .location(`/image/${result.insertId}`)
      .json({
        message: 'Photo uploaded successful!',
        photoId: result.insertId
      });
  } catch (error) {
    res.status(500).send({ error: 'Error uploading the image', details: error });
  }
});

router.get('/images', async (req, res) => {
  const { category } = req.query;
  try {
    const query = `
    SELECT 
          p.id AS photo_id,
          p.filename,
          p.title,
          p.info,
          p.keywords,
          p.views,
          p.date_uploaded,
          c.name AS category_name
      FROM 
          photo p
      JOIN 
          photo_cat c ON p.cat_id = c.id
    `;
    const [rows] = await dbPool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error executing query: ', error.message);
    res.status(500).send(error);
  }
});

router.delete('/image/:image_id', async (req, res) => {
  const imageId = req.params.image_id;

  try {
    const [rows] = await dbPool.query('SELECT filename FROM photo WHERE id = ?', [imageId]);

    if (rows.length === 0) {
      return res.status(404).json({message: 'Image not found'});
    }

    const filename = rows[0].filename;
    const query = 'DELETE FROM photo WHERE id = ?';
    const [result] = await dbPool.query(query, [imageId]);
  
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const imagePath = path.join(uploadsDir, filename);
    await fs.unlink(imagePath);

    return res.status(200).json({ message: 'Image deleted successfully' });

  } catch (error) {
    console.error('Error processing request: ', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});

export { router }