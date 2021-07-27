import { writable } from "svelte/store";

export const store = writable([]);

const fetchPlaylistSongsLimited = async (playlistId, offset = 0, authToken) => {
  const promise = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=FR&offset${offset}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  const response = await promise.json();
  return response.items;
};

const addSongsToPlaylistLimited = async (playlistId, songs, authToken) => {
  const uris = songs.map((s) => "spotify:track:" + s);
  const promise = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ uris: uris }),
    }
  );

  const response = await promise.json();
  return response.items;
};

export const fetchPlaylistSongs = async (playlistId, trackCount, authToken) => {
  let promises = [];
  const nbRequests = Math.ceil(trackCount / 100);
  for (let index = 0; index < nbRequests; index++) {
    const promise = fetchPlaylistSongsLimited(
      playlistId,
      index * 100,
      authToken
    );
    promises.push(promise);
  }
  console.log("starting now..");
  const responses = await Promise.all(promises);

  console.log("saving now..");
  localStorage.setItem("TRACKS", JSON.stringify(responses));
  return responses;
};

export const addPlaylistSongs = async (
  playlistId,
  trackCount,
  tracks,
  authToken
) => {
  let promises = [];
  const songs = tracks.map((t) => t.id);
  const nbRequests = Math.ceil(trackCount / 100);
  for (let index = 0; index < nbRequests; index++) {
    const promise = addSongsToPlaylistLimited(playlistId, song, authToken);
    promises.push(promise);
  }
  console.log("starting now..");
  const responses = await Promise.all(promises);

  console.log("saving now..");
  localStorage.setItem("TRACKS", JSON.stringify(responses));
  return responses;
};
