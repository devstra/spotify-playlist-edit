<script>
  import { PlayerPlay, DotsVertical } from "tabler-icons-svelte";
  export let albumCover;
  export let trackName;
  export let trackReleaseDate;
  export let trackArtists;
  export let trackPreviewUrl;
  export let trackId;
  export let checkboxGroup;
  $: artistNames = trackArtists.map((a) => a.name);

  function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
  }
</script>

<tr>
  <td>
    <input
      class="checkbox"
      type="checkbox"
      bind:group={checkboxGroup}
      value={trackId}
    />
  </td>
  <td>
    <div class="albumContainer">
      <div class="albumCover">
        <img
          on:click={() => playAudio(trackPreviewUrl)}
          src={albumCover}
          class="album"
          alt="album cover"
        />
      </div>
      <div class="audioIcon">
        <PlayerPlay color="#fff" />
      </div>
    </div>
  </td>
  <td>{trackName}</td>
  <td>
    {#each artistNames as aName}
      <span class="artistTag">{aName}</span>
    {/each}
  </td>
  <td>{trackReleaseDate}</td>
  <td>
    <button class="dotsButton"><DotsVertical /></button>
  </td>
</tr>

<style>
  .checkbox {
    width: 21px;
    height: 21px;
  }
  .artistTag {
    background-color: bisque;
    border-radius: 500px;
    font-size: 14px;
    padding: 4px 8px;
    display: inline-block;
  }
  .album {
    width: 64px;
    height: 64px;
  }
  .dotsButton {
    appearance: none;
    border: none;
    background: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .dotsButton:hover {
    border-radius: 500px;
    background-color: rgba(19, 8, 8, 0.05);
  }
  td {
    border: 1px solid rgb(29, 185, 84);
    padding: 10px;
    text-align: center;
  }
  .albumContainer {
    background: white;
    float: left;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .albumContainer:hover .audioIcon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .audioIcon {
    position: absolute;
    display: none;
    top: 0%;
    margin: 0 auto;
    width: 64px;
    height: 64px;
    left: 0px;
    right: 0px;
    z-index: 100;
    opacity: 0.9;
    background-color: rgba(0, 0, 0, 0.25);
  }
</style>
