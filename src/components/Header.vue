<script lang="ts">
</script>

<template>
  <header>
    <div class="wrapper">
      <h1 class="blog_title">Kyam Site</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  .blog_title {
    text-align: center;
  }

  a {
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
    padding: 8px;
  }


  nav {
    font-size: 16px;
    text-align: center;
    margin-top: 8px;
  }
</style>
