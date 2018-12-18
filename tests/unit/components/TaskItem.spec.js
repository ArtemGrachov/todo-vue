import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import TaskItem from '../../../src/components/TaskItem.vue';
import Vue from 'vue';

describe('TaskItem.vue', () => {
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
      },
      provide: function () {
        return {
          eventBus: new Vue()
        }
      }
    });
  })

  it('emit "delete" event', () => {
    wrapper.vm.deleteTask();
    const emitted = wrapper.emitted().delete[0][0];
    expect(emitted).to.equal(task._id);
  })

  it('emit "update" event', () => {
    wrapper.vm.updateTask();
    wrapper.vm.editForm.title = 'Updated title';
    wrapper.vm.editForm.description = 'Description';
    const emitted = wrapper.emitted().update[0];
    expect(emitted).to.eql([
      task._id,
      wrapper.vm.editForm
    ]);
  })

  it('turn on edit form', () => {
    wrapper.vm.editTask();
    expect(wrapper.vm.editMode).to.equal(true);
  })

  it('turn off edit form', () => {
    wrapper.vm.editTask();
    wrapper.vm.cancelEdit();
    expect(wrapper.vm.editMode).to.equal(false);
  })

})