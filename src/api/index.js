import instance from './instance'

const api = {
  createQuote(quote) {
    return instance.post('/quotes/', quote).then((res) => res)
  },
  getQuoteById(id) {
    return instance.get('/quotes/' + id).then((res) => res)
  },
  getAllQuotes() {
    return instance.get('/quotes/').then((res) => res)
  },
  updateQuote(id, newQuote) {
    return instance.put('/quotes/' + id, newQuote).then((res) => res)
  },
  deleteQuote(id) {
    return instance.delete('/quotes/' + id).then((res) => res)
  }
}

export default api
