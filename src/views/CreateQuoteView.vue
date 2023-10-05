<script setup>
import { useForm, Field, Form } from 'vee-validate'
import { ref, watch } from 'vue'
import api from '../api'

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
  return true
}

const validateGenreName = () => {
  if (!genres.value.length) {
    return 'Tag at least 1 genre'
  }
  return true
}

const handleAddGenre = () => {
  if (genre.value.length === 0) {
    alert('You need to fill genre name')
    return
  }
  if (genres.value.find((e) => e === genre.value)) {
    alert('You already wrote such tag')
    return
  }

  genres.value.push(genre.value)
  genre.value = ''
}

const handleDeleteGenre = (genre) => {
  genres.value = genres.value.filter((e) => e !== genre)
}

const onSubmit = (e) => {
  const time = new Date().toLocaleString()
  api
    .createQuote({
      ...values,
      createdAt: time,
      lastEdited: time,
      genres: genres.value
    })
    .then((res) => {
      if (res.statusText == 'Created') {
        alert('Your quote has been created! Go to home page and find it')
        handleReset()
        genres.value = []
      }
    })
    .catch((err) => {
      alert('Unknown error')
      console.log(err)
    })
}

</script>
<template>
  <main class="container">
    <Form name="createQuote" :on-submit="onSubmit" class="quote-form">
      <h2 class="title">Here you can create any quote!</h2>
      <Field
        name="quote"
        v-slot="{ field, errorMessage }"
        :rules="validateQuote"
        type="text"
        v-bind="quote"
      >
        <textarea
          class="field quote"
          required
          placeholder="Your quote"
          type="text"
          v-bind="field"
          :value="quote.value"
          name="quote"
        />
        <p class="error">{{ errorMessage }}</p>
      </Field>
      <Field
        name="author"
        v-slot="{ field, errorMessage }"
        :rules="validateAuthorName"
        type="text"
        v-bind="author"
      >
        <input
          class="field"
          placeholder="Name of author"
          type="text"
          v-bind="field"
          :value="author.value"
          name="author"
        />
        <p class="error">{{ errorMessage }}</p>
      </Field>
      <Field name="genre" v-slot="{ field }" :rules="validateGenreName" type="text">
        <div class="genre-field">
          <input
            class="field genre-inp"
            v-model="genre"
            placeholder="Genre"
            @keyup.enter="handleAddGenre"
            type="text"
            name="genre"
          />
          <button type="button" class="btn genre-btn" @click="handleAddGenre">
            Click to add Genre
          </button>
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
  background-color: #fff;

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
  border: 2px dashed darkcyan;
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

  color: #fff;
  background-color: darkcyan;
}

.field:focus {
  outline: none;
  border: 2px dashed rgb(113, 139, 0);
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
  border-radius: 10px;

  background-color: darkcyan;
  color: #fff;

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
</style>
