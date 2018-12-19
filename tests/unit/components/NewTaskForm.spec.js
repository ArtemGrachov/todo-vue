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
import moxios from 'moxios';
import {
  stubPostTasks200,
  stubPostTasks500
} from '../../utils/mock-http';

function newTaskFactory() {
  return {
    title: 'New task',
    description: 'New task description'
  }
}

describe('NewTaskForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    moxios.install();
    wrapper = shallowMount(NewTaskForm, {
      store: mockStoreFactory()
    });
  })

  afterEach(() => {
    moxios.uninstall();
  })

  it('submit', done => {
    const newTask = newTaskFactory();
    stubPostTasks200(moxios, newTask);
    wrapper.vm.$store.subscribe((mutation) => {
      if (mutation.type === ADD_TASK) {
        done();
      }
    });

    wrapper.vm.submit(newTask);
  })

  it('disable form on submit', () => {
    const vm = wrapper.vm;
    vm.submit(newTaskFactory());
    expect(vm.formDisabled).to.equal(true);
  })

  it('close on submit', done => {
    const
      vm = wrapper.vm,
      newTask = newTaskFactory();
    stubPostTasks200(moxios, newTask);

    vm.$store.subscribe((mutation) => {
      if (mutation.type === ADD_TASK) {

        vm
          .$nextTick()
          .then(() => {
            const emitted = wrapper.emitted().closeWindow;
            expect(emitted).to.have.lengthOf(1);
            done();
          })
      }
    })

    wrapper.vm.submit(newTask);
  })

  it('close window', () => {
    const vm = wrapper.vm;
    vm.closeWindow();
    const emitted = wrapper.emitted().closeWindow;
    expect(emitted).to.have.lengthOf(1);
  })

  it('http error on submit', done => {
    const vm = wrapper.vm;

    stubPostTasks500(moxios);

    vm.submit(newTaskFactory()).then(() => {
      expect(vm.formDisabled).to.be.false;
      done();
    })

    expect(vm.formDisabled).to.be.true;
  })
})