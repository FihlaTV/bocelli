export default {
  user ({user}) {
    return user
  },

  isLoggedIn ({ user }) {
    return !!user.username
  },

  onCallWith (state) {
    return 'TODO'
  },

  getRequests ({ requests }) {
    return requests.reverse();
  }
}
