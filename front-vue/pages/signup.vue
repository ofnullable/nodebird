<template>
  <v-container>
    <v-card>
      <v-container>
        <v-subheader>Sign Up!</v-subheader>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="email"
            label="email"
            type="email"
            :rules="emailRules"
            required
          />
          <v-text-field
            v-model="nickname"
            label="nickname"
            type="text"
            :rules="nicknameRules"
            required
          />
          <v-text-field
            v-model="password"
            label="password"
            type="password"
            :rules="passwordRules"
            required
          />
          <v-text-field
            v-model="passwordCheck"
            label="password-check"
            type="password"
            :rules="passwordCheckRules"
            required
          />
          <v-checkbox
            v-model="terms"
            label="저는 말 잘듣는 착한 어린이 입니다."
            :rules="[v => !!v || 'check terms']"
            required
          />
          <v-btn type="submit">sign up</v-btn>
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
        nickname: '',
        password: '',
        passwordCheck: '',
        terms: false,
        emailRules: [
          v => !!v || 'enter email!',
          v => /.+@.+/.test(v) || 'check your email',
        ],
        nicknameRules: [v => !!v || 'enter nickname'],
        passwordRules: [v => !!v || 'enter password'],
        passwordCheckRules: [
          v => !!v || 'enter password',
          v => v === this.password || 'check your password',
        ],
      };
    },
    methods: {
      handleSubmit() {
        if (this.$refs.form.validate()) {
          alert('pass!');
        }
        console.log(this.valid);
      },
    },
  };
</script>

<style>
</style>