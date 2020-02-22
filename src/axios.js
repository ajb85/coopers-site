import axios from 'axios';

const token = localStorage.getItem('token');

export default axios.create({
  baseURL: 'http://localhost:4500',
  headers: {
    authorization: token
  }
});
