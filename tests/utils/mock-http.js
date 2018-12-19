import apiConfig from '../../src/configs/api.config';
import mockDataFactory from './mock-data-factory';

const tasksUrl = apiConfig.url + 'tasks';

export function stubGetTasks200(moxios) {
  return moxios.stubOnce('get', tasksUrl, {
    status: 200,
    response: mockDataFactory()
  })
}

export function stubPostTasks200(moxios, data) {
  return moxios.stubOnce('post', tasksUrl, {
    status: 200,
    response: (Object.assign({
      _id: '3'
    }, data))
  })
}

export function stubPostTasks500(moxios) {
  return moxios.stubOnce('post', tasksUrl, {
    status: 500
  })
}

export function stubPutTasks200(moxios, taskId, data) {
  const taskToUpdate = mockDataFactory().find(task => task._id === taskId);
  return moxios.stubOnce('put', `${tasksUrl}/${taskId}`, {
    status: 200,
    response: (Object.assign({},
      taskToUpdate,
      data
    ))
  })
}

export function stubDeleteTasks200(moxios, taskId) {
  const taskToDelete = mockDataFactory().find(task => task._id === taskId);
  return moxios.stubOnce('delete', `${tasksUrl}/${taskId}`, {
    status: 200,
    response: taskToDelete
  })
}