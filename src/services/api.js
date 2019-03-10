const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api-lanches-lczpln.herokuapp.com'
})

export default api;

