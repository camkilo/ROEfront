import api from "./Client";
import { loadPlayerState } from "./playerState";

export async function loginUser(username: string, password: string) {
  const res = await api.post("/login", { username, password });
  loadPlayerState(res.data);
  localStorage.setItem("playerName", res.data.player);
  return res.data;
}

export async function registerUser(username: string, password: string) {
  const res = await api.post("/register", { username, password });
  loadPlayerState(res.data);
  localStorage.setItem("playerName", res.data.player);
  return res.data;
}
