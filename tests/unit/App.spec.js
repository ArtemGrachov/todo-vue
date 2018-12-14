import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import mockStoreFactory from '../utils/mock-store-factory';
import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  // DELETE_TASK
} from '../../src/store/mutation-types';
import App from '../../src/App.vue';

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      store: mockStoreFactory()
    });
  });

  it('loading tasks', () => {
    wrapper.vm.$store.subscribe((mutation, state) => {
      expect(wrapper.vm.tasks).to.deep.equal(state.tasks);
    });
  });

  it('creating tasks', () => {
    const newTask = {
      title: 'New task',
      description: 'New task description'
    };

    wrapper.vm.$store.subscribe((mutation) => {
      if (mutation.type === ADD_TASK) {
        expect(
          wrapper
          .vm
          .tasks
          .find(
            task => task.title === newTask.title && task.description === newTask.description
          )
        ).to.be.ok;
      }
    });

    wrapper.vm.createTask(newTask);
  });

  it('updating tasks', () => {
    const updateFields = {
      title: 'Updated title',
      description: 'Updated description'
    };
    const vm = wrapper.vm;

    let taskToUpdate;

    vm.$store.subscribe(mutation => {
      if (!taskToUpdate) {
        if (vm.tasks.length) {
          taskToUpdate = vm.tasks[0];
          vm.updateTask(taskToUpdate._id, updateFields);
        }
      } else {
        if (mutation.type === UPDATE_TASK) {
          const updatedTask =
            vm
            .tasks
            .find(
              task => task._id === taskToUpdate._id
            );
          expect(updatedTask).to.be.ok;
          expect(updatedTask.title).to.equal(updateFields.title);
          expect(updatedTask.description).to.equal(updateFields.description);
        }
      }
    });
  });

  it('deleting tasks', () => {
    let taskToDeleteId;
    const vm = wrapper.vm;

    vm.$store.subscribe(mutation => {
      if (!taskToDeleteId) {
        if (vm.tasks.length) {
          taskToDeleteId = vm.tasks[0]._id;
          vm.deleteTask(taskToDeleteId);
        }
      } else {
        if (mutation.type === DELETE_TASK) {
          const deletedTak =
            vm
            .tasks
            .find(
              task => task._id === taskToDeleteId
            );
          expect(deletedTak).not.to.be.ok;
        }
      }
    })
  });

  it('toggling new task edit form', () => {
    const vm = wrapper.vm,
      formStatus = vm.newTaskForm;
    vm.toggleForm();
    expect(formStatus).not.to.equal(vm);
  })
});