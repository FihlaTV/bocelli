<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">Bocelli</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <template v-if="isLoggedIn">
          <b-nav-item href="#/">Home</b-nav-item>
          <b-nav-item href="#/chat">Chat</b-nav-item>
          <b-nav-item href="#/subs">Subscriptions</b-nav-item>
        </template>
        <template v-else>
          <b-nav-item href="#/login">Login</b-nav-item>
          <b-nav-item href="#/register">Register</b-nav-item>
        </template>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <!-- <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav> -->

    </b-collapse>
  </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style>
.container {
  margin-top: 10px;
}
</style>
