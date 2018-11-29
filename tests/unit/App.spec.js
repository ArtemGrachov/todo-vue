import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import mockStore from '../utils/mock-store';
import App from '../../src/App.vue';

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      mocks: {
        $store: mockStore
      }
    });
  });

  it('toggle new task form', () => {
    const formStateInverted = !wrapper.vm.newTaskForm;
    wrapper.vm.toggleForm();
    expect(wrapper.vm.newTaskForm).to.equal(formStateInverted);
  });

  it('get tasks list', () => {
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.tasks.length).to.equal(mockStore.state.tasks.length)
    })
  })

  it('create task', () => {
    const newTask = {
      title: 'New task title',
      description: 'New task description'
    }

    wrapper.vm.$nextTick()
      .then(() => {
        wrapper.vm.createTask(newTask);
        return wrapper.vm.$nextTick()
      })
      .then(() => wrapper.vm.$nextTick())
      .then(() => {
        const find = wrapper.vm.tasks.find(
          task => {
            return task.title === newTask.title &&
              task.description === newTask.description
          }
        )
        expect(find).to.be.ok
      })
  })

  it('update task', () => {
    const updateData = {
        title: 'New title',
        descrption: 'New description'
      },
      updateIndex = 0;

    wrapper.vm.$nextTick()
      .then(() => {
        wrapper.vm.updateTask(
          wrapper.vm.tasks[updateIndex]._id,
          updateData
        )
      })
      .then(() => wrapper.vm.$nextTick())
      .then(() => {
        const updatedTask = wrapper.vm.tasks[updateIndex];
        expect(
          updatedTask.title === updateData.title,
          updatedTask.description === updateData.descrption
        ).to.be.false;
      })
  })

  it('delete task', () => {
    wrapper.vm.$nextTick()
      .then(() => {
        wrapper.vm.deleteTask('1')
      })
      .then(() => wrapper.vm.$nextTick())
      .then(() => wrapper.vm.$nextTick())
      .then(() => {
        expect(
          wrapper.vm.tasks.find(
            task => task._id === '1'
          )
        ).to.be.undefined;
      })
  })
})