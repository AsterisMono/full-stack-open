export const Total = ({ parts }) => {
  const exerciseCount = parts.reduce((p, c) => p + c.exercises, 0);
  return (
    <p>
      <b>Total of {exerciseCount} exercises</b>
    </p>
  );
};
