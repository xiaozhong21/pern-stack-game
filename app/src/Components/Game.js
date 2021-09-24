import * as React from "react";

import * as apiClient from "../apiClient";
import { calculateWinner } from "../helpers";

import AddScore from "./AddScore";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import "./Game.scss";

const Game = () => {
  const { players, addPlayer, deletePlayer, updateWin, updateLoss, updateTie } =
    usePlayers();
  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = React.useState(0);
  const [xIsNext, setXisNext] = React.useState(true);

  const winner = calculateWinner(history[stepNumber]);

  const handleClick = (i) => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];
    //If user clicks an occupied square or if game is won, return
    if (winner || squares[i]) return;
    //Put an X or an O in the clicked square
    squares[i] = xIsNext ? "X" : "O";
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXisNext(!xIsNext);
    console.log(history.length);
  };

  function jumpTo(step) {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  }

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move#${move}` : `Go to start`;
      return (
        <li key={move} className="buttonList">
          <button className="buttons" onClick={() => jumpTo(move)}>
            {destination}
          </button>
        </li>
      );
    });

  return (
    <>
      <ScoreBoard {...{ players, deletePlayer }} />
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="text">
        <p>
          {winner
            ? "Winner: " +
              winner +
              "! Would you like to save your name and score?"
            : history.length === 10
            ? "You tied! Would you like to save your name and game result?"
            : "Next Player: " + (xIsNext ? "X" : "O")}
        </p>
        {winner || history.length === 10 ? (
          <AddScore
            {...{
              winner,
              players,
              addPlayer,
              updateWin,
              updateLoss,
              updateTie,
            }}
          />
        ) : null}
        {renderMoves()}
      </div>
    </>
  );
};

const usePlayers = () => {
  const [players, setPlayers] = React.useState([]);

  const loadPlayers = () => apiClient.getPlayers().then(setPlayers);
  const deletePlayer = (id) => apiClient.deletePlayer(id).then(loadPlayers);
  const addPlayer = ({ name }) =>
    apiClient.addPlayer({ name }).then(loadPlayers);
  const updateWin = (name) => apiClient.updateWin(name).then(loadPlayers);
  const updateLoss = (name) => apiClient.updateLoss(name).then(loadPlayers);
  const updateTie = (name) => apiClient.updateTie(name).then(loadPlayers);

  React.useEffect(() => {
    loadPlayers();
  }, []);

  return { players, addPlayer, deletePlayer, updateWin, updateLoss, updateTie };
};

export default Game;
