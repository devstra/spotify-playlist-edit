<script>
  import { onMount } from "svelte";
  // import PlaylistView from "./PlaylistView.svelte";
  import SongView from "./SongView.svelte";

  export let authToken;
  let selectedPlaylists = []; // list of playlist IDs
  let items = [];
  let editingPlaylistId = null;

  $: btnText =
    selectedPlaylists.length > 1
      ? selectedPlaylists.length + " playlists"
      : selectedPlaylists.length + " playlist";

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

  async function onDeleteClick() {
    console.log(selectedPlaylists);
    // TODO: handle multi delete ?
    const playlistId = selectedPlaylists[0];
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(() => {
        items = items.filter((i) => i.id != playlistId);
        selectedPlaylists = [];
      })
      .catch((e) => console.error(e));
  }

  function onRenameClick(playlistId) {
    // show a popup to enter name
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ name: "newname" }),
    })
      .then(() => {
        items = items.map((i) => {
          if (i.id == playlistId) {
            return { ...i, name: "newname" };
          } else {
            return i;
          }
        });
      })
      .catch((e) => console.error(e));
  }

  function onCheckAll(event) {
    if (event.target.checked) {
      selectedPlaylists = items.map((i) => i.id);
    } else {
      selectedPlaylists = [];
    }
  }
</script>

{#if editingPlaylistId != null}
  <SongView {authToken} bind:playlistId={editingPlaylistId} />
{:else}
  <!-- <PlaylistView playlistId /> -->
  <h3>Your playlists</h3>
  <div>
    <!-- is actually unfollowing playlist according to doc -->
    <button on:click={onDeleteClick}>Delete {btnText}</button>
    <button>Make {btnText} public</button>
    <button>Make {btnText} private</button>
    <button>Create new playlist</button>
  </div>
  <table>
    <tr>
      <th
        ><input
          class="checkbox"
          type="checkbox"
          title="Select all"
          on:change={onCheckAll}
        /></th
      >
      <th>Name</th>
      <th>Song count</th>
      <th>Visibility</th>
      <th>Actions</th>
    </tr>
    {#each items as playlist}
      <tr>
        <td>
          <input
            class="checkbox"
            type="checkbox"
            bind:group={selectedPlaylists}
            value={playlist.id}
          />
        </td>
        <td
          >{playlist.name}
          <a
            href={playlist.external_urls.spotify}
            target="_blank"
            alt="playlist link">X</a
          ></td
        >
        <td>{playlist.tracks.total}</td>
        <td>{playlist.public ? "Public" : "Private"}</td>
        <td>
          <button on:click={() => onRenameClick(playlist.id)}>Rename</button>
          <button
            on:click={() => {
              editingPlaylistId = playlist.id;
            }}>Edit songs</button
          >
        </td>
      </tr>
    {/each}
  </table>
{/if}

<style>
  .checkbox {
    width: 21px;
    height: 21px;
  }
  table {
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid rgb(29, 185, 84);
    padding: 10px;
    text-align: center;
  }
</style>
