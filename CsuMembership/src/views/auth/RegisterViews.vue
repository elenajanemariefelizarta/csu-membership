<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
         <v-col cols="12" md="6" class="mx-auto" max-width="600">
          <v-card class="mx-auto" elevation="24">
         <v-card-title class="text-center">
          <v-img
           class="mx-auto"
             src="images/logo.jpeg"
               width="100"
              height="100"
                cover
             rounded="circle"></v-img>
         <h3 class="font-weight-black">CSU Membership</h3>  
           <p class="font-weight-bold">Registration Forms</p>
          </v-card-title>


            <v-card-text class="bg-surface-light pt-4">
              <v-form fast-fail @submit.prevent>
                <v-text-field label="First Name" variant="outlined"></v-text-field>
                <v-text-field label="Middle Name" variant="outlined"></v-text-field>
                <v-text-field label="Last Name" variant="outlined"></v-text-field>
                <v-text-field label="Password" type="password" variant="outlined"></v-text-field>
                <v-btn class="mt-2" type="submit" block color="primary">Submit</v-btn>

              </v-form>

              <v-divider class="my-5"></v-divider>
              <h3 class="text-center">
                Already have an account?
                <RouterLink to="/login">Click here to login</RouterLink>
              </h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
