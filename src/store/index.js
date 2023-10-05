import { createStore } from 'vuex'
import api from '../api'
export default createStore({
  state: {
    quotes: [],
    quotesLoading: false,
    quotesError: false,
    currentQuote: {},
    currentQuoteLoading: false,
    currentQuoteError: false
  },
  mutations: {
    ADD_QUOTE(state, payload) {
      state.quotes.push(payload)
    },
    SET_LOADER(state, payload) {
      state.quotesLoading = payload
    },
    SET_QUOTES_ERROR(state, payload) {
      state.quotesError = payload
    },
    SET_QUOTES(state, payload) {
      state.quotes = payload
    },
    SET_CURRENT_QUOTE(state, payload) {
      state.currentQuote = payload
    },
    SET_CURRENT_LOADER(state, payload) {
      state.currentQuoteLoading = payload
    },
    SET_CURRENT_ERROR(state, payload) {
      state.currentQuoteError = payload
    }
  },
  actions: {
    getAllQuotes(context) {
      context.commit('SET_LOADER', true)
      api
        .getAllQuotes()
        .then((res) => {
          context.commit('SET_QUOTES', res.data)
          context.commit('SET_LOADER', false)
        })
        .catch((e) => {
          context.commit('SET_QUOTES_ERROR', e)
          context.commit('SET_LOADER', false)
        })
    },
    deleteQuote(context, id) {
      context.commit('SET_LOADER', true)
      api
        .deleteQuote(id)
        .then((res) => {
          context.commit(
            'SET_QUOTES',
            context.state.quotes.filter((e) => e.id !== id)
          )
          context.commit('SET_LOADER', false)
        })
        .catch((e) => {
          context.commit('SET_QUOTES_ERROR', e)
          context.commit('SET_LOADER', false)
        })
    },
    updateQuote(context, payload) {
      context.commit('SET_LOADER', true)
      api
        .updateQuote(payload.id, payload)
        .then((res) => {
          const quotes = context.getters.getQuotes.map((e) => (e.id == payload.id ? payload : e))

          context.commit('SET_QUOTES', quotes)
          context.commit('SET_CURRENT_QUOTE', { ...payload, id: Number(payload.id) })
          context.commit('SET_LOADER', false)
        })
        .catch((e) => {
          context.commit('SET_QUOTES_ERROR', e)
          context.commit('SET_LOADER', false)
        })
    },
    getCurrentQuote(context, payload) {
      context.commit('SET_CURRENT_LOADER', true)
      api
        .getQuoteById(payload)
        .then((res) => {
          context.commit('SET_CURRENT_QUOTE', { ...res.data })
          context.commit('SET_CURRENT_LOADER', false)
        })
        .catch((e) => {
          context.commit('SET_CURRENT_QUOTE', res.data)
          context.commit('SET_CURRENT_LOADER', false)
        })
    },
    createQuote(context, payload) {
      context.commit('SET_LOADER', true)
      api
        .createQuote(payload)
        .then((res) => {
          context.commit('SET_QUOTES', [...res.data, payload])
          context.commit('SET_LOADER', false)
        })
        .catch((e) => {
          context.commit('SET_QUOTES_ERROR', e)
          context.commit('SET_LOADER', false)
        })
    }
  },
  getters: {
    getCurrentQuote(state) {
      return state.currentQuote
    },
    getCurrentLoading(state) {
      return state.currentQuoteLoading
    },
    getQuotes(state) {
      return state.quotes
    },
    getQuotesLoading(state) {
      return state.quotesLoading
    },
    getQuotesError(state) {
      return state.quotesError
    },
    getCurrentError(state) {
      return state.currentQuoteError
    }
  }
})
