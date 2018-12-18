import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import NewTaskForm from '../../../src/components/NewTaskForm.vue';
import Vue from 'vue';

describe('NewTaskForm.vue', () => {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(NewTaskForm, {
      provide: function () {
        return {
          eventBus: new Vue()
        }
      }
    });
  })

  it('submit', () => {
    const vm = wrapper.vm,
      draft = {
        title: 'Task #11',
        description: 'Hello, World!'
      }

    vm.form.title = draft.title;
    vm.form.description = draft.description;

    let emitted;

    vm.eventBus.$on('newTaskSubmit', data => {
      emitted = data;
    })

    vm.submit();

    expect(emitted.title).to.equal(draft.title);
    expect(emitted.description).to.equal(draft.description);
  })

  it('close window', () => {
    const vm = wrapper.vm;
    vm.closeWindow();
    const emitted = wrapper.emitted().closeWindow;
    expect(emitted).to.have.lengthOf(1);
  })
})