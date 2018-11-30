import axios from 'axios'

axios.defaults.baseURL = process.env.API_SERVER

export default {
  login: (user) => {
    return axios.post('/api/user/login', user);
  },

  register: (user) => {
    return axios.post('/api/user/register', user);
  },

  helpRequests: () => {
    return axios.get('/api/help-requests');
  },

  giveHelp: (helpRequestID) => {
    return axios.put('/api/remove-help-request', {
      helpRequestID
    });
  }
}
