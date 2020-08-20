import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};

const Content = ({ course }) => {
  const renderedItems = course.parts.map((part) => {
    return <Part key={part.name} name={part.name} exercises={part.exercises} />;
  });

  return <div>{renderedItems}</div>;
};

const Total = ({ course }) => {
  const numExercises = course.parts.reduce(
    (acc, curr) => acc + curr.exercises,
    0
  );

  return (
    <div>
      <p>Number of exercises {numExercises}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
