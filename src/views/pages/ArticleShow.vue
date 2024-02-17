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
import { japanTimeCreatedAt  } from '../../japanTimeCreatedAt';


export default {
  props: ['id'],
  data() {
    return {
      article: {
        id: this.id,
        title: '',
        content: "",
        createdAt: ""
      },
    }
  },
  created() {
    this.getArticle()
    document.title = this.article.title
  },
  methods: {
    async getArticle() {
      try {
        const response = await getArticle(this.id);
        this.article.title = response.data.title;
        document.title = response.data.title;
        const highlightedContent = highlightCode(response.data.content);
        if (highlightedContent) {
          this.article.content = highlightedContent.content;
        }
        this.article.createdAt = this.changeJtc(response.data.createdAt)
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    },
    changeJtc(createdAt: string) {
      return japanTimeCreatedAt(createdAt)
    }
  }
};

</script>
