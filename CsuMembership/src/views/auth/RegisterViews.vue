<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForms from '@/components/auth/RegisterForms.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto" max-width="600">
          <v-card class="mx-auto" elevation="24">
            <v-card-title class="text-center">
      
              <h3 class="font-weight-black">CSU Membership</h3>
              <p class="font-weight-bold">Registration Forms</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <v-divider class="my-5"></v-divider>

              <RegisterForms />

              <v-divider class="my-5"></v-divider>
              <h4 class="text-center">
                Already have an account?
                <RouterLink to="/login">Click here to login</RouterLink>
              </h4>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
