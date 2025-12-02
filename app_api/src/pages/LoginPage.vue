<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        
        <q-card style="width: 350px"> <q-card-section class="text-center">
            <div class="text-h6">Bienvenido</div>
            <div class="text-subtitle2">Inicia Sesión</div>
          </q-card-section>

          <q-form @submit="onSubmit">
            <q-card-section>
              
              <q-input 
                filled 
                v-model="email"
                label="Correo Electrónico" 
                type="email"
                class="q-mb-md"
                lazy-rules
                :rules="[
                  val => val && val.length > 0 || 'El correo es obligatorio',
                  isValidEmail || 'Ingresa un correo válido'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <q-input 
                filled 
                v-model="password"
                label="Contraseña" 
                :type="isPwdHidden ? 'password' : 'text'"
                lazy-rules
                :rules="[
                  val => val && val.length > 0 || 'La contraseña es obligatoria',
                  isValidPassword || 'Mínimo 8 caracteres, 1 Mayúscula, 1 número y 1 signo'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>

                <template v-slot:append>
                  <q-icon
                    :name="isPwdHidden ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwdHidden = !isPwdHidden"
                  />
                </template>
              </q-input>

            </q-card-section>

            <q-card-actions align="center">
              <q-btn flat label="Entrar" color="primary" type="submit" />
            </q-card-actions>
          </q-form>
          
        </q-card>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
const router = useRouter()
const $q = useQuasar()
const email = ref('')
const password = ref('')
const isPwdHidden = ref(true)
const isValidEmail = (val) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(val) || 'Formato inválido'
}
const isValidPassword = (val) => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  return passwordPattern.test(val)
}
const onSubmit = () => {
  $q.notify({
    message: 'Inicio de sesión exitoso',
    color: 'positive',
    icon: 'check'
  })
  router.push('/')
}
</script>