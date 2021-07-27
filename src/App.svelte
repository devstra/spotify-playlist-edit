<script>
  // import { onMount } from "svelte";
  import Login from "./Login.svelte";
  import Dashboard from "./Dashboard.svelte";
  import LogoutButton from "./LogoutButton.svelte";
  import SignedIn from "./SignedIn.svelte";
  import { store } from "./auth";

  const clientId = "2e21c241e4a142ba915df4211b616fb0";
  const scopes =
    "user-library-modify user-library-read playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";
  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    "http://localhost:8080"
  )}&scope=${encodeURIComponent(scopes)}&response_type=token`;
  console.log(loginUrl);
  // onMount(() => {
  //   const regex = /access_token=.+?&/;
  //   const result = regex.exec(window.location.href);

  //   if (result && result.length > 0) {
  //     authToken = result[0].substr(13, result[0].length - 14);
  //     localStorage.setItem("SPOTIFY_TOKEN", $store);
  //   } else {
  //     authToken = localStorage.getItem("SPOTIFY_TOKEN");
  //   }
  // });
</script>

<main>
  <!-- <Main /> -->
  <!-- <p>signed in as {$store.token}</p> -->

  <Login />
</main>

<style>
  .container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .loginBtn {
    cursor: pointer;
    padding: 10px 26px;
    font-size: 18px;
    border: none;
    color: #fff;
    text-decoration: none;
    background: rgba(29, 185, 84, 1);
    border-radius: 500px;
    margin: 10px;

    box-shadow: 0 0 0 0 rgba(29, 185, 84, 1);
    transform: scale(1);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(29, 185, 84, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(29, 185, 84, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
</style>
