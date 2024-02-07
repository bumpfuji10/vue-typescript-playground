<script lang="ts">
export default {
  name: 'Header',
}
</script>

<template>
  <header>
    <div class="wrapper">
      <h1 class="nav__title">
        <router-link to="/" class="nav__link">
          Kyam Site
        </router-link>
      </h1>
      <!-- <router-link to="/about" class="nav__link">
        About
      </router-link> -->
    </div>
  </header>
</template>
