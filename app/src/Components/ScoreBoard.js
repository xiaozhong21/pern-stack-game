import * as React from "react";

const ScoreBoard = ({ players, deletePlayer }) => {
  return (
    <>
      <h1>Score Board</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>| No. of Wins</th>
            <th>| No. of Losses</th>
            <th>| No. of Ties</th>
          </tr>
        </thead>
        <tbody>
          {players.map(({ id, name, wins, losses, ties }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{wins}</td>
              <td>{losses}</td>
              <td>{ties}</td>
              <td>
                <button onClick={() => deletePlayer(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ScoreBoard;
