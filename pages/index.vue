<template>
  <div class="container">
    <div>
      <h1>首页</h1>
      <h3 v-for="item of list" :key="item.title">
        <nuxt-link :to="{name: 'blog-title', query: { fileName: item.fileName}}">
          {{ item.title }}
        </nuxt-link>
      </h3>
    </div>
  </div>
</template>

<script>

export default {
  asyncData ({ store }) {
    if (store.state.initialized === false) {
      store.commit('initial')
      console.log('触发initial函数，初始化vuex')
    }
    const data = store.state
    return {
      list: data.articles,
      dates: data.dates,
      tags: data.tags
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
