<template>
  <v-form ref="form" v-model="isFormValid" @submit.prevent="register">
    <!-- Step Indicator -->
    <div class="step-indicator mb-6">
      <v-stepper v-model="currentStep" class="elevation-0">
        <v-stepper-header>
          <v-stepper-item value="1" :complete="currentStep > 1">
            Basic Info
          </v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item value="2" :complete="currentStep > 2">
            Additional Info
          </v-stepper-item>
        </v-stepper-header>
      </v-stepper>
    </div>

    <!-- Step 1: Basic Information -->
    <v-slide-x-transition>
      <div v-if="currentStep === 1">
        <v-text-field
          v-model="studentId"
          label="Student ID"
          variant="outlined"
          :rules="studentIdRules"
          required
          :error-messages="studentIdError"
          @input="validateStudentId"
          hint="Enter your student ID (max 9 characters, letters and numbers allowed)"
          persistent-hint
        ></v-text-field>

        <v-text-field
          v-model="firstName"
          label="First Name"
          variant="outlined"
          :rules="nameRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="middleName"
          label="Middle Name"
          variant="outlined"
          :rules="nameRules"
        ></v-text-field>

        <v-text-field
          v-model="lastName"
          label="Last Name"
          variant="outlined"
          :rules="nameRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="Email"
          variant="outlined"
          :rules="emailRules"
          required
          :error-messages="emailError"
          @input="validateEmail"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          variant="outlined"
          :rules="passwordRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          :rules="confirmPasswordRules"
          required
        ></v-text-field>

        <v-btn
          class="mt-4"
          color="primary"
          block
          @click="validateAndContinue"
          :loading="loading"
          :disabled="!isFormValid || loading"
        >
          Continue
          <v-icon icon="mdi-arrow-right" class="ml-2"></v-icon>
        </v-btn>
      </div>
    </v-slide-x-transition>

    <!-- Step 2: Additional Information -->
    <v-slide-x-transition>
      <div v-if="currentStep === 2">
        <v-text-field
          v-model="age"
          label="Age"
          type="number"
          variant="outlined"
          :rules="ageRules"
          required
        ></v-text-field>

        <v-select
          v-model="gender"
          label="Gender"
          :items="genderOptions"
          variant="outlined"
          :rules="genderRules"
          required
        ></v-select>

        <v-select
          v-model="courseYear"
          label="Course Year"
          :items="courseYearOptions"
          variant="outlined"
          :rules="courseYearRules"
          required
        ></v-select>

        <div class="d-flex flex-column gap-4 mt-6">
          <v-btn
            color="secondary"
            variant="tonal"
            block
            @click="currentStep = 1"
            class="back-btn"
          >
            <v-icon icon="mdi-arrow-left" class="mr-2"></v-icon>
            Back
          </v-btn>
          <v-btn
            color="primary"
            block
            @click="register"
            :loading="loading"
            :disabled="!isFormValid || loading"
            class="register-btn"
          >
            Register
            <v-icon icon="mdi-check" class="ml-2"></v-icon>
          </v-btn>
        </div>
      </div>
    </v-slide-x-transition>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccessDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
          Registration Successful
        </v-card-title>
        <v-card-text>
          <p>Your account has been created successfully!</p>
          <p class="text-subtitle-2">Student ID: {{ studentId }}</p>
          <p class="text-subtitle-2">Email: {{ email }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="redirectToLogin">
            Proceed to Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['register-success', 'register-error']);

const form = ref(null);
const isFormValid = ref(false);
const loading = ref(false);
const currentStep = ref(1);
const studentId = ref('');
const firstName = ref('');
const middleName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const studentIdError = ref('');
const emailError = ref('');
const showSuccessDialog = ref(false);

// New form fields
const age = ref('');
const gender = ref('');
const courseYear = ref('');

// New options
const genderOptions = ['Male', 'Female', 'Other'];
const courseYearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

// Validation rules
const nameRules = [
  v => !!v || 'Name is required',
  v => v.length >= 2 || 'Name must be at least 2 characters',
  v => /^[A-Za-z\s]*$/.test(v) || 'Name can only contain letters and spaces'
];

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
];

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 8 || 'Password must be at least 8 characters',
  v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
  v => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
  v => /[0-9]/.test(v) || 'Password must contain at least one number'
];

const studentIdRules = [
  v => !!v || 'Student ID is required',
  v => v.length <= 9 || 'Student ID must not exceed 9 characters',
  v => /^[A-Za-z0-9]*$/.test(v) || 'Student ID can only contain letters and numbers'
];

const confirmPasswordRules = [
  v => !!v || 'Please confirm your password',
  v => v === password.value || 'Passwords do not match'
];

const ageRules = [
  v => !!v || 'Age is required',
  v => v >= 16 || 'Age must be at least 16',
  v => v <= 100 || 'Age must be less than 100'
];

const genderRules = [
  v => !!v || 'Gender is required'
];

const courseYearRules = [
  v => !!v || 'Course Year is required'
];

// Validate student ID format and uniqueness
async function validateStudentId() {
  studentIdError.value = '';
  if (!studentId.value) return;

  if (studentId.value.length > 9) {
    studentIdError.value = 'Student ID must not exceed 9 characters';
    return;
  }

  if (!/^[A-Za-z0-9]*$/.test(studentId.value)) {
    studentIdError.value = 'Student ID can only contain letters and numbers';
    return;
  }

  // Check if student ID already exists
  const { data, error } = await supabase
    .from('users')
    .select('student_id')
    .eq('student_id', studentId.value)
    .single();

  if (data) {
    studentIdError.value = 'This Student ID is already registered';
  }
}

// Validate email format and uniqueness
async function validateEmail() {
  emailError.value = '';
  if (!email.value) return;

  if (!/.+@.+\..+/.test(email.value)) {
    emailError.value = 'Please enter a valid email address';
    return;
  }

  // Check if email already exists
  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', email.value)
    .single();

  if (data) {
    emailError.value = 'This email is already registered';
  }
}

function validateAndContinue() {
  if (form.value.validate()) {
    currentStep.value = 2;
  }
}

function redirectToLogin() {
  showSuccessDialog.value = false;
  router.push('/login');
}

async function register() {
  if (!form.value.validate()) return;
  
  loading.value = true;
  try {
    // First, create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          first_name: firstName.value,
          middle_name: middleName.value,
          last_name: lastName.value,
          student_id: studentId.value,
          age: parseInt(age.value),
          gender: gender.value,
          course_year: courseYear.value
        }
      }
    });

    if (authError) throw authError;

    // Then, create the user profile in the users table
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          student_id: studentId.value,
          first_name: firstName.value,
          middle_name: middleName.value,
          last_name: lastName.value,
          email: email.value,
          age: parseInt(age.value),
          gender: gender.value,
          course_year: courseYear.value
        }
      ]);

    if (profileError) throw profileError;

    // Show success dialog instead of immediate redirect
    showSuccessDialog.value = true;
    emit('register-success');
  } catch (error) {
    console.error('Registration error:', error);
    emit('register-error', error.message);
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

.v-dialog .v-card {
  border-radius: 8px;
}

.step-indicator {
  margin-bottom: 2rem;
}

:deep(.v-stepper-header) {
  box-shadow: none !important;
}

:deep(.v-stepper-item) {
  background: transparent !important;
}

:deep(.v-stepper-item--complete) {
  color: #4caf50 !important;
}

.back-btn, .register-btn {
  height: 48px;
  font-size: 1rem;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.5px;
}

.register-btn {
  background: linear-gradient(135deg, #4caf50 0%, #43a047 100%) !important;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
  transition: all 0.3s ease;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.3);
}

.back-btn {
  border: 1px solid rgba(76, 175, 80, 0.2);
  transition: all 0.3s ease;
}

.back-btn:hover {
  background-color: rgba(76, 175, 80, 0.1);
}

.gap-4 {
  gap: 1rem;
}

/* Smooth transitions */
.v-slide-x-transition-enter-active,
.v-slide-x-transition-leave-active {
  transition: all 0.3s ease;
}

.v-slide-x-transition-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.v-slide-x-transition-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>