import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import App from '../../src/App.vue';
import {
  allTasks,
  newTaskId,
  MockToDoService
} from '../utils/service-mocks/todo.service';

describe('App.vue', () => {
  let wrapper;
  const task = {
    title: 'Task title',
    description: 'Task description'
  };

  beforeEach(() => {
    wrapper = shallowMount(App, {
      provide: {
        toDoService: MockToDoService
      }
    });
  })

  it('toggle new task form', () => {
    const formStateInverted = !wrapper.vm.newTaskForm;
    wrapper.vm.toggleForm();
    expect(wrapper.vm.newTaskForm).to.equal(formStateInverted);
  })

  it('get all tasks', () => {
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.tasks).to.have.members(allTasks());
    })
  })

  it('create task', () => {
    wrapper.vm.createTask(task);
    wrapper.vm.$nextTick(() => {
      expect(
        wrapper.vm.tasks
        .find(task => task._id === newTaskId)
      ).to.not.equal(-1)
    })
  })

  it('delete task', () => {
    let taskToDelete;

    wrapper.vm.$nextTick()
      .then(() => {
        expect(wrapper.vm.tasks.length).to.equal(2)
        taskToDelete = wrapper.vm.tasks[0];
        wrapper.vm.deleteTask(taskToDelete._id);
        return wrapper.vm.$nextTick();
      })
      .then(() => {
        expect(wrapper.vm.tasks).not.to.include(taskToDelete);
      });
  })
})