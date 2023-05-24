import axios from 'axios';
import {
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  ADD_SUBTASK,
  UPDATE_SUBTASK,
  UPDATE_ALL_SUBTASKS,
} from '../../configs/urlConstants';

// Method to call Get all todos endpoint
export const getTodos = async () => {
  return await axios.get(GET_TODOS);
};

// Method to call add new todo endpoint
export const addTodo = async ({ title }) => {
  return await axios.post(ADD_TODO, { title });
};

// Method to call update todo endpoint
export const updateTodo = async ({ id, status }) => {
  return await axios.put(`${UPDATE_TODO}/${id}`, { status });
};

// Method to call add new subtask endpoint
export const addSubtask = async ({ title, todo_id }) => {
  return await axios.post(ADD_SUBTASK, { title, todo_id });
};

// Method to call update subtask endpoint
export const updateSubtask = async ({ id, status }) => {
  return await axios.put(`${UPDATE_SUBTASK}/${id}`, { status });
};

// Method to call update all subtasks based on a specific todo_id endpoint
export const updateAllSubtasks = async ({ todo_id, status }) => {
  return await axios.put(`${UPDATE_ALL_SUBTASKS}/${todo_id}`, { status });
};
