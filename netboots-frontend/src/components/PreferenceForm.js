import React, { useState } from 'react';
import axios from 'axios';

function PreferenceForm() {
  const [preferences, setPreferences] = useState({ style: '', color: '' });

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/preferences', {
        userId: 'user123',
        preferences
      });
      alert('Preferences saved successfully');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="style"
        placeholder="Preferred style"
        value={preferences.style}
        onChange={handleChange}
      />
      <input
        type="text"
        name="color"
        placeholder="Preferred color"
        value={preferences.color}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PreferenceForm;
