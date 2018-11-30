export default {
  'SET_USER': (state, user) => {
    state.user = user
  },

  'SET_REQUESTS': (state, requests) => {
    state.requests = requests;
  },

  'ACTIVE_CALL': (state, id) => {
    state.activeCall = id;
  }
}
