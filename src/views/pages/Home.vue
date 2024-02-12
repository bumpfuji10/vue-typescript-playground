<template>
  <title>Kyam Site</title>
  <div class="main">
    <h1 class="nav-title">Archives</h1>
    <div v-for="article in articles" :key="article.id">
      <div class="articleCard" @click="openShowArticlePage(article.id, article.title)">
        <div class="articleWrapper">
          <h1 class="articleTitle">{{ article.title }}</h1>
          <span class="articleCreatedAt">{{ changeJtc(article.createdAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getArticles } from '../../api/article'
import { japanTimeCreatedAt } from '../../japanTimeCreatedAt'

interface Article {
  id: number,
  title: string,
  createdAt: ""
}

export default {
  name: 'Home',
  data() {
    return {
      articles: [] as Article[],
    }
  },
  created() {
    document.title = "Kyam Site"
    this.getArticles();
  },
  methods: {
    async getArticles(): Promise<void> {
      try {
        const response = await getArticles();
        this.articles = response.data.contents
      } catch (e) {
        console.error(e);
      }
    },
    openShowArticlePage(id: number, title: string): void{
      console.log(title)
      this.$router.push(
        {
          name: 'ArticleShow',
          params: {
            id: id,
            title: title
          }
        }
      );
    },
    // 多分stringじゃないので型をAPIスキーマ側の型を修正する必要がある気がする
    changeJtc(createdAt: string) {
      return japanTimeCreatedAt(createdAt)
    }
  },
}
</script>
