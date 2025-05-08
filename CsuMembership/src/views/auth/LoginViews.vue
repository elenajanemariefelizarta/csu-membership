<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForms from '@/components/auth/LoginForms.vue'
import { ref } from 'vue';

const loginSuccess = ref(false);
const loginError = ref('');

function handleLoginSuccess() {
  loginSuccess.value = true;
  loginError.value = '';
}

function handleLoginError(error) {
  loginError.value = error;
  loginSuccess.value = false;
}
</script>

<template>
  <AppLayout>
    <template #content>
      <div class="auth-container">
        <v-row justify="center" align="center" class="fill-height">
          <!-- Login Form Section -->
          <v-col cols="12" md="6" lg="5" xl="4">
            <v-card class="auth-card" elevation="8">
              <!-- Logo and Title Section -->
              <div class="text-center pa-6">
                <v-img
                  src="images/logo.jpeg"
                  width="120"
                  height="120"
                  class="mx-auto mb-4"
                  cover
                  rounded="circle"
                ></v-img>
                <h1 class="text-h4 font-weight-bold auth-title mb-2">Welcome Back!</h1>
                <p class="text-subtitle-1 auth-subtitle">Sign in to continue to CSU Membership</p>
              </div>

              <!-- Form Section -->
              <v-card-text class="pa-6">
                <LoginForms 
                  @login-success="handleLoginSuccess" 
                  @login-error="handleLoginError" 
                />

                <!-- Alert Messages -->
                <v-slide-y-transition>
                  <v-alert
                    v-if="loginSuccess"
                    type="success"
                    class="mt-4"
                    variant="tonal"
                    density="comfortable"
                  >
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check-circle"></v-icon>
                    </template>
                    Login successful! Redirecting...
                  </v-alert>
                </v-slide-y-transition>

                <v-slide-y-transition>
                  <v-alert
                    v-if="loginError"
                    type="error"
                    class="mt-4"
                    variant="tonal"
                    density="comfortable"
                  >
                    <template v-slot:prepend>
                      <v-icon icon="mdi-alert-circle"></v-icon>
                    </template>
                    {{ loginError }}
                  </v-alert>
                </v-slide-y-transition>

                <!-- Additional Links -->
                <div class="text-center mt-6">
                  <v-divider class="mb-4"></v-divider>
                  <p class="text-body-2 auth-subtitle mb-2">
                    Don't have an account?
                    <router-link 
                      to="/register" 
                      class="auth-link"
                    >
                      Create Account
                    </router-link>
                  </p>
                  <!-- <router-link 
                    to="/forgot-password" 
                    class="auth-link text-caption"
                  >
                    Forgot Password?
                  </router-link> -->
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Content Section -->
          <v-col cols="12" md="6" lg="7" xl="8" class="d-none d-md-flex align-center justify-center">
            <div class="content-section pa-6">
              <div class="text-center mb-8">
                <h2 class="text-h3 font-weight-bold text-white mb-4">CSU Membership Portal</h2>
                <p class="text-h6 text-white text-opacity-90">Join and manage your student organizations</p>
              </div>

              <!-- Features Grid -->
              <v-row class="mt-8">
                <v-col cols="12" sm="6" class="feature-item">
                  <v-card class="feature-card" variant="tonal">
                    <v-card-text>
                      <v-icon icon="mdi-account-group" size="32" color="white" class="mb-4"></v-icon>
                      <h3 class="text-h6 text-white mb-2">Student Organizations</h3>
                      <p class="text-white text-opacity-80">Join various student organizations and clubs</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" class="feature-item">
                  <v-card class="feature-card" variant="tonal">
                    <v-card-text>
                      <v-icon icon="mdi-calendar-check" size="32" color="white" class="mb-4"></v-icon>
                      <h3 class="text-h6 text-white mb-2">Easy Management</h3>
                      <p class="text-white text-opacity-80">Manage your memberships and activities</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" class="feature-item">
                  <v-card class="feature-card" variant="tonal">
                    <v-card-text>
                      <v-icon icon="mdi-bell-ring" size="32" color="white" class="mb-4"></v-icon>
                      <h3 class="text-h6 text-white mb-2">Stay Updated</h3>
                      <p class="text-white text-opacity-80">Get notifications about events and updates</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" class="feature-item">
                  <v-card class="feature-card" variant="tonal">
                    <v-card-text>
                      <v-icon icon="mdi-chart-line" size="32" color="white" class="mb-4"></v-icon>
                      <h3 class="text-h6 text-white mb-2">Track Progress</h3>
                      <p class="text-white text-opacity-80">Monitor your involvement and achievements</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
    </template>
  </AppLayout>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  position: relative;
  overflow: hidden;
}

.auth-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.auth-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
  border-radius: 24px;
  border: 1px solid rgba(76, 175, 80, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.auth-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(76, 175, 80, 0.15);
}

.auth-title {
  color: #2e7d32;
  font-weight: 700;
}

.auth-subtitle {
  color: #1b5e20;
  opacity: 0.8;
}

.auth-link {
  color: #4caf50;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.auth-link:hover {
  color: #2e7d32;
  text-decoration: underline;
}

.content-section {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.content-section h2 {
  color: #1b5e20;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 700;
}

.content-section p {
  color: #2e7d32;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.feature-card {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(76, 175, 80, 0.1) 100%) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.15) 100%) !important;
  box-shadow: 0 8px 32px rgba(76, 175, 80, 0.2);
}

.feature-card h3 {
  color: #1b5e20;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.feature-card p {
  color: #2e7d32;
  opacity: 0.95;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

.feature-card .v-icon {
  color: #4caf50 !important;
}

.feature-item {
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: scale(1.02);
}

/* Update Vuetify components */
:deep(.v-field__outline) {
  border-color: rgba(76, 175, 80, 0.3) !important;
}

:deep(.v-field--focused .v-field__outline) {
  border-color: #4caf50 !important;
}

:deep(.v-btn--variant-tonal) {
  background-color: rgba(76, 175, 80, 0.1) !important;
  color: #2e7d32 !important;
}

:deep(.v-btn--variant-tonal:hover) {
  background-color: rgba(76, 175, 80, 0.2) !important;
}

:deep(.v-alert--variant-tonal) {
  border-color: rgba(76, 175, 80, 0.2) !important;
}

:deep(.v-alert--variant-tonal.v-alert--success) {
  background-color: rgba(76, 175, 80, 0.1) !important;
  color: #2e7d32 !important;
}

:deep(.v-alert--variant-tonal.v-alert--error) {
  background-color: rgba(244, 67, 54, 0.1) !important;
  color: #d32f2f !important;
}
</style>
