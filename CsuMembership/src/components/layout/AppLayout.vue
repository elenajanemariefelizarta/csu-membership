<script setup>
// No additional setup needed
</script>

<template>
  <v-app>
    <!-- Main Content -->
    <v-main class="app-main">
      <div class="background-pattern"></div>
      <slot name="content"></slot>
    </v-main>
  </v-app>
</template>

<style>
.app-main {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #006400 0%, #228B22 50%, #32CD32 100%);
  overflow: hidden;
}

.background-pattern {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.05) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

/* Global styles for auth pages */
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.auth-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 250, 0.98) 100%) !important;
  backdrop-filter: blur(10px);
  border-radius: 16px !important;
  border: 1px solid rgba(255, 215, 0, 0.3) !important;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 100, 0, 0.1) !important;
  position: relative;
  z-index: 2;
}

.auth-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(45deg, rgba(0, 100, 0, 0.02) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(0, 100, 0, 0.02) 25%, transparent 25%);
  background-size: 4px 4px;
  border-radius: 16px;
  pointer-events: none;
}

.auth-title {
  color: #006400 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.auth-subtitle {
  color: rgba(0, 0, 0, 0.6) !important;
}

.auth-link {
  color: #228B22 !important;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.auth-link:hover {
  text-decoration: underline;
  color: #006400 !important;
}

/* Ensure content in Organizations view is above the background pattern */
.v-container {
  position: relative;
  z-index: 1;
}

/* Add subtle animation to the background pattern */
@keyframes patternShift {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

.background-pattern {
  animation: patternShift 20s linear infinite;
}

/* Update form field styles */
.v-text-field {
  background: rgba(255, 255, 255, 0.9) !important;
  border-radius: 8px !important;
}

.v-text-field .v-field__input {
  padding: 12px !important;
}

.v-text-field .v-field__outline {
  border-color: rgba(0, 100, 0, 0.2) !important;
}

.v-text-field:focus-within .v-field__outline {
  border-color: #006400 !important;
}

/* Update button styles */
.v-btn.primary {
  background: linear-gradient(45deg, #006400, #228B22) !important;
  border: 1px solid rgba(255, 215, 0, 0.3) !important;
  box-shadow: 0 2px 8px rgba(0, 100, 0, 0.2) !important;
}

.v-btn.primary:hover {
  box-shadow: 0 4px 12px rgba(0, 100, 0, 0.3) !important;
  transform: translateY(-1px);
}

/* Update chip styles */
.v-chip.primary {
  background: linear-gradient(45deg, #006400, #228B22) !important;
  border: 1px solid rgba(255, 215, 0, 0.3) !important;
  box-shadow: 0 2px 4px rgba(0, 100, 0, 0.1) !important;
}
</style>
