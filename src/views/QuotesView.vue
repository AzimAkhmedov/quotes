<script setup>
import { onMounted, ref } from 'vue'
import { QuoteCard } from '../components'
import router from '../router'
import api from '../api'

const data = ref([])

onMounted(() => {
  api.getAllQuotes().then((res) => {
    console.log(res.data)
    data.value = res.data
  })
})
</script>
<template>
  <main>
    <div class="container">
      <h2 class="title">Quotes for you</h2>
      <div class="cards">
        <RouterLink v-for="(e, i) in data" :to="`/` + e.id" :key="e.id">
          <QuoteCard
            :author="e.author"
            :genres="e.genres"
            :last-edited="e.lastEdited"
            :id="e.id"
            :created-at="e.createdAt"
            :quote="e.quote"
          />
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.cards {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  gap: 10px;
}
</style>
