<script>
  import SongRow from "./SongRow.svelte";
  import { onMount } from "svelte";

  export let playlistId;
  export let authToken;

  let searchTerm = "";
  let songs = [];
  // let songs = fetchTracks();
  let selectedTracks = [];

  async function fetchTracks() {
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=FR`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const response = await res.json();
    return response.items;
  }

  onMount(async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=FR`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const response = await res.json();
    console.log(response);
    songs = response.items;
  });

  $: filteredTracks = songs.filter((t) =>
    t.track.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function onCheckAll(event) {
    if (event.target.checked) {
      selectedTracks = songs.map((i) => i.id);
    } else {
      selectedTracks = [];
    }
  }

  function goBack() {
    playlistId = null;
  }
</script>

<button class="backBtn" on:click={goBack}>{"<"}</button>
<input placeholder="Search" class="searchbar" bind:value={searchTerm} />
<!-- {#await songs} -->
<!-- <p>fetching tracks...</p> -->
<!-- {:then notNeeded} -->
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
    <th>Album cover</th>
    <th>Track name</th>
    <th>Artist(s)</th>
    <th>Release date</th>
    <th>Actions</th>
  </tr>
  {#each filteredTracks as song}
    <SongRow
      trackId={song.id}
      checkboxGroup={selectedTracks}
      trackArtists={song.track.artists}
      trackName={song.track.name}
      trackPreviewUrl={song.track.preview_url}
      trackReleaseDate={song.added_at}
      albumCover={song.track.album.images[0].url}
    />
    <!-- <tr>
      <td>
        <input
          class="checkbox"
          type="checkbox"
          bind:group={selectedTracks}
          value={song.id}
        />
      </td>
      <td class="albumCover"
        ><img
          on:click={() => playAudio(song.track.preview_url)}
          src={song.track.album.images
            .filter((img) => img.height == 64)
            .map((i) => i.url)}
          alt="album"
        /></td
      >
      <td>{song.track.name}</td>
      <td>{song.track.artists.map((a) => a.name).join(",")}</td>
      <td>
        <button>...</button>
      </td>
    </tr> -->
  {/each}
</table>
<!-- {:catch error} -->
<!-- <p style="color: red">{error.message}</p> -->

<!-- {/await} -->
<style>
  .searchbar {
    border: 1px solid #1db954;
    border-radius: 500px;
    padding: 8px 16px;
    outline: none;
  }
  .backBtn {
    cursor: pointer;
    border: 2px solid black;
    background-color: #fff;
    border-radius: 500px;
    width: 32px;
    height: 32px;
  }
  .backBtn:hover {
    color: #fff;
    background-color: black;
  }
  .checkbox {
    width: 21px;
    height: 21px;
  }
  table {
    border-collapse: collapse;
  }
  th {
    border: 1px solid rgb(29, 185, 84);
    padding: 10px;
    text-align: center;
  }
</style>
