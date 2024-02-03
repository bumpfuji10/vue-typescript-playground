<template>
  <div class="main">
    <h1 class="nav-title">Archives</h1>
    <div v-for="article in articles" :key="article.id">
      <div class="articleCard">
        <h1 class="articleTitle">{{ article.title }}</h1>
        <div v-html="article.content" class="articleContent"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getArticles } from '../../api/article'

interface Article {
  id: number,
  title: string,
  content: string,
}

export default {
  name: 'Home',
  data() {
    return {
      articles: [] as Article[],
      body: ""
    }
  },
  created() {
    this.getArticles();
  },
  methods: {
    async getArticles(): Promise<void> {
      try {
        const response = await getArticles();
        this.articles = response.data.contents
      } catch(e) {
        console.error(e);
      }
    },
  },
}
</script>
