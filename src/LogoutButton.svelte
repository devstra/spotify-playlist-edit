<script>
  import { logout } from "./auth";
</script>

<button on:click={logout}>Logout</button>

<style>
  button {
    border-radius: 500px;
    color: black;
    border: none;
    background-color: #fff;
    /* padding: 8px 16px; */
    height: 35px;
    width: 110px;
    cursor: pointer;
    font-weight: bold;
  }
  button:hover {
    color: #fff;
    background-color: crimson;
  }
</style>
