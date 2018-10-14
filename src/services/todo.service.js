import axios from 'axios';
import apiConfig from '../configs/api.config';

const url = apiConfig.url + 'tasks';

export default {
  getAllTasks() {
    return axios.get(url)
      .then(res => res.data);
  },
  createTask(taskData) {
    return axios.post(url, taskData)
      .then(res => res.data);
  },
  deleteTask(taskId) {
    return axios.delete(`${url}/${taskId}`);
  }
}