import {
  expect
} from 'chai';
import {
  shallowMount
} from '@vue/test-utils';
import TaskWindow from '../../../src/components/TaskWindow.vue';
import Vue from 'vue';

describe('TaskWindow.vue', () => {
  let wrapper;
  const task = {
    _id: '123123123',
    title: 'Test item',
    description: 'Item for unit test'
  };

  beforeEach(() => {
    wrapper = shallowMount(TaskItem, {
      propsData: {
        task
      }
    });
  })

})