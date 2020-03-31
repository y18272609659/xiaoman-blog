import list from '~/articles/list.js'

export const state = () => ({
  initialized: false,
  articles: [],
  dates: {},
  tags: {}
})

export const mutations = {
  initial (state) {
    state.articles = list.articles
    state.dates = list.dates
    state.tags = list.tags
    state.initialized = true
  }
}
