import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'
import TaskItem from '../../../src/components/TaskItem.vue';
import Vue from 'vue';

function wrapperFactory(task) {
  return shallowMount(TaskItem, {
    propsData: {
      task
    },
    provide: function () {
      return {
        eventBus: new Vue()
      }
    }
  });
}

describe('TaskItem.vue', () => {
  let wrapper, vm;

  describe('main', () => {
    const task = {
      _id: '123123123',
      title: 'Test item',
      description: 'Item for unit test'
    };

    beforeEach(() => {
      wrapper = wrapperFactory(task);
      vm = wrapper.vm;
    })

    it('open task window', done => {
      vm.eventBus.$on('openTaskWindow', () => {
        done();
      })
      vm.openTaskWindow();
    })
  })

  describe('short description', () => {
    const task = {
      _id: '123123123',
      title: 'Test item',
      description: 'Item for unit test'
    };

    beforeEach(() => {
      wrapper = wrapperFactory(task);
      vm = wrapper.vm;
    })

    it('trimmed description and task description should be equal', () => {
      expect(vm.shortDescription).to.equal(vm.task.description);
    })
  })

  describe('long description', () => {
    const task = {
      _id: '123123123',
      title: 'Test item',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed congue velit, lacinia suscipit mauris. Integer sagittis metus non dolor dapibus sodales. Proin fringilla ut dui eu condimentum. Nullam vel magna sit amet purus sagittis ullamcorper ac dignissim dui. Nunc rutrum dignissim sem eget suscipit. Maecenas purus libero, mattis sit amet dolor ut, rutrum molestie tellus. Duis ut felis et elit condimentum fringilla. Aenean vel tincidunt lorem, ac varius sapien. Phasellus id vestibulum lorem.'
    };

    beforeEach(() => {
      wrapper = wrapperFactory(task);
      vm = wrapper.vm;
    })

    it('trimmed description should be shorter than task description', () => {
      expect(vm.shortDescription.length).to.be.lessThan(vm.task.description.length);
    })
  })
})