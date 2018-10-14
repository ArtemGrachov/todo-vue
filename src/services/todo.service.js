import axios from 'axios';
import apiConfig from '../configs/api.config';

export default {
  getAllTasks() {
    return axios.get(apiConfig.url + 'tasks')
      .then(res => res.data)
  }
}