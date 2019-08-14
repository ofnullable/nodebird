<template>
  <v-app>
    <nav>
      <v-toolbar dark color="blue">
        <v-toolbar-title :style="{ display: 'flex', alignItems: 'center' }">
          <nuxt-link to="/">NodeBird - Vue</nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-text-field
            label="Search"
            hide-details
            prepend-icon="mdi-magnify"
            :style="{ display: 'flex', alignItems: 'center' }"
          />
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
    </nav>
    <v-row no-gutters>
      <v-col cols="12" xs="12" md="4">
        <signin-form />
      </v-col>
      <v-col cols="12" xs="12" md="8">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
  import SigninForm from '~/components/SigninForm';

  export default {
    components: {
      SigninForm,
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