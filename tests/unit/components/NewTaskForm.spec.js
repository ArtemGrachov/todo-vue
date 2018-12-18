import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import NewTaskForm from '../../../src/components/NewTaskForm.vue';
import mockStoreFactory from '../../utils/mock-store-factory';
import { ADD_TASK } from '../../../src/store/mutation-types';

describe('NewTaskForm.vue', () => {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(NewTaskForm, {
      store: mockStoreFactory()
    });
  })

  it('submit', done => {
    const newTask = {
      title: 'New task',
      description: 'New task description'
    };

    wrapper.vm.$store.subscribe((mutation) => {
      if (mutation.type === ADD_TASK) {
        done();
      }
    });

    wrapper.vm.submit(newTask);
  })

  it('close window', () => {
    const vm = wrapper.vm;
    vm.closeWindow();
    const emitted = wrapper.emitted().closeWindow;
    expect(emitted).to.have.lengthOf(1);
  })
})