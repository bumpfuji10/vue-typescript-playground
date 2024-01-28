<template>
<h1 v-for="article in articles" :key="article.id">
  <h2>{{ article.title }}</h2>
  {{ article.body }}
</h1>
</template>

<script lang="ts">
import { getArticles } from './../api/article'

interface Article {
  id: number,
  title: string,
  body: string
}

export default {
  name: 'HomeView',
  data() {
    return {
      articles: [] as Article[]
    }
  },
  mounted() {
    this.getArticles()
  },
  methods: {
    async getArticles(): Promise<void> {
      try {
        const response = await getArticles();
        this.articles = response.data.contents
      } catch(e) {
        console.error(e);
      }
    }
  }
}
</script>
