import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import Blog from './models/Blog.js'; // Adjust the path based on your structure
import { fileURLToPath } from 'url';
import cloudinary from 'cloudinary';

// Initialize Cloudinary
cloudinary.v2.config({
  cloud_name: 'dzv4k4csm', // Replace with your Cloudinary cloud name
  api_key: '715823489894515',        // Replace with your API key
  api_secret: 'NPJGipcdt1iDtFxyC5IZW_DDU3I',  // Replace with your API secret
});

const app = express();
const PORT = 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files from the public/assets directory
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// API to get blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err });
  }
});

// Endpoint to upload images to Cloudinary
app.post('/api/upload', async (req, res) => {
  const { imageFile } = req.body; // Expecting base64 image data

  try {
    const result = await cloudinary.v2.uploader.upload(imageFile, {
      folder: 'your_folder_name', // Optional: specify a folder in Cloudinary
      resource_type: 'image',
    });

    const newBlog = new Blog({
      img: result.secure_url, // URL from Cloudinary
      date: new Date(),       // Current date
      title: 'Sample Title',    // Example title
      author: 'Sample Author',   // Example author
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: 'Error uploading image', error: err });
  }
});

// Basic home route
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API!');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));