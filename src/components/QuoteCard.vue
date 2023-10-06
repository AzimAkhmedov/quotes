<script setup>
defineProps({
  quote: {
    required: true,
    type: String
  },
  author: {
    required: true,
    type: String
  },
  genres: {
    required: true,
    type: Array
  },
  createdAt: {
    required: true,
    type: String
  },
  lastEdited: {
    required: true,
    type: String
  },
  id: {
    required: true,
    type: Number
  }
})
</script>

<template>
  <div class="card">
    <h3 class="quote">
      {{ quote }}
    </h3>
    <p class="author">{{ author }}</p>
    <span class="created">Created:{{ createdAt }}</span>
    <span class="edited">Edited:{{ lastEdited }}</span>
  </div>
</template>

<style scoped>
.card {
  background-color: #fff;

  min-height: 300px;
  width: 300px;

  border-radius: 10px;
  border: 2px solid darkcyan;

  padding: 10px 20px;

  position: relative;
}

.author {
  text-align-last: right;
  font-size: 17px;

  padding-top: 10px;
}

.created {
  position: absolute;
  bottom: 5px;
  left: 5px;

  font-size: 10px;
}

.edited {
  position: absolute;
  bottom: 5px;
  right: 5px;

  font-size: 10px;
}

@media (max-width:420px) {
  .card {
    border: 1px solid darkcyan;
    width: 100vw;
  }

  .quote {
    font-size: 14px;
  }

  .author {
    font-size: 14px;
  }

  .created,
  .edited {
    max-width: 100px;
    text-wrap: wrap;
  }
}
</style>
