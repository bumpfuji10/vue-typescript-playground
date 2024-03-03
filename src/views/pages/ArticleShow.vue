<template>
  <SkeltonScreen v-if="is_loading" />
  <div class="main" v-else>
    <div class="articleHeaderArea">
      <h1 class="articleTitle">{{ article.title }}</h1>
      <span class="articleCreatedAt">{{ article.createdAt }}</span>
    </div>
    <div class="articleDetailContainer">
      <div v-html="article.content" class="articleDetail"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { getArticle } from '../../api/article'
import { highlightCode } from '../../highlightCode'
import { japanTimeCreatedAt  } from '../../japanTimeCreatedAt';
import SkeltonScreen from '../SkeltonScreen.vue'


export default {
  components: {
    SkeltonScreen
  },
  props: ['id'],
  data() {
    return {
      article: {
        id: this.id,
        title: '',
        content: "",
        createdAt: "",
      },
      is_loading: false
    }
  },
  created() {
    this.getArticle()
    document.title = this.article.title
  },
  methods: {
    async getArticle() {
      try {
        this.is_loading = true;
        const response = await getArticle(this.id);
        this.article.title = response.data.title;
        document.title = response.data.title;
        const highlightedContent = highlightCode(response.data.content);
        if (highlightedContent) {
          this.article.content = highlightedContent.content;
        }
        this.article.createdAt = this.changeJtc(response.data.createdAt)
        this.is_loading = false
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
