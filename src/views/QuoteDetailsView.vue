<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '../router';
import api from '../api';
const route = useRoute()
const editMode = ref(false)
const genre = ref('')
const quote = ref({
    author: "",
    quote: "",
    createdAt: "",
    lastEdited: "",
    genres: [],
    id: 0
})
const editedQuote = ref({
    author: "",
    quote: "",
    createdAt: "",
    lastEdited: "",
    genres: [],
    id: 0
})
onMounted(() => {
    api.getQuoteById(route.params.id).then(res => {
        quote.value = res.data
        editedQuote.value = res.data
    })
})
const handleDelete = () => {
    if (window.confirm('Are you sure to delete?')) {
        api.deleteQuote(route.params.id).then(res => {
            console.log(res);
            router.back()
        })
    }
}
const handleDeleteGenre = (gen) => {
    editedQuote.value.genres = editedQuote.value.genres.filter(e => e !== gen)
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
    const time = new Date().toLocaleString()
    api.updateQuote(quote.value.id, { ...editedQuote.value, lastEdited: time })
    // console.log({ ...editedQuote.value, lastEdited: time });
    quote.value = Object.assign({}, { ...editedQuote.value, lastEdited: time })
    editMode.value = false
}

</script>

<template>
    <main class="container">
        <div v-if="!editMode" class="wrapper">
            <h2 class="quote">{{ quote.quote }}</h2>
            <p class="author">{{ quote.author }}</p>
            <p class="time">Created: {{ quote.createdAt }}</p>
            <p class="time">Last Changed: {{ quote.lastEdited }}</p>
            <p class="tags-title">Quote Tags</p>
            <ul class="tags">
                <li class="tag" v-for="(tag, i) in quote.genres" :key="i">{{ tag }}</li>
            </ul>

            <div class="actions">
                <button class="btn" @click="editMode = !editMode">Edit</button>
                <button class="btn danger" @click="handleDelete">Delete</button>
            </div>
        </div>
        <div v-else class="wrapper">
            <h3>Editing Quote</h3>
            <form name="editQuote" @submit.prevent @submit="onSubmit">
                <div class="field">
                    <input v-model="editedQuote.quote" required type="text" name="quote">
                </div>
                <div class="field">
                    <input v-model="editedQuote.author" required type="text" name="author">
                </div>
                <div class="add-tag">
                    <input class="genre" v-model="genre" type="text" name="genre">
                    <button class="btn" type="button" @click="handleAddTag">Add tags</button>
                </div>
                <ul class="tags">
                    <li class="tag editing" v-for="(tag, i) in editedQuote.genres" :key="i" @click="handleDeleteGenre(tag)">
                        {{
                            tag }} x</li>
                </ul>
                <div class="actions">
                    <button class="btn" type="submit">Save</button>
                    <button class="btn" type="button" @click="editMode = !editMode">Cancel</button>
                </div>
            </form>
        </div>

    </main>
</template>

<style scoped>
.wrapper {
    background-color: #fff;

    padding: 20px 40px 200px 40px;
    min-height: calc(100vh/2);

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