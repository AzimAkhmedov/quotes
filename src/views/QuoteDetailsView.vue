<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Loader } from '../components';
import router from '../router'
import api from '../api';
const route = useRoute()
const store = useStore()
const editMode = ref(false)
const genre = ref('')

const editedQuote = ref({
  author: '',
  quote: '',
  createdAt: '',
  lastEdited: '',
  genres: [],
  id: 0
})
const handleDelete = () => {
  if (window.confirm('Are you sure to delete?')) {
    store.dispatch('deleteQuote', route.params.id).then(() => {
      router.back()
    })
  }
}
const handleDeleteGenre = (gen) => {
  editedQuote.value.genres = editedQuote.value.genres.filter((e) => e !== gen)
}
const handleAddTag = () => {
  if (genre.value && genre.value.trim()) {
    editedQuote.value.genres.push(genre.value)
    genre.value = ''
  } else {
    alert('Name your genre')
  }
}
const onSubmit = (e) => {
  if (editedQuote.value.genres.length == 0) {
    alert("Genres cant be empty")
    return;
  }
  const time = new Date().toLocaleString()
  const newQuote = { ...editedQuote.value, lastEdited: time }
  store.dispatch('updateQuote', { ...newQuote, id: route.params.id })
  editMode.value = false
}

onMounted(() => {
  store.dispatch('getCurrentQuote', route.params.id)
  api.getQuoteById(route.params.id).then(res => {
    editedQuote.value = res.data
  })
})
</script>

<template>
  <div v-if="store.getters.getCurrentLoading">
    <Loader />
  </div>
  <main v-else class="container">
    <div v-if="!editMode" class="wrapper">
      <h2 class="quote">{{ store.getters.getCurrentQuote.quote }}</h2>
      <p class="author">{{ store.getters.getCurrentQuote.author }}</p>
      <p class="time">Created: {{ store.getters.getCurrentQuote.createdAt }}</p>
      <p class="time">Last Changed: {{ store.getters.getCurrentQuote.lastEdited }}</p>
      <p class="tags-title">Quote Tags</p>
      <ul class="tags">
        <li class="tag" v-for="(tag, i) in store.getters.getCurrentQuote.genres" :key="i">{{ tag }}</li>
      </ul>

      <div class="actions">
        <button class="btn" @click="editMode = true">Edit</button>
        <button class="btn danger" @click="handleDelete">Delete</button>
      </div>
    </div>
    <div v-else class="wrapper">
      <h3>Editing Quote</h3>
      <form name="editQuote" @submit.prevent @submit="onSubmit">
        <div class="field">
          <input v-model="editedQuote.quote" required type="text" name="quote" />
        </div>
        <div class="field">
          <input v-model="editedQuote.author" required type="text" name="author" />
        </div>
        <div class="add-tag">
          <input class="genre" v-model="genre" type="text" name="genre" />
          <button class="btn" type="button" @click="handleAddTag">Add tags</button>
        </div>
        <ul class="tags">
          <li class="tag editing" v-for="(tag, i) in editedQuote.genres" :key="i" @click="handleDeleteGenre(tag)">
            {{ tag }} x
          </li>
        </ul>
        <div class="actions">
          <button class="btn danger" type="submit">Save</button>
          <button class="btn" type="button" @click="editMode = false">Cancel</button>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  background-color: #fff;

  padding: 20px 40px 200px 40px;
  min-height: calc(100vh / 2);

  position: relative;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}

input {
  border: 2px dashed darkcyan;

  font-size: 18px;
  padding: 20px 15px;

  border-radius: 10px;

  width: 100%;
  max-width: 600px;
  height: 60px;
}

input:focus {
  outline: none;
  border: 2px dashed rgb(113, 139, 0);
}

.field {
  width: 100%;
  height: 60px;
  max-width: 600px;
}

.add-tag {
  width: 100%;
  max-width: 600px;

  display: flex;
  align-items: center;
  gap: 10px;
}

.add-tag .btn {
  border-radius: 10px;
}

.genre {
  flex-grow: 1;
}

.quote {
  margin-bottom: 40px;
}

.author {
  text-align: right;
  font-size: 20px;
}

.tags-title {
  font-size: 20px;
  font-weight: bolder;
  margin-bottom: 10px;
}

.tags {
  display: flex;
  list-style: none;
  column-gap: 10px;
  row-gap: 5px;
  max-width: 300px;
  flex-wrap: wrap;
}

.tag {
  border: 2px dashed darkcyan;
  padding: 5px 10px;
}

.actions {
  display: flex;
  gap: 10px;
  padding-top: 100px;
}

.btn {
  padding: 10px 30px;
  background-color: darkcyan;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.danger {
  background-color: red;
}

.time {
  position: absolute;
  bottom: 40px;
}

.time:nth-child(1) {
  left: 20px;
}

.time:nth-child(3) {
  right: 20px;
}

.editing {
  border-color: red;
}
</style>