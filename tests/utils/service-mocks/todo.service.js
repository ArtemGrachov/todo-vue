export const allTasks = [{
  description: 'Mock task #1',
  title: 'Task #1',
  _id: '1'
}, {
  description: 'Mock task #2',
  title: 'Task #2',
  _id: '2'
}];

export const MockToDoService = {
  getAllTasks() {
    return new Promise(res => res([{
      description: 'Mock task #1',
      title: 'Task #1',
      _id: '1'
    }, {
      description: 'Mock task #2',
      title: 'Task #2',
      _id: '2'
    }]));
  },
  createTask(taskData) {
    return new Promise(res => res({
      description: taskData.description,
      title: taskData.title,
      _id: '3'
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