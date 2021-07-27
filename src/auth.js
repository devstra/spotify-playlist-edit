import { writable } from "svelte/store";

let _user = localStorage.getItem("SPE_USER");
export const store = writable(_user ? JSON.parse(_user) : null);
export const logout = () => store.set(null);

store.subscribe((value) => {
  if (value) localStorage.setItem("SPE_USER", JSON.stringify(value));
  else localStorage.removeItem("SPE_USER"); // for logout
});
