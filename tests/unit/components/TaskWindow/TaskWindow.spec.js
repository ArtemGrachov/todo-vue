import {
  expect
} from 'chai';
import {
  shallowMount
} from '@vue/test-utils';
import Vue from 'vue';
import moxios from 'moxios';
import TaskWindow from '../../../../src/components/TaskWindow/TaskWindow.vue';
import mockStoreFactory from '../../../utils/mock-store-factory';
import mockDataFactory from '../../../utils/mock-data-factory';
import {
  stubGetTasks200,
} from '../../../utils/mock-http';

const item = mockDataFactory()[0];

describe('TaskWindow.vue', () => {
  let wrapper, vm;

  beforeEach(() => {
    moxios.install();
    stubGetTasks200(moxios);

    wrapper = shallowMount(TaskWindow, {
      store: mockStoreFactory(),
      propsData: {
        inputData: item._id
      },
      provide: function () {
        return {
          eventBus: new Vue()
        }
      },
      sync: false
    });

    vm = wrapper.vm;
  })

  afterEach(() => {
    moxios.uninstall();
  })

  it('get task data', done => {
    vm.$store.dispatch('getTasks')
      .then(() => {
        expect(vm.task).to.deep.equal(item);
        done()
      });
  })

  it('close window', () => {
    vm.closeWindow();
    expect(wrapper.emitted().closeWindow).to.have.lengthOf(1);
  })
})