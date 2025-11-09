import axios from 'axios';

export default axios.create({
  baseURL: 'http://ec2-54-163-40-255.compute-1.amazonaws.com:5000/',
});