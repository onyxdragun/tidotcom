import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: '',
  },
  image_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
},
{
  timestamps: true
});

const Image = new mongoose.model('Image', imageSchema);

export {Image}
