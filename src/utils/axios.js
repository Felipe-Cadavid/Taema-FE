import axios from 'axios';
// import { TOKEN } from '../actions/constants';

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000',
//   headers: {
    // Authorization: localStorage.getItem(TOKEN),
//   },
});

export default customAxios;