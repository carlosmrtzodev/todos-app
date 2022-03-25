import TasksService from "../services/task";
import { CREATE_TASK, GET_TASKS, UPDATE_TASK, DELETE_TASK } from "./types";
export const createTask = (description, date, creation) => async (dispatch) => {
  try {
    const res = await TasksService.create({ description, date, creation });

    dispatch({
      type: CREATE_TASK,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getTasks = () => async (dispatch) => {
  try {
    const res = await TasksService.getAll();

    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateTask = (id, data) => async (dispatch) => {
  try {
    const res = await TasksService.update(id, data);

    dispatch({
      type: UPDATE_TASK,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const deleteTask = (id) => async (dispatch) => {
  try {
    await TasksService.delete(id);

    dispatch({
      type: DELETE_TASK,
      payload: { id },
    });
  } catch (error) {
    console.log(error);
  }
};
