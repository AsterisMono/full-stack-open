import { useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Anecdote = ({ text, points }) => {
  return (
    <>
      <div>{text}</div>
      <p>has {points} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // eslint-disable-next-line no-unused-vars
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const getRandomAnecdote = () => {
    const randomIndex = getRandomInt(anecdotes.length);
    setSelected(randomIndex);
  };

  const voteForSelected = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  const [selected, setSelected] = useState(0);
  const anecdoteIndexWithMostVotes = points.indexOf(Math.max(...points));

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} points={points[selected]} />
      <button onClick={voteForSelected}>vote</button>
      <button onClick={getRandomAnecdote}>random anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote
        text={anecdotes[anecdoteIndexWithMostVotes]}
        points={points[anecdoteIndexWithMostVotes]}
      />
    </>
  );
};

export default App;
