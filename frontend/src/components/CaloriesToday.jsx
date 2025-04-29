// src/components/CaloriesToday.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  Stack,
} from '@mui/material';

const CaloriesToday = () => {
  const [currentCalories, setCurrentCalories] = useState(0);
  const targetCalories = 2000;

  const [mealCalories, setMealCalories] = useState('');
  const [meals, setMeals] = useState([]);
  const [presetMeals, setPresetMeals] = useState([]);

  // ✅ Fetch pre-saved meals from MongoDB via Express
  useEffect(() => {
    axios
      .get('/api/preset-meals')
      .then((res) => setPresetMeals(res.data))
      .catch((err) => console.error('Error fetching preset meals:', err));
  }, []);

  const handleInputChange = (e) => setMealCalories(e.target.value);

  const handleAddCalories = (e) => {
    e.preventDefault();
    const calorieNumber = parseInt(mealCalories, 10);
    if (!isNaN(calorieNumber) && calorieNumber > 0) {
      const newMeal = {
        calories: calorieNumber,
        name: 'Custom Meal',
        time: new Date().toLocaleTimeString(),
      };
      setMeals([...meals, newMeal]);
      setCurrentCalories(currentCalories + calorieNumber);
      setMealCalories('');
    }
  };

  const handlePresetClick = (meal) => {
    const newMeal = {
      calories: meal.calories,
      name: meal.name,
      time: new Date().toLocaleTimeString(),
    };
    setMeals([...meals, newMeal]);
    setCurrentCalories(currentCalories + meal.calories);
  };

  const handleReset = () => {
    setCurrentCalories(0);
    setMeals([]);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Calories Today
      </Typography>

      <Typography variant="h6" gutterBottom>
        {currentCalories} / {targetCalories}
      </Typography>

      <Box component="form" onSubmit={handleAddCalories} sx={{ mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            type="number"
            label="Meal Calories"
            value={mealCalories}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" variant="contained">
            Add Meal
          </Button>
        </Stack>
      </Box>

      <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ mb: 3 }}>
        Reset Calories
      </Button>

      <Typography variant="h6">Select a Pre-saved Meal:</Typography>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mt: 1, mb: 2 }}>
        {presetMeals.map((meal, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handlePresetClick(meal)}
          >
            {meal.name} ({meal.calories} cal)
          </Button>
        ))}
      </Stack>

      <Typography variant="h6">Meal Log:</Typography>
      <List>
        {meals.map((meal, index) => (
          <ListItem key={index}>
            {meal.name}: {meal.calories} cal at {meal.time}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CaloriesToday;
