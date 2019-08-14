<template>
  <v-container>
    <v-card style="margin-bottom: 1em;">
      <v-container>
        <v-subheader>Profile</v-subheader>
      </v-container>
      <v-container>
        <v-form>
          <v-text-field label="nickname" required />
          <v-btn color="blue" type="submit">modify</v-btn>
        </v-form>
      </v-container>
    </v-card>
    <v-card style="margin-bottom: 1em;">
      <v-container>
        <v-subheader>Follower</v-subheader>
        <follow-list />
      </v-container>
    </v-card>
    <v-card style="margin-bottom: 1em;">
      <v-container>
        <v-subheader>Following</v-subheader>
        <follow-list />
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
  import FollowList from '~/components/FollowList';
  export default {
    components: {
      FollowList,
    },
  };
</script>

<style>
</style>