import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import NewTaskForm from '../../../src/components/NewTaskForm.vue';
import mockStoreFactory from '../../utils/mock-store-factory';
import {
  ADD_TASK
} from '../../../src/store/mutation-types';

function newTaskFactory() {
  return {
    title: 'New task',
    description: 'New task description'
  }
}

describe('NewTaskForm.vue', () => {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(NewTaskForm, {
      store: mockStoreFactory()
    });
  })

  it('submit', done => {
    wrapper.vm.$store.subscribe((mutation) => {
      if (mutation.type === ADD_TASK) {
        done();
      }
    });

    wrapper.vm.submit(newTaskFactory());
  })

  it('disable form on submit', () => {
    const vm = wrapper.vm;
    vm.submit(newTaskFactory());
    expect(vm.formDisabled).to.equal(true);
  })

  it('close on submit', done => {
    wrapper.vm.$store.subscribe((mutation) => {
      if (mutation.type === ADD_TASK) {
        const emitted = wrapper.emitted().closeWindow;
        expect(emitted).to.have.lengthOf(1);
        done();
      }
    })

    wrapper.vm.submit(newTaskFactory());
  })

  it('close window', () => {
    const vm = wrapper.vm;
    vm.closeWindow();
    const emitted = wrapper.emitted().closeWindow;
    expect(emitted).to.have.lengthOf(1);
  })
})