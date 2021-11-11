import * as React from "react";

const ScoreBoard = ({ players, loadPlayers, deletePlayer, loadTopPlayers }) => {
  const [showAllScores, setShowAllScores] = React.useState(true);

  const handleScoreReportClick = () => {
    showAllScores ? loadTopPlayers() : loadPlayers();
    setShowAllScores(!showAllScores);
  };

  return (
    <>
      <h1>Score Board</h1>
      <button className="buttons2" onClick={handleScoreReportClick}>
        {showAllScores
          ? "Click to See Top 5 Ranked"
          : "Click to See All Players"}
      </button>
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
                <button className="buttons" onClick={() => deletePlayer(id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ScoreBoard;
