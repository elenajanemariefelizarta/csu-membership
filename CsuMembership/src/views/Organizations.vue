<template>
  <AppLayout>
    <template #content>
      <div class="organizations-container">
        <!-- Background Elements -->
        <div class="background-elements">
          <div class="bg-circle bg-circle-1"></div>
          <div class="bg-circle bg-circle-2"></div>
          <div class="bg-circle bg-circle-3"></div>
        </div>

        <v-container class="content-wrapper">
          <!-- User Profile Section with Menu -->
          <v-card class="mb-8 profile-card" elevation="4">
            <v-card-text class="pa-4 pa-sm-8">
              <v-row align="center">
                <v-col cols="12" sm="8">
                  <div class="d-flex align-center">
                    <v-menu location="bottom end" transition="scale-transition">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          class="text-none profile-btn"
                          variant="text"
                        >
                          <v-avatar color="primary" size="48" class="mr-3 mr-sm-4">
                            <v-icon icon="mdi-account" size="24" color="white"></v-icon>
                          </v-avatar>
                          <div class="text-left d-none d-sm-block">
                            <div class="text-h6 text-sm-h5 font-weight-bold">{{ userProfile?.first_name || 'Student' }}</div>
                            <div class="text-subtitle-2 text-sm-subtitle-1 text-medium-emphasis">{{ userProfile?.email }}</div>
                          </div>
                          <div class="text-left d-block d-sm-none">
                            <div class="text-subtitle-1 font-weight-bold">{{ userProfile?.first_name || 'Student' }}</div>
                            <div class="text-caption text-medium-emphasis">{{ userProfile?.email }}</div>
                          </div>
                          <v-icon icon="mdi-chevron-down" class="ml-2"></v-icon>
                        </v-btn>
                      </template>
                      <v-card min-width="320" class="profile-menu">
                        <v-list>
                          <v-list-item class="profile-header">
                            <template v-slot:prepend>
                              <v-avatar color="primary" size="48">
                                <v-icon icon="mdi-account" color="white"></v-icon>
                              </v-avatar>
                            </template>
                            <v-list-item-title class="text-h6 font-weight-bold">{{ userProfile?.first_name }} {{ userProfile?.last_name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ userProfile?.email }}</v-list-item-subtitle>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item class="student-info">
                            <v-list-item-title class="text-subtitle-2 font-weight-bold mb-2">Student Information</v-list-item-title>
                            <div class="d-flex flex-column gap-2">
                              <div class="d-flex align-center">
                                <v-icon icon="mdi-identifier" size="small" class="mr-2"></v-icon>
                                <span class="text-body-2">Student ID: {{ userProfile?.student_id }}</span>
                              </div>
                              <div class="d-flex align-center">
                                <v-icon icon="mdi-calendar" size="small" class="mr-2"></v-icon>
                                <span class="text-body-2">Age: {{ userProfile?.age }}</span>
                              </div>
                              <div class="d-flex align-center">
                                <v-icon icon="mdi-gender-male-female" size="small" class="mr-2"></v-icon>
                                <span class="text-body-2">Gender: {{ userProfile?.gender }}</span>
                              </div>
                              <div class="d-flex align-center">
                                <v-icon icon="mdi-school" size="small" class="mr-2"></v-icon>
                                <span class="text-body-2">Course Year: {{ userProfile?.course_year }}</span>
                              </div>
                            </div>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item @click="showProfileDialog = true" class="menu-item">
                            <template v-slot:prepend>
                              <v-icon icon="mdi-account-edit"></v-icon>
                            </template>
                            <v-list-item-title>Edit Profile</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="showMembershipsDialog = true" class="menu-item">
                            <template v-slot:prepend>
                              <v-icon icon="mdi-account-group"></v-icon>
                            </template>
                            <v-list-item-title>My Memberships</v-list-item-title>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item @click="logout" color="error" class="menu-item">
                            <template v-slot:prepend>
                              <v-icon icon="mdi-logout" color="error"></v-icon>
                            </template>
                            <v-list-item-title class="text-error">Logout</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-menu>
                  </div>
                </v-col>
                <v-col cols="12" sm="4" class="d-flex align-center justify-end mt-4 mt-sm-0">
                  <div class="d-flex flex-wrap gap-2">
                    <v-chip color="success" v-if="userMemberships.length" class="membership-chip">
                      <v-icon start icon="mdi-account-group"></v-icon>
                      <span class="d-none d-sm-inline">{{ userMemberships.length }} Organizations Joined</span>
                      <span class="d-inline d-sm-none">{{ userMemberships.length }}</span>
                    </v-chip>
                    <v-chip color="primary" variant="outlined" class="date-chip">
                      <v-icon start icon="mdi-calendar"></v-icon>
                      <span class="d-none d-sm-inline">{{ new Date().toLocaleDateString() }}</span>
                      <span class="d-inline d-sm-none">{{ new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}</span>
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Search and Filter Section -->
          <v-card class="mb-8 search-card" elevation="4">
            <v-card-text class="pa-4 pa-sm-8">
              <v-row align="center">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="searchQuery"
                    prepend-inner-icon="mdi-magnify"
                    label="Search Organizations"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="search-field"
                    bg-color="surface"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="mt-4 mt-sm-0">
                  <v-select
                    v-model="filterStatus"
                    :items="['All', 'Not Joined', 'Pending', 'Member']"
                    label="Filter by Status"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="filter-field"
                    bg-color="surface"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4" class="text-md-end mt-4 mt-md-0">
                  <v-btn
                    color="primary"
                    variant="tonal"
                    prepend-icon="mdi-refresh"
                    @click="refreshOrganizations"
                    :loading="refreshing"
                    class="refresh-btn"
                    block
                    sm="block"
                  >
                    Refresh
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Organizations Grid -->
          <div class="d-flex align-center mb-8 section-header">
            <h1 class="text-h4 font-weight-bold">Available Organizations</h1>
            <v-spacer></v-spacer>
          </div>

          <v-row>
            <v-col v-for="org in filteredOrganizations" :key="org.id" cols="12" md="6">
              <v-card class="mx-auto h-100 org-card" elevation="4" :loading="loading === org.id">
                <v-card-item class="pa-8">
                  <v-card-title class="text-h5 org-title d-flex align-center">
                    {{ org.organization_name }}
                    <v-chip
                      v-if="getOrgStatus(org.id)"
                      :color="getStatusColor(getOrgStatus(org.id))"
                      size="small"
                      class="ml-2 status-chip"
                    >
                      {{ getOrgStatus(org.id) }}
                    </v-chip>
                  </v-card-title>
                  <v-card-subtitle class="mt-2 d-flex align-center">
                    <v-icon icon="mdi-information" size="small" class="mr-1"></v-icon>
                    Program Details
                  </v-card-subtitle>
                </v-card-item>

                <v-card-text class="pa-8 pt-0">
                  <p class="text-body-1 program-description">{{ org.program }}</p>
                  <v-chip-group class="mt-4">
                    <v-chip size="small" color="primary" variant="outlined" class="date-chip">
                      <v-icon start size="small" icon="mdi-calendar"></v-icon>
                      Joined: {{ formatDate(org.created_at) }}
                    </v-chip>
                  </v-chip-group>
                </v-card-text>

                <v-card-actions class="pa-8 pt-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    :color="getOrgStatus(org.id) ? 'error' : 'primary'"
                    variant="tonal"
                    @click="getOrgStatus(org.id) ? leaveOrganization(org.id) : joinOrganization(org.id)"
                    :disabled="loading === org.id"
                    :prepend-icon="getOrgStatus(org.id) ? 'mdi-exit-to-app' : 'mdi-account-plus'"
                    class="action-btn"
                    min-width="200"
                  >
                    {{ getOrgStatus(org.id) ? 'Leave Organization' : 'Join Organization' }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <!-- Empty State -->
          <v-card
            v-if="filteredOrganizations.length === 0"
            class="text-center pa-10 empty-state"
            variant="outlined"
          >
            <v-icon icon="mdi-alert" size="64" class="mb-6" color="warning"></v-icon>
            <h3 class="text-h5 font-weight-bold mb-4">No Organizations Found</h3>
            <p class="text-body-1 text-medium-emphasis">Try adjusting your search or filter criteria</p>
          </v-card>
        </v-container>
      </div>

      <!-- Profile Dialog -->
      <v-dialog v-model="showProfileDialog" max-width="500" transition="dialog-bottom-transition">
        <v-card class="profile-dialog">
          <v-card-title class="text-h5">Edit Profile</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="updateProfile">
              <v-text-field
                v-model="userProfile.first_name"
                label="First Name"
                variant="outlined"
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="userProfile.last_name"
                label="Last Name"
                variant="outlined"
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="userProfile.email"
                label="Email"
                variant="outlined"
                disabled
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="userProfile.age"
                label="Age"
                type="number"
                variant="outlined"
                class="mb-2"
                :rules="[v => v >= 16 || 'Age must be at least 16', v => v <= 100 || 'Age must be less than 100']"
              ></v-text-field>
              <v-select
                v-model="userProfile.gender"
                label="Gender"
                :items="['Male', 'Female', 'Other']"
                variant="outlined"
                class="mb-2"
              ></v-select>
              <v-select
                v-model="userProfile.course_year"
                label="Course Year"
                :items="['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year']"
                variant="outlined"
                class="mb-2"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="updateProfile" class="save-btn">Save Changes</v-btn>
            <v-btn color="error" variant="text" @click="showProfileDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Memberships Dialog -->
      <v-dialog v-model="showMembershipsDialog" max-width="600" transition="dialog-bottom-transition">
        <v-card class="memberships-dialog">
          <v-card-title class="text-h5">My Memberships</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="membership in userMemberships" :key="membership.id" class="membership-item">
                <template v-slot:prepend>
                  <v-avatar color="primary" size="40">
                    <v-icon icon="mdi-account-group" color="white"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-h6">
                  {{ getOrgName(membership.organization_id) }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    :color="getStatusColor(membership.status)"
                    size="small"
                    class="mt-1"
                  >
                    {{ formatStatus(membership.status) }}
                  </v-chip>
                  <div class="mt-2">
                    <v-icon size="small" icon="mdi-calendar" class="mr-1"></v-icon>
                    Joined: {{ formatDate(membership.joined_date) }}
                  </div>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="showMembershipsDialog = false" class="close-btn">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Snackbars -->
      <v-snackbar v-model="showSuccess" color="success" timeout="3000" location="top">
        <template v-slot:prepend>
          <v-icon icon="mdi-check-circle"></v-icon>
        </template>
        {{ successMessage }}
      </v-snackbar>

      <v-snackbar v-model="showError" color="error" timeout="3000" location="top">
        <template v-slot:prepend>
          <v-icon icon="mdi-alert-circle"></v-icon>
        </template>
        {{ errorMessage }}
      </v-snackbar>
    </template>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/lib/supabase';
import AppLayout from '@/components/layout/AppLayout.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const organizations = ref([]);
const loading = ref(null);
const refreshing = ref(false);
const showSuccess = ref(false);
const showError = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const userProfile = ref(null);
const userMemberships = ref([]);
const searchQuery = ref('');
const filterStatus = ref('All');
const showProfileDialog = ref(false);
const showMembershipsDialog = ref(false);

// Fetch user profile and their memberships
onMounted(async () => {
  await fetchUserData();
  await fetchOrganizations();
});

async function fetchUserData() {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    // Get user profile data
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      errorMessage.value = 'Error fetching user profile';
      showError.value = true;
      return;
    }

    userProfile.value = profile;

    // Get user memberships with organization details
    const { data: memberships, error: membershipsError } = await supabase
      .from('memberships')
      .select(`
        *,
        organizations (
          id,
          organization_name,
          program
        )
      `)
      .eq('student_id', profile.student_id);

    if (membershipsError) {
      errorMessage.value = 'Error fetching memberships';
      showError.value = true;
      return;
    }

    userMemberships.value = memberships || [];
  }
}

async function fetchOrganizations() {
  const { data, error } = await supabase.from('organizations').select('*');
  if (error) {
    errorMessage.value = error.message;
    showError.value = true;
  } else {
    organizations.value = data;
  }
}

async function refreshOrganizations() {
  refreshing.value = true;
  await fetchOrganizations();
  refreshing.value = false;
}

// Filter organizations based on search and status
const filteredOrganizations = computed(() => {
  return organizations.value.filter(org => {
    const matchesSearch = org.organization_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         org.program.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    if (filterStatus.value === 'All') return matchesSearch;
    
    const status = getOrgStatus(org.id);
    return matchesSearch && (
      (filterStatus.value === 'Not Joined' && !status) ||
      (filterStatus.value === status)
    );
  });
});

function getStatusColor(status) {
  switch (status) {
    case 'Pending': return 'warning';
    case 'Member': return 'success';
    default: return 'primary';
  }
}

function getOrgStatus(orgId) {
  const membership = userMemberships.value.find(m => m.organization_id === orgId);
  if (!membership) return null;
  return membership.status === 'pending' ? 'Pending' : 'Member';
}

function getOrgName(orgId) {
  const membership = userMemberships.value.find(m => m.organization_id === orgId);
  return membership?.organizations?.organization_name || 'Unknown Organization';
}

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

async function updateProfile() {
  const { error } = await supabase
    .from('users')
    .update({
      first_name: userProfile.value.first_name,
      last_name: userProfile.value.last_name,
      age: parseInt(userProfile.value.age),
      gender: userProfile.value.gender,
      course_year: userProfile.value.course_year
    })
    .eq('id', userProfile.value.id);

  if (error) {
    errorMessage.value = error.message;
    showError.value = true;
  } else {
    successMessage.value = 'Profile updated successfully';
    showSuccess.value = true;
    showProfileDialog.value = false;
  }
}

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    errorMessage.value = error.message;
    showError.value = true;
  } else {
    router.push('/login');
  }
}

async function joinOrganization(orgId) {
  loading.value = orgId;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    errorMessage.value = 'Please log in to join an organization';
    showError.value = true;
    loading.value = null;
    return;
  }

  // Get the user's profile to get their student ID
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('student_id')
    .eq('id', user.id)
    .single();

  if (profileError) {
    errorMessage.value = 'Error fetching user profile';
    showError.value = true;
    loading.value = null;
    return;
  }

  // Check if user already has a membership
  const { data: existingMembership } = await supabase
    .from('memberships')
    .select('*')
    .eq('student_id', profile.student_id)
    .eq('organization_id', orgId)
    .single();

  if (existingMembership) {
    errorMessage.value = 'You are already a member of this organization';
    showError.value = true;
    loading.value = null;
    return;
  }

  const { error } = await supabase.from('memberships').insert([
    {
      organization_id: orgId,
      student_id: profile.student_id,
      status: 'pending',
      joined_date: new Date()
    }
  ]);

  if (error) {
    errorMessage.value = error.message;
    showError.value = true;
  } else {
    successMessage.value = 'Successfully joined the organization!';
    showSuccess.value = true;
    await fetchUserData(); // Refresh user data and memberships
  }
  loading.value = null;
}

async function leaveOrganization(orgId) {
  loading.value = orgId;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    errorMessage.value = 'Please log in to perform this action';
    showError.value = true;
    loading.value = null;
    return;
  }

  // Get the user's profile to get their student ID
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('student_id')
    .eq('id', user.id)
    .single();

  if (profileError) {
    errorMessage.value = 'Error fetching user profile';
    showError.value = true;
    loading.value = null;
    return;
  }

  // Check if membership exists before deleting
  const { data: membership } = await supabase
    .from('memberships')
    .select('*')
    .eq('student_id', profile.student_id)
    .eq('organization_id', orgId)
    .single();

  if (!membership) {
    errorMessage.value = 'You are not a member of this organization';
    showError.value = true;
    loading.value = null;
    return;
  }

  const { error } = await supabase
    .from('memberships')
    .delete()
    .eq('student_id', profile.student_id)
    .eq('organization_id', orgId);

  if (error) {
    errorMessage.value = error.message;
    showError.value = true;
  } else {
    successMessage.value = 'Successfully left the organization';
    showSuccess.value = true;
    await fetchUserData(); // Refresh user data and memberships
  }
  loading.value = null;
}
</script>

<style scoped>
.organizations-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.background-elements {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%);
  filter: blur(40px);
}

.bg-circle-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -100px;
}

.bg-circle-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -100px;
}

.bg-circle-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

@media (min-width: 600px) {
  .content-wrapper {
    padding: 2rem;
  }
}

.profile-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
  border-radius: 24px;
  border: 1px solid rgba(76, 175, 80, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(76, 175, 80, 0.15);
}

.profile-btn {
  transition: all 0.2s ease;
  border-radius: 16px;
  padding: 8px 16px;
  width: 100%;
  justify-content: flex-start;
  min-height: 64px;
}

@media (max-width: 600px) {
  .profile-btn {
    min-height: 48px;
  }
  
  .membership-chip, .date-chip {
    height: 32px;
    font-size: 0.875rem;
  }
  
  .org-card {
    margin: 0 -8px;
  }
  
  .section-header h1 {
    font-size: 1.5rem;
  }
}

.profile-menu {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(76, 175, 80, 0.15);
}

.menu-item {
  transition: all 0.2s ease;
  border-radius: 12px;
  margin: 4px;
  padding: 12px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: rgba(76, 175, 80, 0.1);
}

.membership-chip {
  background: linear-gradient(135deg, #4caf50 0%, #43a047 100%) !important;
  color: white !important;
  transition: all 0.2s ease;
  border-radius: 12px;
  padding: 8px 16px;
  height: 40px;
}

.date-chip {
  border-color: #4caf50 !important;
  color: #4caf50 !important;
  transition: all 0.2s ease;
  border-radius: 12px;
  padding: 8px 16px;
  height: 40px;
}

.membership-chip:hover, .date-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
}

.search-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
  border-radius: 24px;
  border: 1px solid rgba(76, 175, 80, 0.2);
  backdrop-filter: blur(10px);
}

.search-field, .filter-field {
  border-radius: 16px;
}

.search-field :deep(.v-field__outline) {
  border-color: rgba(76, 175, 80, 0.3) !important;
}

.search-field :deep(.v-field--focused .v-field__outline) {
  border-color: #4caf50 !important;
}

.section-header {
  margin-bottom: 32px;
  padding: 0 8px;
}

.section-header h1 {
  color: #2e7d32;
  font-weight: 700;
}

.org-card {
  border-radius: 24px;
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid rgba(76, 175, 80, 0.2);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
  backdrop-filter: blur(10px);
}

.org-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(76, 175, 80, 0.15);
}

.org-title {
  font-weight: 600;
  color: #2e7d32;
}

.status-chip {
  font-weight: 500;
  border-radius: 12px;
}

.program-description {
  color: rgba(46, 125, 50, 0.8);
  line-height: 1.6;
}

.action-btn {
  border-radius: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-transform: none;
  letter-spacing: 0.5px;
  padding: 12px 24px;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(76, 175, 80, 0.2);
}

.empty-state {
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
  border: 1px solid rgba(76, 175, 80, 0.2);
  backdrop-filter: blur(10px);
}

.profile-dialog, .memberships-dialog {
  border-radius: 24px;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.membership-item {
  border-radius: 16px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
  padding: 16px;
}

.membership-item:hover {
  background-color: rgba(76, 175, 80, 0.1);
}

.save-btn, .close-btn {
  border-radius: 16px;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.5px;
  padding: 12px 24px;
  min-width: 120px;
}

/* Update v-btn colors */
:deep(.v-btn--variant-tonal) {
  background-color: rgba(76, 175, 80, 0.1) !important;
  color: #2e7d32 !important;
}

:deep(.v-btn--variant-tonal:hover) {
  background-color: rgba(76, 175, 80, 0.2) !important;
}

/* Update v-chip colors */
:deep(.v-chip--variant-outlined) {
  border-color: #4caf50 !important;
  color: #4caf50 !important;
}

:deep(.v-chip--variant-filled) {
  background-color: #4caf50 !important;
  color: white !important;
}

/* Update v-select colors */
:deep(.v-select .v-field__outline) {
  border-color: rgba(76, 175, 80, 0.3) !important;
}

:deep(.v-select .v-field--focused .v-field__outline) {
  border-color: #4caf50 !important;
}

/* Update v-text-field colors */
:deep(.v-text-field .v-field__outline) {
  border-color: rgba(76, 175, 80, 0.3) !important;
}

:deep(.v-text-field .v-field--focused .v-field__outline) {
  border-color: #4caf50 !important;
}

/* Animation classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
}

/* Responsive adjustments */
.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

@media (min-width: 600px) {
  .content-wrapper {
    padding: 2rem;
  }
}

.profile-btn {
  transition: all 0.2s ease;
  border-radius: 16px;
  padding: 8px 16px;
  width: 100%;
  justify-content: flex-start;
  min-height: 64px;
}

@media (max-width: 600px) {
  .profile-btn {
    min-height: 48px;
  }
  
  .membership-chip, .date-chip {
    height: 32px;
    font-size: 0.875rem;
  }
  
  .org-card {
    margin: 0 -8px;
  }
  
  .section-header h1 {
    font-size: 1.5rem;
  }
}

.gap-2 {
  gap: 0.5rem;
}

/* Ensure proper spacing on mobile */
.v-card-text {
  padding: 1rem;
}

@media (min-width: 600px) {
  .v-card-text {
    padding: 2rem;
  }
}

/* Improve button responsiveness */
.action-btn {
  width: 100%;
  max-width: 200px;
}

@media (max-width: 600px) {
  .action-btn {
    max-width: none;
  }
}

/* Improve dialog responsiveness */
.profile-dialog, .memberships-dialog {
  margin: 1rem;
  width: calc(100% - 2rem);
}

@media (min-width: 600px) {
  .profile-dialog, .memberships-dialog {
    margin: 0;
    width: 100%;
  }
}

/* Improve list item responsiveness */
.membership-item {
  padding: 0.75rem;
}

@media (min-width: 600px) {
  .membership-item {
    padding: 1rem;
  }
}

/* Improve chip responsiveness */
.membership-chip, .date-chip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Improve search and filter fields responsiveness */
.search-field, .filter-field {
  width: 100%;
}

/* Improve grid responsiveness */
.v-row {
  margin: -8px;
}

.v-col {
  padding: 8px;
}

@media (min-width: 600px) {
  .v-row {
    margin: -12px;
  }
  
  .v-col {
    padding: 12px;
  }
}

.student-info {
  padding: 16px;
  background-color: rgba(76, 175, 80, 0.05);
  border-radius: 12px;
  margin: 8px;
}

.student-info .v-icon {
  color: #4caf50;
}
</style> 