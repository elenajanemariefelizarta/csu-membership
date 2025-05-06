<template>
    <v-form fast-fail @submit.prevent>
                <v-text-field label="First Name" variant="outlined"></v-text-field>
                <v-text-field label="Middle Name" variant="outlined"></v-text-field>
                <v-text-field label="Last Name" variant="outlined"></v-text-field>
                <v-text-field label="Password" type="password" variant="outlined"></v-text-field>
                <v-btn class="mt-2" type="submit" block color="primary">Submit</v-btn>

              </v-form>
</template>