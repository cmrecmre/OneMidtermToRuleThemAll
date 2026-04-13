import axios from 'axios';

const api = axios.create({
  baseURL: 'https://the-one-api.dev/v2',
  headers: {
    'Authorization': 'Bearer dgR1PLut9hVuQvxYn8Pq' //bana verşlen bearer token 
  }
});

export default api;