import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(props.anecdotes.length));
  const [maxVoteIndex, setMaxVoteIndex] = useState(0);

  const handleNextClick = () => {
    const idx = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(idx);
  };

  const handleVoteClick = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);

    setMaxVoteIndex(getMaxIndex(copy));
  };

  const getMaxIndex = (arr) => {
    return arr.indexOf(Math.max(...arr));
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      {props.anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <div>
        <Button onClick={handleVoteClick} text="vote" />
        <Button onClick={handleNextClick} text="next anectode" />
      </div>
      <Header text="Anecdote with most votes" />
      {props.anecdotes[maxVoteIndex]}
      <br />
      has {points[maxVoteIndex]} votes
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
