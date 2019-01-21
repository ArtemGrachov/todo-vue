export default function (stateData) {
  const state = {
    tasks: [],
    notifications: []
  }
  return stateData ? Object.assign(state, stateData) : state
}