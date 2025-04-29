// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CaloriesToday from './components/CaloriesToday';
import CreatePresetMeal from './components/CreatePresetMeal';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Diet Tracker
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/recipe">
            Recipe
          </Button>
          <Button color="inherit" component={Link} to="/history">
            History
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/" element={<CaloriesToday />} />
          <Route path="/create-preset" element={<CreatePresetMeal />} />
          <Route path="/recipe" element={<Typography>Recipe Page (Coming Soon)</Typography>} />
          <Route path="/history" element={<Typography>History Page (Coming Soon)</Typography>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
