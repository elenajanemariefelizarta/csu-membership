<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="teal-darken-1">
        <v-spacer></v-spacer>
          <v-btn
          variant="elevated"
          slim
           @click="onClick"
           class="custom-btn">
         <v-img
         src="/images/logo.jpeg"
          alt="Custom Photo"
          width="24"  height="24"/></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <slot name="content"></slot>
        </v-container>
      </v-main>

      <v-footer class="d-flex align-center justify-center text-center" 
      color="teal-darken-1" elevation="24" border app> 2025 MEMBERSHIP</v-footer>

    </v-app>
  </v-responsive>
</template>
