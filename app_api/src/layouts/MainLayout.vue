<template>
  <q-layout view="hHh lpR fFf">
    
    <q-header elevated>
      <q-toolbar>
        
        <q-toolbar-title>
          </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      bordered
      class="drawer-glass text-black" 
      :width="250"
    >
      <q-list>
        <q-item-label header class="text-grey-9 text-weight-bold">
          Navegación Catalogo de apis
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />

        <q-separator spaced /> <q-item 
          clickable 
          v-ripple 
          @click="logout" 
          class="text-red-9"
        >
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          
          <q-item-section class="text-weight-bold">
            Cerrar Sesión
          </q-item-section>
        </q-item>
        </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // 1. Importar useRouter
import EssentialLink from 'components/EssentialLink.vue'

const router = useRouter() // 2. Inicializar el router

const linksList = [
  {
    title: 'Pokemon API',
    caption: 'Buscador',
    icon: 'catching_pokemon',
    link: '#/pokemon', 
  },
  {
    title: 'Weather API',
    caption: 'Clima',
    icon: 'cloud',
    link: '#/',
  },
  {
    title: 'Bar Virtual',
    caption: 'Cocteles',
    icon: 'local_bar',
    link: '#/bar',
  },
]

const rightDrawerOpen = ref(false)

function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

// 3. Función para cerrar sesión
function logout () {
  // Aquí puedes agregar lógica para borrar tokens, ejemplo:
  // localStorage.removeItem('token') 
  
  // Redireccionar al login (asegúrate que tu ruta se llame '/login')
  router.push('/login')
}
</script>