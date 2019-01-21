import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import AppNotification from '../../../src/components/AppNotification.vue';

describe('AppNotification.vue', () => {
  let wrapper, vm;

  beforeEach(() => {
    wrapper = shallowMount(AppNotification)
    vm = wrapper.vm;
  })

  it('close notification', () => {
    vm.close();
    expect(wrapper.emitted().close).to.have.length(1);
  })
})