import axios from 'axios';

const token = localStorage.getItem('token');
console.log('process.env.REACT_APP_BASEURL: ', process.env.REACT_APP_BASEURL);
export default axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  headers: {
    authorization: token
  }
});
