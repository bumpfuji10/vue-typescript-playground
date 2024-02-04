<template>
  <div class="main">
    <h1 class="nav-title">Archives</h1>
    <div v-for="article in articles" :key="article.id">
      <div class="articleCard" @click="openShowArticlePage(article.id)">
        <h1 class="articleTitle">{{ article.title }}</h1>
        <div v-html="article.content" class="articleContent"></div>
        <!-- <img :src="image_url" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getArticles } from '../../api/article'
import { highlightCode } from '../../highlightCode'

interface Article {
  id: number,
  title: string,
  content: string,
  image?: { url: string } // Assuming image is optional
}

export default {
  name: 'Home',
  data() {
    return {
      articles: [] as Article[],
      body: "",
      image_url: ""
    }
  },
  created() {
    this.getArticles();
  },
  methods: {
    async getArticles(): Promise<void> {
      try {
        const response = await getArticles();
        this.articles = response.data.contents.map((article: Article) => {
          const highlightedContent = highlightCode(article.content);
          return {
            ...article,
            content: highlightedContent.content
          }
        });
      } catch (e) {
        console.error(e);
      }
    },
    openShowArticlePage(id: number): void{
      this.$router.push(
        {
          name: 'ArticleShow',
          params: {
            id: id,
          }
        }
      );
    }
  },
}
</script>
