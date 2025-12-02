const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'pokemon', component: () => import('pages/PokemonPage.vue') },
      { path: 'bar', component: () => import('pages/CocktailPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') }
    ]
  },
]

export default routes