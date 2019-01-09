import {
  expect
} from 'chai';
import {
  shallowMount
} from '@vue/test-utils';
import moxios from 'moxios';
import TaskDetails from '../../../../src/components/TaskWindow/TaskDetails.vue';
import mockStoreFactory from '../../../utils/mock-store-factory';
import mockDataFactory from '../../../utils/mock-data-factory';
import {
  stubPutTasks200,
  stubDeleteTasks200
} from '../../../utils/mock-http';
import {
  UPDATE_TASK,
  SET_TASKS,
  DELETE_TASK
} from '../../../../src/store/mutation-types';

describe('TaskEdit.vue', () => {
  let wrapper, vm;

  beforeEach(() => {
    const
      store = mockStoreFactory(),
      data = mockDataFactory();

    moxios.install();
    store.commit(SET_TASKS, data);

    wrapper = shallowMount(TaskDetails, {
      store: store,
      propsData: {
        task: store.state.tasks[0]
      }
    });
    vm = wrapper.vm;
  });

  afterEach(() => {
    moxios.uninstall();
  })

  it('update task', done => {
    const updateFields = {
      title: 'Updated title',
      description: 'Updated description'
    };
    vm.$store.subscribe(mutation => {
      if (mutation.type === UPDATE_TASK) {
        expect(vm.task.title).to.equal(updateFields.title);
        expect(vm.task.description).to.equal(updateFields.description);
        done();
      }
    });

    stubPutTasks200(moxios, vm.task._id, updateFields);
    vm.updateTask(updateFields);
  })

  it('disable form on update', () => {
    stubPutTasks200(moxios, vm.task._id, {});
    vm.updateTask({});
    expect(vm.formDisabled).to.be.true;
  })

  it('enable form after update', done => {
    vm.$store.subscribe(mutation => {
      if (mutation.type === UPDATE_TASK) {
        vm.$nextTick()
          .then(() => {
            expect(vm.formDisabled).to.be.false;
            done();
          })
      }
    });

    stubPutTasks200(moxios, vm.task._id, {});
    vm.updateTask({});
  })

  it('delete task', done => {
    let id = vm.task._id;

    stubDeleteTasks200(moxios, id);

    vm.$store.subscribe(mutation => {
      if (mutation.type === DELETE_TASK) {
        expect(mutation.payload).to.equal(id);
        done();
      }
    })

    vm.deleteTask();
  })

  it('emit close event on delete', done => {
    let id = vm.task._id;

    stubDeleteTasks200(moxios, id);

    vm.$store.subscribe(mutation => {
      if (mutation.type === DELETE_TASK) {
        vm.$nextTick()
          .then(() => {
            expect(wrapper.emitted().closeWindow).to.have.lengthOf(1);
            done();
          })
      }
    })

    vm.deleteTask();
  })
})