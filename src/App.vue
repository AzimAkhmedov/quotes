<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Quotes</RouterLink>
      <RouterLink to="/create">Create Quote</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style>
header {
  border: 2px dashed var(--green);
  padding: 20px 0;

  color: var(--typografy);
  background-color: var(--secondary);
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
  color: rgb(24, 156, 101);
}
</style>
