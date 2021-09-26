import { writable } from "svelte/store";

let authToken = localStorage.getItem("SPOTIFY_TOKEN");
export const store = writable(authToken ? authToken : null);
export const logout = () => store.set(null);

store.subscribe((value) => {
  if (value) {
    localStorage.setItem("SPOTIFY_TOKEN", value);
  } else {
    localStorage.removeItem("SPOTIFY_TOKEN");
  }
});
