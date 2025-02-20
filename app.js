document.addEventListener('DOMContentLoaded', function() {
  const moodForm = document.getElementById('mood-form');
  const historyList = document.getElementById('history-list');

  // Load existing entries from localStorage (optional backend can save this data)
  const loadEntries = () => {
    const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
    historyList.innerHTML = '';
    entries.forEach(entry => {
      const div = document.createElement('div');
      div.classList.add('history-entry');
      div.innerHTML = `
        <p><strong>Mood:</strong> ${entry.mood}</p>
        <p><strong>Notes:</strong> ${entry.note}</p>
        <p><strong>Timestamp:</strong> ${entry.timestamp}</p>
      `;
      historyList.appendChild(div);
    });
  };

  loadEntries();

  // Handle form submission
  moodForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const mood = document.getElementById('mood').value;
    const note = document.getElementById('note').value.trim();

    if (!mood || !note) {
      alert('Please fill out both fields.');
      return;
    }

    const timestamp = new Date().toLocaleString();
    const newEntry = { mood, note, timestamp };

    // Save the new entry in localStorage
    const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
    entries.push(newEntry);
    localStorage.setItem('moodEntries', JSON.stringify(entries));

    // Clear the form and reload entries
    moodForm.reset();
    loadEntries();
  });
});
