import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import apiConfig from '../../src/configs/api.config';
import mockDataFactory from './mock-data-factory';

const tasksUrl = apiConfig.url + 'tasks';
const mock = new MockAdapter(axios);

mock.onGet(tasksUrl).reply(200, mockDataFactory());
mock.onPost(tasksUrl).reply(req => {
  return [
    200,
    (Object.assign({
      _id: '3'
    }, JSON.parse(req.data)))
  ]
});
mock.onPut(tasksUrl + '/1').reply(req => {
  return [
    200,
    (Object.assign({
        _id: '1'
      },
      mockDataFactory()[0],
      JSON.parse(req.data)))
  ]
});
mock.onDelete(tasksUrl + '/1').reply(200, mockDataFactory()[0]);
export default axios;