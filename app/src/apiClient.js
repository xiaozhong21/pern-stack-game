export const getPlayers = () => _get("/api/players");

export const addPlayer = ({ name }) => _post("/api/players", { name });

export const deletePlayer = (id) => _delete(`/api/players/${id}`);

export const updateWin = (name) => _put(`/api/players/win/${name}`);

export const updateLoss = (name) => _put(`/api/players/loss/${name}`);

export const updateTie = (name) => _put(`/api/players/tie/${name}`);

const _get = async (url) => (await fetch(url)).json();

const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(body),
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};

const _put = async (url, body) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};

const _delete = (url) => fetch(url, { method: "DELETE" });
