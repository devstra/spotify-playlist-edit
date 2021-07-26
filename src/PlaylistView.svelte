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
        <!-- <input
          class="checkbox"
          type="checkbox"
          bind:group={selectedPlaylists}
          value={playlist.id}
        /> -->
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
        <!-- <button on:click={() => onRenameClick(playlist.id)}>Rename</button> -->
        <button>Edit songs</button>
      </td>
    </tr>
  {/each}
</table>

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
