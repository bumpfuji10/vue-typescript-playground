<template>
  <div>
    <h1>{{ article.title }}</h1>
    <div v-html="article.content"></div>
  </div>
</template>

<script>
import { getArticle } from '../../api/article'
// https://www.npmjs.com/package/cheerio
import { load } from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/hybrid.css';

export default {
  props: ['id'],
  data() {
    return {
      article: {
        id: this.id,
        title: "",
        content: ""
      }
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      try {
        const response = await getArticle(this.id);
        this.article.title = response.data.title;
        this.article.content = response.data.content;
        console.log(this.article)
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    }
  }
};

</script>
