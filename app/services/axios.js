import axios from 'axios';

// to check if its either running on the browser or on a docker container
const isServer = typeof window === 'undefined';

const baseURL = isServer 
  ? 'http://host.docker.internal:8000/' // url for docker container
  : 'http://localhost:8000/';           // url for browser

export default axios.create({
  baseURL: baseURL,
});