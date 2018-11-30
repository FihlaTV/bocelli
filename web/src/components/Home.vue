<template>
  <div class="container">
    <h1>Hello {{ user.firstName }} {{ user.lastName }}</h1>
    <h2>People currently looking for help</h2>
    <div>
      <!-- img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top -->
      <div v-if="getRequests.length === 0">
        No on is currently looking for help
      </div>
      <b-card v-for="req in getRequests" :key="req.id"
            :title="req.userID"
            class="mb-2">
        <p class="card-text" style="font-size: 50px">
          {{ req.text }}
        </p>
        <b-button @click="help(req.id)" variant="primary">Start Helping</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

let interval;

export default {

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.user.username) {
        next({ name: 'Login' })
      }
    })
  },

  data () {
    return {
    }
  },

  mounted() {
    interval = setInterval(() => {
      this.helpRequests();
    }, 2000)
  },

  beforeDestroy() {
    clearInterval(interval);
  },

  computed: {
    ...mapState(['user']),
    ...mapGetters(['isLoggedIn', 'getRequests'])
  },

  methods: {
    ...mapActions(['helpRequests', 'giveHelp']),
    help(reqID) {
      this.giveHelp(reqID).then(() => {
        this.$router.push({ name: 'Chat' });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
