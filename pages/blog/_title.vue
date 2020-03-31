<template>
  <div class="article-detail">
    <h1>{{ '文章标题: ' + title }}</h1>
    <div v-html="html"></div>
  </div>
</template>

<script>
export default {
  asyncData ({ route }) {
    const markdown = require(`~/articles/article/${route.query.fileName}`)
    return {
      title: markdown.attributes.title,
      html: markdown.html
    }
  },
  data () {
    return {}
  }

}
</script>

<style scoped>
  .article-detail {
    margin: 100px;
  }
  .article-detail >>> pre {
    margin: 20px 0;
    padding: 10px;
    overflow: auto;
    background: #f6f6f6;
  }
</style>
