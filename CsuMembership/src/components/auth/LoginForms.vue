<template>
  <v-form ref="form" v-model="isFormValid" @submit.prevent="login">
    <v-text-field
      v-model="email"
      label="Email"
      variant="outlined"
      :rules="emailRules"
      required
      :error-messages="emailError"
      @input="validateEmail"
      hint="Enter your registered email address"
      persistent-hint
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      variant="outlined"
      :rules="passwordRules"
      required
      :error-messages="passwordError"
      @input="validatePassword"
      hint="Enter your password"
      persistent-hint
    ></v-text-field>

    <v-btn
      class="mt-2"
      type="submit"
      block
      color="primary"
      :loading="loading"
      :disabled="!isFormValid || loading"
    >
      Sign In
    </v-btn>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';

const emit = defineEmits(['login-success', 'login-error']);

const form = ref(null);
const isFormValid = ref(false);
const loading = ref(false);
const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

// Validation rules
const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
];

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 8 || 'Password must be at least 8 characters'
];

// Validate email format
function validateEmail() {
  emailError.value = '';
  if (!email.value) return;

  if (!/.+@.+\..+/.test(email.value)) {
    emailError.value = 'Please enter a valid email address';
  }
}

// Validate password
function validatePassword() {
  passwordError.value = '';
  if (!password.value) return;

  if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters';
  }
}

async function login() {
  if (!form.value.validate()) return;
  
  loading.value = true;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (error) throw error;

    console.log('Logged in successfully:', data);
    emit('login-success');
    // Redirect to organizations page
    window.location.href = '/organizations';
  } catch (error) {
    console.error('Error logging in:', error.message);
    emit('login-error', error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.v-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>