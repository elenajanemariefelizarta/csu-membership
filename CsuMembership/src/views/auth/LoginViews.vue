<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForms from '@/components/auth/LoginForms.vue'
</script>

<template>
  <div class="background-image"></div>

  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto" max-width="600">
          <v-card class="mx-auto" elevation="24">
            <v-card-title class="text-center">
              <v-img
                class="mx-auto"
                src="images/logo.jpeg"
                alt="CSU logo"
                width="100"
                height="100"
                cover
                rounded="circle"
              ></v-img>
              <h3 class="font-weight-black">CSU Membership</h3>
              <p class="font-weight-bold">Login Forms</p>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">
              <LoginForms />

              <v-divider class="my-5"></v-divider>
              <h4 class="text-center">
                Don't have an account?
                <RouterLink to="/register">Click here to register</RouterLink>
              </h4>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
