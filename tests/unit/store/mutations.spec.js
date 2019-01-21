import {
  expect
} from 'chai';
import mutations from '../../../src/store/mutations';
import stateFactory from '../../../src/store/state-factory';
import mockDataFactory from '../../utils/mock-data-factory';

describe('Store mutations', () => {
  let state;

  beforeEach(() => {
    state = stateFactory();
  });

  it('set tasks', () => {
    const data = mockDataFactory();
    mutations.SET_TASKS(state, data);
    expect(state.tasks).to.deep.equal(data);
  });

  it('add task', () => {
    const taskToAdd = mockDataFactory()[0];
    mutations.ADD_TASK(state, taskToAdd);
    expect(state.tasks).to.include(taskToAdd);
  })

  it('update task', () => {
    const data = mockDataFactory();
    mutations.SET_TASKS(state, data);

    const taskToUpdate = state.tasks[0],
      updateData = {
        _id: taskToUpdate._id,
        title: 'Updated title',
        description: 'Updated description'
      };

    mutations.UPDATE_TASK(state, updateData);

    const updatedTask = state.tasks.find(task => task._id === taskToUpdate._id);

    expect(updatedTask.title).to.equal(updateData.title);
    expect(updatedTask.description).to.equal(updateData.description);
  })

  it('delete task', () => {
    const data = mockDataFactory();
    mutations.SET_TASKS(state, data);

    const taskToDeleteId = state.tasks[0]._id;

    mutations.DELETE_TASK(state, taskToDeleteId);

    expect(state.tasks.find(task => task._id === taskToDeleteId)).not.to.be.ok;
  })

  describe('notifications', () => {
    let notification;
    beforeEach(() => {
      state = stateFactory();
      notification = {
        text: 'Test notification',
        type: 'Info'
      };
    })

    it('add notification', () => {
      mutations.ADD_NOTIFICATION(state, notification);
      expect(state.notifications).to.deep.include(notification);
    })

    it('remove notification', () => {
      mutations.ADD_NOTIFICATION(state, notification);
      mutations.DELETE_NOTIFICATION(state, 0);
      expect(state.notifications).to.not.deep.include(notification);
    })
  })
});