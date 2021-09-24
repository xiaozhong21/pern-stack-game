import * as React from "react";

const style = {
  background: "#ff9966",
  border: "2px solid darkblue",
  fontSize: "30px",
  fontWeight: "800",
  cursor: "pointer",
  outline: "none",
};

export default function Square({ onClick, value }) {
  return (
    <button style={style} onClick={onClick}>
      {value}
    </button>
  );
}
