<template>
  <q-page class="q-pa-md bg-grey-10 text-white">
    
    <div class="text-center q-mb-lg">
      <h1 class="text-h3 text-amber">Bar Virtual</h1>
    </div>

    <div class="row justify-center q-mb-xl">
      <q-input 
        dark outlined rounded
        v-model="search" 
        label="Ej: Margarita, Mojito, Vodka" 
        class="col-12 col-md-6"
        @keyup.enter="buscarCoctel"
      >
        <template v-slot:append>
          <q-btn round dense flat icon="local_bar" color="amber" @click="buscarCoctel" />
        </template>
      </q-input>
    </div>

    <div v-if="loading" class="flex flex-center">
      <q-spinner-glass color="amber" size="4em" />
    </div>

    <div v-if="drinks.length > 0 && !loading" class="row q-col-gutter-lg">
      <div v-for="drink in drinks" :key="drink.idDrink" class="col-12 col-md-6 col-lg-4">
        
        <q-card class="my-card bg-grey-9 text-white shadow-10">
          <q-img :src="drink.strDrinkThumb" style="height: 250px">
            <div class="absolute-bottom text-h6 text-center">
              {{ drink.strDrink }}
            </div>
          </q-img>

          <q-card-section>
            <div class="row items-center justify-between q-mb-sm">
              <q-badge color="amber-9" text-color="black" :label="drink.strCategory" />
              <q-badge outline color="grey-4" :label="drink.strAlcoholic" />
            </div>
            
            <div class="text-body2 text-grey-4 q-mb-md">
              <q-icon name="description" /> {{ drink.strInstructions }}
            </div>

            <q-separator dark />
            
            <div class="q-mt-sm">
              <div class="text-subtitle2 text-amber">Ingredientes:</div>
              <ul class="q-pl-md text-caption">
                <li v-for="(ing, index) in getIngredientes(drink)" :key="index">
                  {{ ing }}
                </li>
              </ul>
            </div>
          </q-card-section>
        </q-card>

      </div>
    </div>
    
    <div v-if="noResults" class="text-center text-h6 text-grey-5">
      No encontramos esa bebida. ¡Intenta con "Mojito"!
    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { cocktailApi } from 'boot/api' 
const search = ref('')
const drinks = ref([])
const loading = ref(false)
const noResults = ref(false)
const getIngredientes = (drink) => {
  const ingredientes = []
  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`]
    const measure = drink[`strMeasure${i}`]  
    if (ing) {
      const texto = measure ? `${measure} ${ing}` : ing
      ingredientes.push(texto)
    }
  }
  return ingredientes
}
const buscarCoctel = async () => {
  if (!search.value) return
  loading.value = true
  drinks.value = []
  noResults.value = false
  try {
    const response = await cocktailApi.get(`/search.php?s=${search.value}`)
    if (response.data.drinks) {
      drinks.value = response.data.drinks
    } else {
      noResults.value = true
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>