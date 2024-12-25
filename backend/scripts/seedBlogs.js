import mongoose from 'mongoose';
import Blog from '../models/Blog.js'; // Adjust the path if needed

// Sample blog data
const blogs = [
  {
    img: 'https://res.cloudinary.com/dzv4k4csm/image/upload/v1735125431/xpmb6njytgkjatgyrjnd.png',
    date: '20 Jan, 2024',
    title: 'Repair Your Samsung Line Issues with DIY',
    author: 'Don Maarij',
  },
  {
    img: 'https://res.cloudinary.com/dzv4k4csm/image/upload/v1735125431/um4z1f0a1o3qmeiau5qg.png',
    date: '20 Jan, 2024',
    title: 'Fix Your Broken Screen: A Step-by-Step Guide',
    author: 'Abdullah Burger',
  },
  {
    img: 'https://res.cloudinary.com/dzv4k4csm/image/upload/v1735125431/o8kxyyfckvrvk8xeiffa.png',
    date: '20 Jan, 2024',
    title: 'How to Repair Your Smartphone Battery Issues',
    author: 'Taha Bukhari',
  },
];

const seedBlogs = async () => {
  try {
    // Connect to the database
    await mongoose.connect('mongodb://localhost:27017/blogDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing blogs
    await Blog.deleteMany();
    console.log('Existing blogs deleted');

    // Insert sample data
    await Blog.insertMany(blogs);
    console.log('Sample blogs added');

    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

// Run the seeding function
seedBlogs();
