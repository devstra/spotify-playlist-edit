<script>
  import { onMount } from "svelte";
  import { store } from "./auth";
  import LoginButton from "./LoginButton.svelte";
  import Dashboard from "./Dashboard.svelte";
  import LogoutButton from "./LogoutButton.svelte";

  // Read the Access token in the URL after Spotify redirect and save it in store.
  onMount(() => {
    const regex = /access_token=.+?&/;
    const result = regex.exec(window.location.href);

    if (result && result.length > 0) {
      const authToken = result[0].substr(13, result[0].length - 14);
      $store = authToken;
    }
  });
</script>

<main>
  {#if $store != null}
    <Dashboard authToken={$store} />
  {:else}
    <div class="container">
      <h3>Spotify Playlist Editor</h3>
      <LoginButton />
    </div>
  {/if}
</main>

<style>
  .container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  h3 {
    color: rgba(29, 185, 84, 1);
    margin-bottom: 100px;
    text-align: center;
  }
  main {
    background-color: #121212;
    height: 100vh;
  }
</style>
