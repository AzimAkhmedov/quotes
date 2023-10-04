<script setup>
import { defineProps } from 'vue'
defineProps({
    quote: {
        required: true,
        type: String,
    },
    author: {
        required: true,
        type: String,
    },
    genres: {
        required: true,
        type: Array,
    },
    createdAt: {
        required: true,
        type: String,
    },
    lastEdited: {
        required: true,
        type: String,
    },
    id: {
        required: true,
        type: Number,
    }
})
</script>

<template>
    <div class="card">
        <h3>
            {{ quote }}
        </h3>
        <p>{{ author }}</p>
    </div>
</template>


<style scoped></style>