// backend/server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db.js';
import PresetMeal from './models/presetMealSchema.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

connectDB();//connect to database

app.use(express.json()); // Parse JSON body requests
app.use(cors());        // Handle frontend-backend cross-origin requests


// ES module __dirname setup clearly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Temporary in-memory storage (replace later with database)
// let presetMeals = [
//   { name: 'Chicken Salad', calories: 350 },
//   { name: 'Avocado Toast', calories: 250 },
// ];

// Endpoint to get pre-saved meals
app.get('/api/preset-meals', async (req, res) => {
  try{
    const meals = await PresetMeal.find().sort({created: -1});
    res.json(meals)
  }catch(err){
    console.error(err)
    res.status(500).json({ message: 'Server error'})
  }
});

// Endpoint to create a new pre-saved meal
app.post('/api/preset-meals', async (req, res) => {
  const { name, calories } = req.body;

  if (!name || !calories) {
    return res.status(400).json({ message: 'Meal name and calories are required.' });
  }
  try{  
    const newMeal = new PresetMeal({ name, calories})
    await newMeal.save()
    res.status(201).json({ message: 'Pre-saved meal added successfully', meal: newMeal})
  }catch(err){
     console.error(err);
     res.status(500).json({ message: 'Server Error'}) 
  }
});
// Serve static frontend (optional later when built)
// app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.static(path.join(__dirname, '../frontend/build')))// serve static frontend in  production

// Start your backend server clearly
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express backend running clearly on port ${PORT}`);
});
