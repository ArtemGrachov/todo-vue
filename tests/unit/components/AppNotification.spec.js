import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import AppNotification from '../../../src/components/AppNotification.vue';
import mockStoreFactory from '../../utils/mock-store-factory';

describe('AppNotification.vue', () => {
  let wrapper, vm;

  beforeEach(() => {
    const notification = {
      title: 'Test title',
      text: 'Test notification',
      type: 'info'
    }
    wrapper = shallowMount(AppNotification, {
      store: mockStoreFactory({
        notifications: [notification]
      }),
      propsData: { notification }
    })
    vm = wrapper.vm;
  })

  it('close notification', () => {
    vm.close();
    expect(wrapper.emitted().close).to.have.length(1);
  })
})