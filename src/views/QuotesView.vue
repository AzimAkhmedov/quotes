<script setup>
import { onMounted, ref } from 'vue'
import { QuoteCard, Loader } from '../components'
import { useStore } from 'vuex'

const root = useStore()
const filter = ref('')

onMounted(() => {
  root.dispatch('getAllQuotes')
})
</script>
<template>
  <main>
    <div v-if="root.state.quotesLoading">
      <Loader />
    </div>
    <div v-else-if="root.state.quotesError">
      {{ root.state.quotesError }}
    </div>
    <div v-else class="container">
      <h2 class="title">Quotes for you</h2>
      <div class="search-field">
        <input
          placeholder="Type to search"
          type="text"
          v-model="filter"
          class="search"
          name="search"
          id="search"
        />
      </div>
      <div class="cards">
        <RouterLink
          v-for="(e, i) in root.state.quotes.filter(
            (e) =>
              e.author.toLowerCase().includes(filter.toLowerCase()) ||
              e.quote.toLowerCase().includes(filter.toLowerCase())
          )"
          :to="`/` + e.id"
          :key="e.id"
        >
          <QuoteCard
            :author="e.author"
            :genres="e.genres"
            :last-edited="e.lastEdited"
            :id="Number(e.id)"
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
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  gap: 10px;
}

.search-field {
  width: 100%;
  max-width: 600px;

  margin: 0 auto;
}

input {
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 30px;

  outline: none;
}
</style>
