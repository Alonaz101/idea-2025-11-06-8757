import React, { useState, useEffect } from 'react';
import MoodSelector from './components/MoodSelector';

export default function App() {
  const [mood, setMood] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (mood) {
      fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood })
      })
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Failed to fetch recipes:', err));
    }
  }, [mood]);

  return (
    <div>
      <h1>Mood-Based Recipe Recommender</h1>
      <MoodSelector onSelectMood={setMood} />
      <div>
        {recipes.length === 0 ? <p>No recipes to display.</p> : (
          <ul>
            {recipes.map(recipe => (
              <li key={recipe.id}>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
