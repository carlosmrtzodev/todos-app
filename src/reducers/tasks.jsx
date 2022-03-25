import {
  CREATE_TASK,
  GET_TASKS,
  UPDATE_TASK,
  DELETE_TASK,
} from "../actions/types";

const initialState = [];

function tasksReducer(tasks = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TASK:
      return [...tasks, payload];

    case GET_TASKS:
      return payload;

    case UPDATE_TASK:
      return tasks.map((task) => {
        if (task.id === payload.id) {
          return {
            ...task,
            ...payload,
          };
        } else {
          return task;
        }
      });

    case DELETE_TASK:
      return tasks.filter(({ id }) => id !== payload.id);

    default:
      return tasks;
  }
}
export default tasksReducer;
