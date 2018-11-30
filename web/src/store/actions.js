import api from '../logic/api'

export default {
  login: async ({ commit }, user) => {
    try {
      user = await api.login(user)
      commit('SET_USER', user.data)
    } catch (err) {
      if (err.response.status === 401) {
        throw new Error('Wrong Username/Password given')
      }
    }
  },

  register: async ({ commit }, user) => {
    try {
      user = await api.register(user)
      commit('SET_USER', user.data)
    } catch (err) {
      if (err.response.status === 401) {
        throw new Error('Wrong Username/Password given')
      }
    }
  },

  helpRequests: async ({ commit }) => {
    const res = await api.helpRequests();

    commit('SET_REQUESTS', res.data);
  },

  giveHelp: async ({ dispatch, commit }, id) => {
    await api.giveHelp(id);
    commit('ACTIVE_CALL', id);
    dispatch('helpRequests');
  }
}
