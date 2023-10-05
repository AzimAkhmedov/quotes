import { createRouter, createWebHistory } from 'vue-router'
import { CreateQuoteView, QuoteDetailsView, QuotesView } from '../views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'quotes',
      component: QuotesView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateQuoteView
    },
    {
      path: '/:id',
      component: QuoteDetailsView
    }
  ]
})

export default router
