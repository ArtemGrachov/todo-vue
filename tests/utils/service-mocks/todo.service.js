const tasks = [{
  description: 'Mock task #1',
  title: 'Task #1',
  _id: '1'
}, {
  description: 'Mock task #2',
  title: 'Task #2',
  _id: '2'
}];

export const allTasks = function () {
  return [].concat(tasks);
};

export const newTaskId = '3';

export const MockToDoService = {
  getAllTasks() {
    return new Promise(res => res(allTasks()));
  },
  createTask(taskData) {
    return new Promise(res => res({
      description: taskData.description,
      title: taskData.title,
      _id: newTaskId
    }));
  },
  deleteTask(taskId) {
    return new Promise(res => res({
      description: 'Deleted mock task',
      title: 'Deleted task',
      _id: taskId
    }));
  },
  updateTask(taskId, taskData) {
    return new Promise(res => res({
      description: taskData.description,
      title: taskData.title,
      _id: taskId
    }));
  }
}