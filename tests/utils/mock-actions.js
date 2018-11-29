import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import apiConfig from '../../src/configs/api.config';
import actionsFactory from '../../src/store/actions-factory';
const tasksUrl = apiConfig.url + 'tasks';

const mock = new MockAdapter(axios);
mock.onGet(tasksUrl).reply(200, []);

export default actionsFactory(axios);