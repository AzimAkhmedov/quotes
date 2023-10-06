<script setup>
import { useForm, Field, Form } from 'vee-validate'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from "vue-toastification";

const store = useStore()
const toast = useToast()
const { defineInputBinds, values, handleReset } = useForm({
  initialValues: {
    author: '',
    quote: ''
  }
})

const author = defineInputBinds('author')
const quote = defineInputBinds('quote')

const genre = ref('')
const genres = ref([])

const validateQuote = (quote) =>
  !(quote.length && quote.trim().length) ? 'Quote is required' : true

const validateAuthorName = (name) => {
  if (!(name && name.trim())) {
    return 'Author`s name is required'
  }
  if (name.match(/(\d+)/)) {
    return 'Name of author cant consist of numbers'
  }
  if (name.match(/[\wа-я]+/gi) || name.match(/[^a-zA-Z]+/)) {
    return true
  }
  return 'Use only russian or english letters'
}

const validateGenreName = () => {
  if (genres.value.length === 0) {
    return 'Tag at least 1 genre'
  }
  return true
}

const handleAddGenre = () => {
  if (genre.value.length === 0) {
    toast('Name of genre cant be empty', { position: 'top-right', type: "error" })
    return
  }
  if (genre.value.match(/(\d+)/)) {
    toast('Name of genre cant consist of numbers', { position: 'top-right', type: "error" })
    return
  }
  if (genres.value.find((e) => e === genre.value)) {
    toast('You already have such tag', { position: 'top-right', type: "error" })
    return
  }

  genres.value.push(genre.value)
  genre.value = ''
}

const handleDeleteGenre = (genre) => {
  genres.value = genres.value.filter((e) => e !== genre)
}

const onSubmit = () => {
  const time = new Date().toLocaleString()
  const newQuote = {
    ...values,
    id: Date.now(),
    createdAt: time,
    lastEdited: time,
    genres: genres.value
  }

  store
    .dispatch('createQuote', newQuote)
    .then((res) => {
      toast('Quote created!', { position: 'top-right', type: "success" })
      handleReset()
      genres.value = []
    })
    .catch((err) => {
      toast('Error ' + err, { position: 'top-right', type: "error" })
    })
}
</script>
<template>
  <main class="container">
    <Form name="createQuote" :on-submit="onSubmit" class="quote-form">
      <h2 class="title">Here you can create any quote!</h2>
      <Field name="quote" v-slot="{ field, errorMessage }" :rules="validateQuote" type="text" v-bind="quote">
        <textarea class="field quote" required placeholder="Your quote" type="text" v-bind="field" :value="quote.value"
          name="quote" />
        <p class="error">{{ errorMessage }}</p>
      </Field>
      <Field name="author" v-slot="{ field, errorMessage }" :rules="validateAuthorName" type="text" v-bind="author">
        <input class="field" placeholder="Name of author" type="text" v-bind="field" :value="author.value"
          name="author" />
        <p class="error">{{ errorMessage }}</p>
      </Field>
      <Field name="genre" v-slot="{ field, errorMessage }" :rules="validateGenreName" type="text">
        <div class="genre-field">
          <input class="field genre-inp" v-model="genre" placeholder="Genre" @keyup.enter="handleAddGenre" type="text"
            name="genre" />
          <button type="button" class="btn genre-btn" @click="handleAddGenre">
            Click to add Genre
          </button>
          <p class="error">{{ errorMessage }}</p>
        </div>
        <ul class="genre-list">
          <li v-for="(gen, i) in genres" :key="i">
            {{ gen }}
            <button type="button" @click="handleDeleteGenre(gen)" class="btn genre-delete">
              x
            </button>
          </li>
        </ul>
      </Field>
      <button class="btn create" type="submit">Create</button>
    </Form>
  </main>
</template>

<style scoped>
.quote-form {
  min-height: calc(100vh / 1.5);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  padding: 40px 20px;
}

.field {
  width: 100%;
  max-width: 600px;
  height: 60px;

  font-size: 18px;
  padding: 20px 15px;

  border-radius: 10px;

  transition: 0.3s;
}

.quote {
  height: 120px;
  resize: none;
}

.btn {
  border-radius: 10px;
  padding: 0 15px;

  color: var(--typografy);
  background-color: var(--green);
}

.field:focus {
  outline: none;
  border: 1px solid var(--green);
}

.genre-inp {
  flex-grow: 1;
}

.genre-field {
  width: 100%;
  height: 60px;
  max-width: 600px;

  display: flex;
  align-items: center;
  gap: 10px;
}

.genre-btn {
  height: 100%;
  padding: 0 15px;

  font-size: 20px;
}

.genre-list {
  list-style: none;

  width: 100%;
  max-width: 600px;
}

.genre-list li {
  display: flex;
  justify-content: space-between;

  padding-top: 10px;

  font-weight: bolder;
}

.create {
  padding: 10px 15px;
  font-size: 20px;
}

.error {
  color: red;
}

@media (max-width: 600px) {
  .genre-btn {
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>
