import React from "react";
import { Course } from "../types";

interface ContentProps {
  courses: Course[];
}

const Content: React.FC<ContentProps> = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <p key={course.name}>
            {course.name} {course.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};

export default Content;
