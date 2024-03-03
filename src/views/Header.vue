<script lang="ts">
export default {
  name: 'Header',
}
</script>

<template>
  <header>
    <div class="navLink">
      <router-link to="/" class="navLink">
        <img src="/src/assets/images/sphere.png" alt="" class="navLink kyamSiteLogo">
        <div class="navLink">
          Kyam Site
        </div>
      </router-link>
      <router-link to="/about" class="navLink">
        About
      </router-link>
    </div>
  </header>
</template>
<!-- https://connpass.com/api/v1/event/?order=2&count=20&nickname=bumpfuji10 -->
