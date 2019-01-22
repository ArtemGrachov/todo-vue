import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import NotificationsList from '../../../src/components/NotificationsList.vue';
import mockStoreFactory from '../../utils/mock-store-factory';

describe('NotificationsList.spec.js', () => {
  let store, wrapper, vm;

  beforeEach(() => {
    wrapper = shallowMount(NotificationsList, {
      store: store = mockStoreFactory({
        notifications: [{
          title: 'Test title',
          text: 'Test notification',
          type: 'info'
        }]
      })
    })
    vm = wrapper.vm;
  })

  it('remove notification', () => {
    vm.deleteNotification(0);
    expect(store.state.notifications).to.have.length(0);
  })
})