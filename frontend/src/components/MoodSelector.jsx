import React, { useState } from 'react';

export default function MoodSelector({ onSelectMood }) {
  const [selectedMood, setSelectedMood] = useState('');

  const moods = ['Happy', 'Sad', 'Excited', 'Relaxed', 'Bored'];

  function handleChange(event) {
    const mood = event.target.value;
    setSelectedMood(mood);
    onSelectMood(mood);
  }

  return (
    <div>
      <label htmlFor="mood-select">Select your mood:</label>
      <select id="mood-select" value={selectedMood} onChange={handleChange}>
        <option value="" disabled>Select mood</option>
        {moods.map(mood => (
          <option key={mood} value={mood}>{mood}</option>
        ))}
      </select>
    </div>
  );
}
