import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import moxios from 'moxios';
import mockStoreFactory from '../utils/mock-store-factory';
import {
  ADD_TASK
} from '../../src/store/mutation-types';
import App from '../../src/App.vue';
import Vue from 'vue';
import {
  stubGetTasks200,
  stubPostTasks200
} from '../utils/mock-http';
import NewTaskForm from '../../src/components/NewTaskForm.vue';
import TaskWindow from '../../src/components/TaskWindow/TaskWindow.vue';

describe('App.vue', () => {
  let wrapper, vm;

  beforeEach(() => {
    moxios.install();
    stubGetTasks200(moxios);
    wrapper = shallowMount(App, {
      store: mockStoreFactory(),
      sync: false,
      provide: function () {
        return {
          eventBus: new Vue()
        }
      }
    });
    vm = wrapper.vm;
  });

  afterEach(() => {
    moxios.uninstall();
  })

  it('loading tasks', done => {
    vm.$store.subscribe((mutation, state) => {
      expect(vm.tasks).to.deep.equal(state.tasks);
      done();
    });
  });

  it('creating tasks', done => {
    const newTask = {
      title: 'New task',
      description: 'New task description'
    };

    stubPostTasks200(moxios, newTask);

    vm.$store.dispatch('createTask', newTask);

    vm.$store.subscribe((mutation) => {
      if (mutation.type === ADD_TASK) {
        expect(
          wrapper
          .vm
          .tasks
          .find(
            task => task.title === newTask.title && task.description === newTask.description
          )
        ).to.be.ok;
        done();
      }
    });
  });

  it('open new task form modal window', () => {
    vm.openNewTaskForm();
    const formModal = vm.modals.find(modalData => modalData.cmp === NewTaskForm);
    expect(formModal).to.be.ok;
  })

  it('close new task form modal window', () => {
    vm.openNewTaskForm();
    let formIndex;
    vm.modals.find((modalData, index) => {
      const find = modalData.cmp === NewTaskForm;
      if (find) {
        formIndex = index;
      }
      return find;
    });
    vm.closeModal(formIndex);

    const formModal = vm.modals.find(modalData => modalData.cmp === NewTaskForm);
    expect(formModal).not.to.be.ok;
  })

  it('open task details modal window', done => {
    vm.eventBus.$on('openTaskWindow', () => {
      vm.$nextTick()
        .then(() => {
          const taskWindowModal = vm.modals.find(modal => modal.cmp === TaskWindow);
          expect(taskWindowModal).to.be.ok;
          done();
        })
    })

    vm.eventBus.$emit('openTaskWindow', '1');
  })
});