import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getPlayers = () => db.any("SELECT * FROM players");

export const addPlayer = (name) =>
  db.one(
    "INSERT INTO players(name, wins, losses, ties) VALUES($1, $2, $3, $4) RETURNING *",
    [name, 0, 0, 0],
  );

export const deletePlayer = (id) =>
  db.none("DELETE FROM players WHERE id = ${id}", { id });

export const updateWin = (name) =>
  db.one(
    "UPDATE players SET wins = wins + 1 WHERE name = ${name} RETURNING *",
    { name },
  );

export const updateLoss = (name) =>
  db.one(
    "UPDATE players SET losses = losses + 1 WHERE name = ${name} RETURNING *",
    { name },
  );

export const updateTie = (name) =>
  db.one(
    "UPDATE players SET ties = ties + 1 WHERE name = ${name} RETURNING *",
    { name },
  );

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
