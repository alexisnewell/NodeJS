const express = require('express');
const cors = require('cors');
const Sentiment = require('sentiment');
const songs = require('./songs.json');

const app = express();
const sentiment = new Sentiment();

app.use(cors());
app.use(express.json());

app.post('/analyze', (req, res) => {
    const { lyrics } = req.body;

    if (!lyrics) {
        return res.status(400).json({
            error: 'No lyrics provided'
        });
    }

    
    // SENTIMENT ANALYSIS


    const sentimentResult = sentiment.analyze(lyrics);

    // WORD PROCESSING


    const words = lyrics
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/);


    // WORD FREQUENCY


    const frequency = {};

    words.forEach(word => {
        if (word.length > 3) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
    });

    const topWords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);


    // SONG GUESSING


    let bestMatch = null;
    let highestScore = 0;

    songs.forEach(song => {
        let score = 0;

        song.keywords.forEach(keyword => {
            if (
                lyrics
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
            ) {
                score++;
            }
        });

        if (score > highestScore) {
            highestScore = score;
            bestMatch = song;
        }
    });


    // MOOD LABEL
  

    let mood = 'Neutral';

    if (sentimentResult.score > 0) {
        mood = 'Positive';
    } else if (sentimentResult.score < 0) {
        mood = 'Negative';
    }


    // RESPONSE


    res.json({
        mood,
        sentimentScore: sentimentResult.score,
        comparativeScore: sentimentResult.comparative,
        positiveWords: sentimentResult.positive,
        negativeWords: sentimentResult.negative,
        wordCount: words.length,
        topWords,

        guess: bestMatch
            ? {
                  title: bestMatch.title,
                  artist: bestMatch.artist,
                  confidence: highestScore
              }
            : null
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});