<template>
  <q-page class="flex flex-center column q-pa-md pokemon-bg">
    
    <h1 class="text-h4 text-primary text-weight-bold q-mb-md" style="text-shadow: 2px 2px 4px white;">
      Buscador Pokémon
    </h1>

    <div class="row q-gutter-md q-mb-xl" style="width: 100%; max-width: 400px">
      <q-input 
        outlined 
        v-model="search" 
        label="Nombre Pokémon (ej. charizard)" 
        dense
        class="col bg-white" 
        @keyup.enter="buscarPokemon" 
      />
      <q-btn color="primary" icon="search" @click="buscarPokemon" />
    </div>

    <q-spinner-ball v-if="loading" color="primary" size="4em" />

    <q-card v-if="pokemonData && !loading" class="my-card shadow-5" style="width: 300px">
      <q-img :src="pokemonData.sprites.other['official-artwork'].front_default" class="bg-grey-2">
        <div class="absolute-bottom text-h6 text-center text-capitalize">
          {{ pokemonData.name }}
        </div>
      </q-img>

      <q-card-section>
        <div class="row justify-around q-mb-sm">
          <q-badge color="orange" :label="'Peso: ' + pokemonData.weight" />
          <q-badge color="teal" :label="'Altura: ' + pokemonData.height" />
        </div>
        
        <div class="text-subtitle2">Tipos:</div>
        <div class="row q-gutter-xs">
          <q-chip 
            v-for="t in pokemonData.types" 
            :key="t.type.name"
            color="deep-purple" 
            text-color="white" 
            size="sm"
          >
            {{ t.type.name }}
          </q-chip>
        </div>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { pokeApi } from 'boot/api' 

const $q = useQuasar()
const search = ref('')
const pokemonData = ref(null)
const loading = ref(false)

const buscarPokemon = async () => {
  if (!search.value) return

  loading.value = true
  pokemonData.value = null

  try {
    const nombre = search.value.toLowerCase().trim()
    const response = await pokeApi.get(`/pokemon/${nombre}`)
    pokemonData.value = response.data
    
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'No se encontró ese Pokémon o hubo un error de red.'
    })
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.pokemon-bg {
  background-image: 
    linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4)),
    url('https://ebece.mx/cdn/shop/files/5_6a037827-ae22-4609-8302-d750809ddab3.jpg?v=1695863680');
  
  background-size: cover;
  background-position: center; 
  background-attachment: fixed; 
}
</style>