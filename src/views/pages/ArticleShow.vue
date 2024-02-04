<template>
  <div>
    <div class="articleHeaderArea">
      <h1 class="articleTitle">{{ article.title }}</h1>
      <span class="articleCreatedAt">{{ article.createdAt }}</span>
    </div>
    <div v-html="article.content"></div>
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
    async getArticle() {
      try {
        const response = await getArticle(this.id);
        this.article.title = response.data.title;
        const highlightedContent = highlightCode(response.data.content);
        this.article.content = highlightedContent.content;
        this.article.createdAt = this.japanTimeCreatedAt(response.data.createdAt)
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    },
    japanTimeCreatedAt(createdAt: string) {
      return moment(createdAt).utcOffset('+09:00').format('YYYY/MM/DD HH:mm');
    }
  }
};

</script>
