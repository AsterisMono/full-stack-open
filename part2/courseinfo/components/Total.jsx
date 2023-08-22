export const Total = ({ parts }) => {
  const exerciseCount = parts.reduce((p, c) => p + c.exercises, 0);
  return <p>Number of exercises {exerciseCount}</p>;
};
