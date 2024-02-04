<template>
  <div class="main">
    <h1 class="nav-title">Archives</h1>
    <div v-for="article in articles" :key="article.id">
      <div class="articleCard" @click="openShowArticlePage(article)">
        <h1 class="articleTitle">{{ article.title }}</h1>
        <div v-html="article.content" class="articleContent"></div>
        <!-- <img :src="image_url" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getArticles } from '../../api/article'
// https://www.npmjs.com/package/cheerio
import { load } from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/hybrid.css';

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
          const highlightedContent = this.highlightCode(article.content);
          return {
            ...article,
            content: highlightedContent.content
          }
        });
      } catch (e) {
        console.error(e);
      }
    },
    highlightCode(parsedHtml: string): {content: string } {
      const $ = load(parsedHtml)
      $('pre code').each((_, elm) => {
        const result = hljs.highlightAuto($(elm).text());
        $(elm).html(result.value);
        $(elm).addClass('hljs');
      });
      return {
        content: $.html(),
      };
    },
    openShowArticlePage(article: Article): void{
      this.$router.push(
        {
          name: 'ArticleShow',
          params: {
            title: article.title,
          }
        }
      );
    }
  },
}
</script>
