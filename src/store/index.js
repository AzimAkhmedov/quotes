import { createStore } from 'vuex'

export default createStore({
  state: {
    test: 'Azim',
    quotes: [],
    quotesLoading: false,
    quotesError: false
  },
  mutations: {
    AddQuote(state, payload) {
      state.quotes.push(payload)
    }
  },
  actions: {},
  getters: {}
})
