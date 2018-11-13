import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import NewTaskForm from '../../../src/components/NewTaskForm.vue';

describe('NewTaskForm.vue', () => {
  let wrapper;

  beforeEach(function () {
    wrapper = shallowMount(NewTaskForm);
  })

  it('submit event', () => {
    wrapper.vm.submit();
    expect(wrapper.emitted().submit).to.have.lengthOf(1);
  })

  it('submit structure', () => {
    const draft = {
      title: 'Task #11',
      description: 'Hello, World!'
    }
    wrapper.vm.form.title = draft.title;
    wrapper.vm.form.description = draft.description;

    wrapper.vm.submit();
    const emitted = wrapper.emitted().submit[0][0];
    expect(emitted.title).to.equal(draft.title);
    expect(emitted.description).to.equal(draft.description);
  })
})