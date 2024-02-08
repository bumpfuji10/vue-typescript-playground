<template>
  <div class="main">
    <div class="articleHeaderArea">
      <h1 class="articleTitle">{{ article.title }}</h1>
      <span class="articleCreatedAt">{{ article.createdAt }}</span>
    </div>
    <div v-html="article.content" class="articleDetailContent"></div>
  </div>
</template>

<script lang="ts">
import { getArticle } from '../../api/article'
import { highlightCode } from '../../highlightCode'
import moment from 'moment';


export default {
  props: ['id'],
  data() {
    return {
      article: {
        id: this.id,
        title: "",
        content: "",
        createdAt: ""
      },
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    // ArticleShow.vue
    async getArticle() {
      try {
        const response = await getArticle(this.id);
        this.article.title = response.data.title;
        const highlightedContent = highlightCode(response.data.content);
        if (highlightedContent) { // highlightedContentがfalseでない場合のみ実行
          this.article.content = highlightedContent.content;
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    },
    // 多分stringじゃないので型をAPIスキーマ側の型を修正する必要がある気がする
    japanTimeCreatedAt(createdAt: string) {
      return moment(createdAt).utcOffset('+09:00').format('YYYY/MM/DD HH:mm');
    }
  }
};

</script>
