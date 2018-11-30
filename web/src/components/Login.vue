<template>
  <div class="container">
    <b-alert variant="danger"
             :show="error !== ''">{{ error }}</b-alert>
    <h2>Please Login</h2>

    <b-form @submit="doLogin">
      <b-form-group
        label="Username"
      >
        <b-form-input
          type="text"
          v-model="user.username"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="password">
        <b-form-input
          type="password"
          v-model="user.password"
        ></b-form-input>
      </b-form-group>

      <!-- <b-form-group label="First Name">
        <b-form-input
          type="text"
          v-model="user.firstName"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Last Name">
        <b-form-input
          type="text"
          v-model="user.lastName"
        ></b-form-input>
      </b-form-group> -->

      <b-button type="button" @click="doLogin" variant="primary">Submit</b-button>
    </b-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      error: ''
    }
  },
  methods: {
    doLogin() {
      if (!this.user.username || !this.user.password) {
        this.error = 'Please fill all the field'
        return
      }
      this.$store.dispatch('login', this.user).then(() => {
        this.$router.replace({ name: 'Home' })
      })
      .catch(err => {
        this.error = err.message
      })
    }
  }
}
</script>

<style>
</style>
