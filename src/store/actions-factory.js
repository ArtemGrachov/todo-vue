import apiConfig from '../configs/api.config';
import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from './mutation-types';

const tasksUrl = apiConfig.url + 'tasks';

export default function (httpClient) {
  return {
    getTasks(context) {
      return httpClient.get(tasksUrl)
        .then(res => res.data)
        .then(data => context.commit(SET_TASKS, data));
    },
    createTask(context, payload) {
      httpClient.post(tasksUrl, payload)
        .then(res => res.data)
        .then(data => context.commit(ADD_TASK, data));
    },
    updateTask(context, payload) {
      httpClient.put(`${tasksUrl}/${payload.id}`, payload.data)
        .then(res => res.data)
        .then(data => context.commit(UPDATE_TASK, data));
    },
    deleteTask(context, payload) {
      httpClient.delete(`${tasksUrl}/${payload}`)
        .then(res => res.data)
        .then(data => context.commit(DELETE_TASK, data._id));
    }
  }
}