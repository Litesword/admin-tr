import React, { useState } from 'react';
import './hrQuestions.css';

function HRQuestions() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

 const handleSubmit = (event) => {
  event.preventDefault();
  if (!question.trim() || !answer.trim()) {
    alert('Both fields are required');
    return;
  }
  // Here you can handle the submission, e.g., send the data to the server
  console.log(`Question: ${question}, Answer: ${answer}`);
  setQuestion('');
  setAnswer('');
};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question:
        <input type="text" value={question} onChange={e => setQuestion(e.target.value)} />
      </label>
      <label>
        Answer:
        <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default HRQuestions;