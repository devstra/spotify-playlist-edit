<script>
  export let clearToken;
  function onLogout() {
    localStorage.removeItem("SPOTIFY_TOKEN");
    clearToken();
  }
</script>

<button on:click={onLogout}>Logout</button>

<style>
  button {
    border-radius: 500px;
    border: 2px solid black;
    color: black;
    background-color: #fff;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: bold;
  }
  button:hover {
    color: #fff;
    background-color: crimson;
    border: none;
  }
</style>
