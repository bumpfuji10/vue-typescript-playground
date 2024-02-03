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
// https://www.npmjs.com/package/cheerio
import { load } from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/hybrid.css';

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
        this.articles = response.data.contents.map((article: Article) => {
          // パース対象のHTMLコンテンツをloadの引数に格納
          const $ = load(article.content);
          $('pre code').each((_, elm) => {
            const result = hljs.highlightAuto($(elm).text());
            $(elm).html(result.value);
            $(elm).addClass('hljs');
          });
          return {
            ...article,
            content: $.html()
          };
        });
      } catch (e) {
        console.error(e);
      }
    },

  },
}
</script>
