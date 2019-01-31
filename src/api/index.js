import axios from 'axios';

export const dogsAPI = axios.create({
  baseURL: 'https://dog.ceo/api'
});