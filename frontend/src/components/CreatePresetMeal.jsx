import React, { useState } from 'react';
import axios from 'axios';

const CreatePresetMeal = () => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/preset-meals', { name, calories })//need change later into dynamic location
      .then(() => alert('Meal created!'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Meal Name" 
        required 
      />
      <input 
        value={calories} 
        type="number"
        onChange={e => setCalories(e.target.value)} 
        placeholder="Calories" 
        required 
      />
      <button type="submit">Save Meal</button>
    </form>
  );
};

export default CreatePresetMeal;
