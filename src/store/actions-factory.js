import apiConfig from '../configs/api.config';
import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION
} from './mutation-types';

const tasksUrl = apiConfig.url + 'tasks';

const errorHandler = (error, context) => {
  context.commit(ADD_NOTIFICATION, {
    title: 'Error',
    text: (error.response && error.response.data && error.response.data.message) ? error.response.data.message : 'Unknown error',
    type: 'danger'
  });
}

export default function (httpClient) {
  return {
    getTasks(context) {
      const request = httpClient.get(tasksUrl)
        .then(res => res.data)
        .then(data => context.commit(SET_TASKS, data))
      request.catch(error => {
        errorHandler(error, context);
      });
      return request;
    },
    createTask(context, payload) {
      const request = httpClient.post(tasksUrl, payload)
        .then(res => res.data)
        .then(data => {
          context.commit(ADD_TASK, data);
          context.commit(ADD_NOTIFICATION, {
            title: 'Task created',
            text: `Task '${data.title}' has been created`,
            type: 'success'
          });
        });
      request.catch(error => {
        errorHandler(error, context);
      });
      return request;
    },
    updateTask(context, payload) {
      const request = httpClient.put(`${tasksUrl}/${payload.id}`, payload.data)
        .then(res => res.data)
        .then(data => {
          context.commit(UPDATE_TASK, data);
          context.commit(ADD_NOTIFICATION, {
            title: 'Task updated',
            text: `Task '${data.title}' has been updated`,
            type: 'success'
          });
        });
      request.catch(error => {
        errorHandler(error, context);
      });
      return request;
    },
    deleteTask(context, payload) {
      const request = httpClient.delete(`${tasksUrl}/${payload}`)
        .then(res => res.data)
        .then(data => {
          context.commit(DELETE_TASK, data._id);
          context.commit(ADD_NOTIFICATION, {
            title: 'Task deleted',
            text: `Task '${data.title}' has been deleted`,
            type: 'success'
          });
        });
      request.catch(error => {
        errorHandler(error, context);
      });
      return request;
    },
    addNotification(context, payload) {
      context.commit(ADD_NOTIFICATION, payload);
    },
    deleteNotification(context, payload) {
      context.commit(DELETE_NOTIFICATION, payload);
    }
  }
}