import instance from './instance'

const api = {
  createQuote(quote) {
    return instance.post('/quotes/', quote).then((res) => res)

  },
  getQuoteById() {},
  getAllQuotes() {
    return instance.get('/quotes/').then((res) => res)
  },
  updateQuote() {},
  deleteQuote() {}
}

export default api
