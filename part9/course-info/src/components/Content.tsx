import React from "react";
import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  courses: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return <Part key={course.name} course={course} />;
      })}
    </div>
  );
};

export default Content;
