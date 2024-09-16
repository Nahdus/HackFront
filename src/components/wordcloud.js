import React from 'react';
import WordCloud from 'react-wordcloud'; // Import the word cloud component

function WordCloudPage() {
  const words = [
    { text: 'Incident', value: 1000 },
    { text: 'Critical', value: 800 },
    { text: 'yedukrishnan', value: 600 },
    { text: 'sudhan', value: 1100 },
    { text: 'neelima', value: 900 },
    { text: 'Archana', value: 500 },
    { text: 'Biju', value: 400 },
    { text: 'Alex', value: 700 },
  ];
  const options = {
    rotations: 0, 
    rotationAngles: [0], 
    fontFamily: 'Arial', 
    fontSizes: [20, 80], 
    padding: 5, 
  };
  return (
    <div className="word-cloud-page">
      <h2 className= "card-title">Word Cloud</h2>
      <div className="word-cloud">
          <WordCloud words={words} options={options} />      </div>
    </div>
  );
}

export default WordCloudPage;
