<script>
  import { onMount } from "svelte";

  export let playlistId;
  export let authToken;

  let searchTerm = "";
  let tracks = [];
  let selectedTracks = [];

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
    tracks = response.items;
  });

  $: filteredTracks = tracks.filter((t) =>
    t.track.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function onCheckAll(event) {
    if (event.target.checked) {
      selectedTracks = tracks.map((i) => i.id);
    } else {
      selectedTracks = [];
    }
  }

  function goBack() {
    playlistId = null;
  }

  function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
  }
</script>

<button on:click={goBack}>{"<"} Back</button>
<input placeholder="Search" class="searchbar" bind:value={searchTerm} />
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
    <th>Actions</th>
  </tr>
  {#each filteredTracks as track}
    <tr>
      <td>
        <input
          class="checkbox"
          type="checkbox"
          bind:group={selectedTracks}
          value={track.id}
        />
      </td>
      <td class="albumCover"
        ><img
          on:click={() => playAudio(track.track.preview_url)}
          src={track.track.album.images
            .filter((img) => img.height == 64)
            .map((i) => i.url)}
          alt="album"
        /></td
      >
      <td>{track.track.name}</td>
      <td>{track.track.artists.map((a) => a.name).join(",")}</td>
      <td>
        <button>...</button>
      </td>
    </tr>
  {/each}
</table>

<style>
  .searchbar {
    border: 1px solid #1db954;
    border-radius: 500px;
    padding: 8px 16px;
    outline: none;
  }
  .albumCover:hover {
    opacity: 0.75;
  }
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
