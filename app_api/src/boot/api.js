import { boot } from 'quasar/wrappers';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org'
});

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
});

const cocktailApi = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1'
});

export default boot(({ app }) => {
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$pokeApi = pokeApi;
  app.config.globalProperties.$cocktailApi = cocktailApi;
});

export { api, pokeApi, cocktailApi };
