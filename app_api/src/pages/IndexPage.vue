<template>
  <q-page class="flex flex-center" :style-fn="myPageStyle">
    
    <div class="column q-gutter-y-md q-px-md" style="max-width: 400px; width: 100%;">
      
      <div class="q-gutter-y-md">
        <q-input v-model="city" label="Nombre de la Ciudad" style="background-color: rgba(255, 255, 255, 0.5);" filled clearable @keyup.enter="getWeather"/>
        <q-btn color="primary" label="Buscar Clima" @click="getWeather" :loading="loading" class="full-width" size="lg"/>
      </div>

      <div v-if="weatherData" class="q-mt-xl">
        
        <q-card 
          class="my-card text-dark" 
          style="background-color: rgba(255, 255, 255, 0.5);"
        >
          <q-tooltip 
            anchor="top middle" 
            self="bottom middle"
            :offset="[10, 10]"
            class="bg-grey-9 text-body2"
          >
            Clima actual para {{ weatherData.name }}
          </q-tooltip>

          <q-card-section>
            <div class="text-h6">Clima en {{ weatherData.name }}</div>
            <div class="text-subtitle2">
              {{ weatherData.weather[0].description }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row items-center no-wrap">
              <div class="col-auto">
                <q-img
                  :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
                  width="80px"
                />
              </div>
              <div class="col q-ml-md">
                <div class="text-h3">
                  {{ Math.round(weatherData.main.temp) }}°C
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator /> 

          <q-card-actions align="around">
            <q-btn flat color="primary">Min: {{ Math.round(weatherData.main.temp_min) }}°</q-btn>
            <q-btn flat color="primary">Max: {{ Math.round(weatherData.main.temp_max) }}°</q-btn>
            <q-btn flat color="primary">Humedad: {{ weatherData.main.humidity }}%</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div> </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { api } from 'boot/api';
import { useQuasar } from 'quasar';

const apiKey = 'ab1a6856feb228870e4b4769ff7f0edf';

const city = ref('Reynosa'); 
const weatherData = ref(null);
const loading = ref(false);

const $q = useQuasar();

const myPageStyle = (offset) => {
  return {
    backgroundImage: `url('https://huracansinpeligro.com/wp-content/uploads/2020/10/Qué-son-las-nubes-_-Descubre-sus-clases-1024x612.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    minHeight: `calc(100vh - ${offset}px)`
  };
};

async function getWeather() {
  if (!city.value || !apiKey) {
    $q.notify({
      type: 'negative',
      message: 'Por favor, escribe una ciudad.'
    });
    return;
  }

  loading.value = true;
  weatherData.value = null; 

  $q.loading.show({
    message: 'Obteniendo clima...'
  });

  try {
    // 1. Llamada de Geocoding
    const geoResponse = await api.get('/geo/1.0/direct', {
      params: {
        q: city.value,
        limit: 1,
        appid: apiKey
      }
    });

    if (!geoResponse.data || geoResponse.data.length === 0) {
      $q.notify({
        type: 'negative',
        message: 'No se pudo encontrar esa ciudad.'
      });
      throw new Error('Ciudad no encontrada');
    }

    const location = geoResponse.data[0];

    const weatherResponse = await api.get('/data/2.5/weather', {
      params: {
        lat: location.lat,
        lon: location.lon,
        appid: apiKey,
        units: 'metric', 
        lang: 'es'
      }
    });

    weatherData.value = weatherResponse.data;

  } catch (error) {
    console.error('Error al llamar a la API:', error);
    $q.notify({
      type: 'negative',
      message: 'No se pudo obtener la información. Revisa tu API Key o la consola.'
    });

  } finally {
    loading.value = false;
    $q.loading.hide();
  }
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  backdrop-filter: blur(3px);
}
</style>