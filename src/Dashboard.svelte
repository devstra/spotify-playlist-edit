<script>
  import { onMount } from "svelte";
  import { ExternalLink } from "tabler-icons-svelte";
  import LogoutButton from "./LogoutButton.svelte";
  import SongView from "./SongView.svelte";

  export let authToken;
  let items = [];
  let editingPlaylistId = null;

  onMount(async () => {
    const res = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const response = await res.json();
    items = response.items;
  });

  function onChangeVisibilityClick(playlistId, makePublic) {
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ public: makePublic }),
    })
      .then(() => {
        items = items.map((i) => {
          if (i.id == playlistId) {
            return { ...i, public: makePublic };
          } else {
            return i;
          }
        });
      })
      .catch((e) => console.error(e));
  }
</script>

<section>
  {#if editingPlaylistId != null}
    <SongView {authToken} bind:playlistId={editingPlaylistId} />
  {:else}
    <div class="titleRow">
      <h3>Your playlists</h3>
      <LogoutButton />
    </div>
    <table>
      <tr>
        <th>Name</th>
        <th>Song count</th>
        <th>Visibility</th>
        <th>Actions</th>
      </tr>
      {#each items as playlist}
        <tr>
          <td
            >{playlist.name}
            <a
              href={playlist.external_urls.spotify}
              target="_blank"
              alt="playlist link"><ExternalLink /></a
            ></td
          >
          <td>{playlist.tracks.total}</td>
          <td>{playlist.public ? "Public" : "Private"}</td>
          <td>
            <button
              class="actionBtn"
              on:click={() =>
                onChangeVisibilityClick(playlist.id, !playlist.public)}
              >Make {!playlist.public ? "Public" : "Private"}</button
            >
            <button
              class="actionBtn"
              on:click={() => {
                editingPlaylistId = playlist.id;
              }}>Edit songs</button
            >
          </td>
        </tr>
      {/each}
    </table>
  {/if}
</section>

<style>
  * {
    color: white;
  }
  .titleRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th,
  td {
    border: 1px solid rgb(29, 185, 84);
    padding: 10px;
    text-align: center;
  }
  .actionBtn {
    border: none;
    color: white;
    border-radius: 500px;
    width: 115px;
    height: 25px;
    background-color: rgba(29, 185, 84, 1);
    cursor: pointer;
  }
  section {
    background-color: #121212;
    height: 100vh;
    margin: 0 10%;
  }
</style>
