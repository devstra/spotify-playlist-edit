<script>
  import { onMount } from "svelte";

  let searchTerm = "";
  let tracks = [];

  onMount(async () => {
    const res = await fetch(
      "https://api.spotify.com/v1/playlists/38nWgs1496rDdLK4TM4Bpr/tracks?market=FR&limit=10&offset=0",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer BQBaZRdUbRJLHmIHXKAUyaZvthEdm6B5tY0jnFG4naiHDs6aDKe6ZsnuGHDIBd_qz7c9xcx17f-9rikgogk0q3FHbYUstGtcBafblJ_7i_NrKqBjBuEhfwaZ1kSFjTHuzYNHkCCcDfAnT1PXzYZw4cFC6Mk8YUwc1PmaAyJkZFKv",
        },
      }
    );
    const response = await res.json();
    tracks = response.items;
  });

  $: filteredTracks = tracks.filter((t) =>
    t.track.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<input placeholder="Search" class="searchbar" bind:value={searchTerm} />
<table class="tracksTable">
  <tr>
    <th>Album cover</th>
    <th>Track name</th>
    <th>Artist(s)</th>
    <th>Delete</th>
  </tr>
  {#each filteredTracks as track}
    <tr>
      <td
        ><img
          src={track.track.album.images
            .filter((img) => img.height == 64)
            .map((i) => i.url)}
          alt="album"
        /></td
      >
      <td>{track.track.name}</td>
      <td>{track.track.artists.map((a) => a.name).join(",")}</td>
      <!-- <td><a href={track.external_urls.spotify}>Open</a></td> -->
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
  .tracksTable {
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid orange;
    padding: 10px;
    text-align: left;
  }
</style>
