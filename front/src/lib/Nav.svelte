<script lang="ts">
</script>

<nav class="nav">
  <img
    src="https://de.cdn-website.com/aad43109e9964f848466b450a54b0cf5/DESKTOP/png/859.png"
    alt="logo"
    class="logo"
  />
  <div class="btn-cont">
    <slot />
  </div>
</nav>

<style>
  .nav {
    display: flex;
    width: 100vw;
    height: 12vh;
    background-color: #aaaaaa;
    border-bottom: 1px solid black;
    align-items: center;
  }
  .btn-cont {
    margin-right: 2vw;
  }

  .logo {
    width: 10vw;
    margin-right: 1.5vw;
  }
</style>
