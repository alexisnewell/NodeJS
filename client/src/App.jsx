import { useState } from 'react';

function App() {
  const [lyrics, setLyrics] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeLyrics = async () => {
    const response = await fetch('http://localhost:3000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lyrics }),
    });

    const data = await response.json();
    setAnalysis(data);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Lyrics Sentiment Analyzer</h1>

      <textarea
        rows="12"
        cols="60"
        placeholder="Paste song lyrics here..."
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
      />

      <br /><br />

      <button onClick={analyzeLyrics}>
        Analyze Lyrics
      </button>

      {analysis && (
        <div style={{ marginTop: '30px' }}>
          <h2>Results</h2>

          <p><strong>Word Count:</strong> {analysis.wordCount}</p>

          <p><strong>Sentiment Score:</strong> {analysis.score}</p>

          <p>
            <strong>Mood:</strong>{' '}
            {analysis.score > 0
              ? 'Positive'
              : analysis.score < 0
              ? 'Negative'
              : 'Neutral'}
          </p>

          <h3>Top Words</h3>

          <ul>
            {analysis.topWords.map(([word, count]) => (
              <li key={word}>
                {word}: {count}
              </li>
            ))}
          </ul>
          {analysis.guess ? (
            <div
              style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#0ce5f5',
                borderRadius: '10px',
              }}
            >
              <h2>Song Guess</h2>

              <p style={{ fontSize: '22px' }}>
                {analysis.guess.title}
              </p>

              <p>
                by {analysis.guess.artist}
              </p>

              <p>
                Confidence Score:{' '}
                {analysis.guess.confidence}
              </p>
            </div>
          ) : (
            <p>No matching song found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;