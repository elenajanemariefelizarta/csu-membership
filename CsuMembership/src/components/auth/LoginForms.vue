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
import { useRouter } from 'vue-router';

const emit = defineEmits(['login-success', 'login-error']);

const form = ref(null);
const isFormValid = ref(false);
const loading = ref(false);
const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const router = useRouter();

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
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (authError) throw authError;

    // Fetch user profile data after successful login
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw profileError;

    // Verify that required profile fields are present
    if (!profileData.age || !profileData.gender || !profileData.course_year) {
      throw new Error('Please complete your profile information');
    }

    console.log('Logged in successfully:', authData);
    emit('login-success');
    
    // Use Vue Router for navigation
    router.push('/organizations');
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