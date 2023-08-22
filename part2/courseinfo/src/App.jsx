const Header = ({ course }) => {
  return <h1>{course}</h1>;
};
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};
const Content = ({ parts }) => {
  return parts.map((part) => (
    <Part key={part.name} name={part.name} exercises={part.exercises} />
  ));
};
const Total = ({ parts }) => {
  const exerciseCount = parts
    .map((part) => part.exercises)
    .reduce((p, c) => p + c, 0);
  return <p>Number of exercises {exerciseCount}</p>;
};
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
