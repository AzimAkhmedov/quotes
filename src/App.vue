<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Quotes</RouterLink>
      <RouterLink to="/about">Create Quote</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style>
header {
  border: 2px dashed darkcyan;
  padding: 20px 0;

}

nav {
  max-width: 1280px;
  margin: 0 auto;


  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

}

nav a {
  font-weight: bold;
  font-size: 20px;

}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
