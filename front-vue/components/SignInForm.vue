<template>
  <v-container>
    <v-card>
      <v-container>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="email"
            label="email"
            type="email"
            :rules="emailRules"
            required
          />
          <v-text-field
            v-model="password"
            label="password"
            type="password"
            :rules="passwordRules"
            required
          />
          <v-btn color="blue" type="submit" :disabled="!valid">sign in</v-btn>
          <v-btn nuxt to="/signup" type="button">sign up!</v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        emailRules: [
          v => !!v || 'enter email!',
          v => /.+@.+/.test(v) || 'check your email',
        ],
        passwordRules: [v => !!v || 'enter password'],
      };
    },
    methods: {
      handleSubmit() {
        if (this.$refs.form.validate()) {
          alert('pass!');
        }
      },
    },
  };
</script>

<style>
</style>