import React from "react";
import { CoursePart } from "../types";

interface PartProps {
  course: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = ({ course }) => {
  const renderPart = (course: CoursePart) => {
    switch (course.name) {
      case "Fundamentals":
        return (
          <p>
            name: {course.name} desc: {course.description}
          </p>
        );
      case "Using props to pass data":
        return (
          <p>
            name: {course.name} number of exercises: {course.exerciseCount}{" "}
            number of group projects: {course.groupProjectCount}
          </p>
        );
      case "Deeper type usage":
        return (
          <p>
            name: {course.name} number of exercises: {course.exerciseCount}{" "}
            desc: {course.description} submission link:{" "}
            <a href={course.exerciseSubmissionLink}>
              {course.exerciseSubmissionLink}
            </a>
          </p>
        );
      case "Custom":
        return (
          <p>
            name: {course.name} number of exercises: {course.exerciseCount}{" "}
            desc: {course.description} favourite class : {course.favClass}
          </p>
        );
      default:
        return assertNever(course);
    }
  };
  return <div>{renderPart(course)}</div>;
};

export default Part;
