import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import Profile from './src/models/Profile.model.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Profile.deleteMany({});
    
    await Profile.create({
      name: "Admin User",
      nameParts: { first: "Admin", last: " User" },
      titles: ["Developer", "Designer"],
      tagline: "Welcome to your new portfolio backend.",
      hireEmail: process.env.ADMIN_EMAIL || "admin@example.com",
      avatarUrl: "",
    });

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Error with Data Seeding:', error);
    process.exit(1);
  }
};

seedData();
