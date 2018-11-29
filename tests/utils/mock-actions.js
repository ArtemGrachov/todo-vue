import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import apiConfig from '../../src/configs/api.config';
import actionsFactory from '../../src/store/actions-factory';
const tasksUrl = apiConfig.url + 'tasks';

const tasks = [{
  description: 'Mock task #1',
  title: 'Task #1',
  _id: '1'
}, {
  description: 'Mock task #2',
  title: 'Task #2',
  _id: '2'
}];

const mock = new MockAdapter(axios);
mock.onGet(tasksUrl).reply(200, [...tasks]);
mock.onPost(tasksUrl).reply(req => {
  return [
    200,
    (Object.assign({
      _id: '3'
    }, JSON.parse(req.data)))
  ]
});
mock.onPut(tasksUrl + '/:id').reply(req => {
  return [
    200,
    (Object.assign({},
      tasks.find(task => task._id === req.params.id),
      req.data))
  ]
});

export default actionsFactory(axios);