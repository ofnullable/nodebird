<template>
  <div>
    <v-toolbar dark>
      <v-toolbar-items>
        <v-toolbar-title :style="{ display: 'flex', alignItems: 'center' }">
          <nuxt-link to="/">Home</nuxt-link>
        </v-toolbar-title>
        <v-btn
          text
          nuxt
          to="profile"
          :style="{ display: 'flex', alignItems: 'center' }"
        >
          profile
        </v-btn>
        <v-btn
          text
          nuxt
          to="/signup"
          :style="{ display: 'flex', alignItems: 'center' }"
        >
          signup
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout>
      <v-flex xs12 md4>
        <sign-in-form />
      </v-flex>
      <v-flex xs12 md8>
        <nuxt />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import SignInForm from '~/components/SignInForm';

  export default {
    components: {
      SignInForm,
    },
  };
</script>

<style scoped>
  a {
    padding: 0 16px;
    color: inherit;
    text-decoration: none;
  }
</style>>