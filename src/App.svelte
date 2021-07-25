<script>
  import { onMount } from "svelte";
  import Playlist from "./Playlist.svelte";

  const clientId = "2e21c241e4a142ba915df4211b616fb0";
  const scopes =
    "user-library-modify user-library-read playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";
  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    "http://localhost:8080"
  )}&scope=${encodeURIComponent(scopes)}&response_type=token`;

  onMount(() => {
    console.log(window.location.href);
  });
</script>

<div class="App">
  <a href={loginUrl} class="loginBtn">Login with Spotify</a>
  <Playlist />
</div>

<style>
  .loginBtn {
    cursor: pointer;
    padding: 8px 24px;
    border: none;
    background-color: #1db954;
    color: #fff;
    border-radius: 500px;
    text-decoration: none;
    animation: pulse infinite 1s ease-in-out alternate;
  }
  @keyframes pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.06);
    }
  }
</style>
