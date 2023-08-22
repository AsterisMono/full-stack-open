import { useState } from "react";
const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = good / all;
  const ifFeedbackGiven = !(good === 0 && neutral === 0 && bad === 0);

  return (
    <>
      <h1>statistics</h1>
      {ifFeedbackGiven ? (
        <>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive * 100}%`} />
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const Button = ({ text, variable, setVariable }) => (
  <button onClick={() => setVariable(variable + 1)}>{text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" variable={good} setVariable={setGood} />
      <Button text="neutral" variable={neutral} setVariable={setNeutral} />
      <Button text="bad" variable={bad} setVariable={setBad} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
