import * as React from "react";

const AddScore = ({
  winner,
  players,
  addPlayer,
  updateWin,
  updateLoss,
  updateTie,
}) => {
  const [disabledButton, setDisabledButton] = React.useState(false);

  const checkWinner = async (name) => {
    const playerNames = players.map((player) => player.name);
    if (playerNames.includes(name)) updateWin(name);
    else {
      await addPlayer({ name });
      updateWin(name);
    }
  };

  const checkLoser = async (name) => {
    const playerNames = players.map((player) => player.name);
    if (playerNames.includes(name)) updateLoss(name);
    else {
      await addPlayer({ name });
      updateLoss(name);
    }
  };

  const checkTie = async (name) => {
    const playerNames = players.map((player) => player.name);
    if (playerNames.includes(name)) updateTie(name);
    else {
      await addPlayer({ name });
      updateTie(name);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const {
      nameX: { value: nameX },
      nameO: { value: nameO },
    } = form.elements;

    winner === "X"
      ? checkWinner(nameX) && checkLoser(nameO)
      : winner === "O"
      ? checkWinner(nameO) && checkLoser(nameX)
      : checkTie(nameX) && checkTie(nameO);

    form.reset();
    setDisabledButton(true);
  };

  return (
    <>
      <form {...{ onSubmit }}>
        <label>
          Name of Player X:
          <input name="nameX" />
        </label>
        <br />
        <label>
          Name of Player O:
          <input name="nameO" />
        </label>
        <br />
        <br />
        <button className="buttons2" disabled={disabledButton}>
          Submit
        </button>
      </form>
      <button className="buttons2" onClick={() => window.location.reload()}>
        Reset Game
      </button>
    </>
  );
};

export default AddScore;
