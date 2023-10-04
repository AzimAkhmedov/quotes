<script setup>
import { onMounted, ref } from 'vue'
import { QuoteCard } from '../components'
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
    <h2 class="title">Quotes for you</h2>
    <QuoteCard v-for="(e, i) in data" :author="e.author" :genres="e.genres" :last-edited="e.lastEdited" :id="e.id"
      :created-at="e.createdAt" :quote="e.quote" :key="e.id" />
  </main>
</template>
