import chai from 'chai';
import { expect } from 'chai';
import spies  from 'chai-spies';
import { shallowMount } from '@vue/test-utils';
import moxios from 'moxios';
import TaskDetails from '../../../../src/components/TaskWindow/TaskDetails.vue';
import mockStoreFactory from '../../../utils/mock-store-factory';
import mockDataFactory from '../../../utils/mock-data-factory';
import { stubPutTasks200, stubDeleteTasks200 } from '../../../utils/mock-http';
import { UPDATE_TASK, SET_TASKS, DELETE_TASK } from '../../../../src/store/mutation-types';

chai.use(spies);

describe('TaskDetails.vue', () => {
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

  it('filters update form', () => {
    const updateFields = {
      title: 'Updated title',
      description: vm.task.description
    }

    const filteredForm = vm.filterForm(updateFields);

    expect(filteredForm.title).to.be.ok;
    expect(filteredForm.description).not.to.be.ok;
  })

  it('do not allow update', () => {
    const spy = chai.spy.on(vm, 'updateTaskRequest');

    vm.formUpdate({
      title: vm.task.title,
      description: vm.task.description
    });

    expect(spy).not.to.have.been.called();
  })

  it('allow update', () => {
    const spy = chai.spy.on(vm, 'updateTaskRequest');

    vm.formUpdate({
      title: 'new title'
    });

    expect(spy).to.have.been.called();
  })

  it('show update button', () => {
    vm.setUpdateButtonShow();
    expect(vm.showUpdateButton).to.be.true;
  })

  it('update task request', done => {
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
    vm.updateTaskRequest(updateFields);
  })

  it('disable form on update', () => {
    stubPutTasks200(moxios, vm.task._id, {});
    vm.updateTaskRequest({});
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
    vm.updateTaskRequest({});
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