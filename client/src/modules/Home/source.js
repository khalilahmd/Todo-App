import axios from 'axios';
import { ADD_TODO } from '../../configs/urlConstants';

export const addTodo = async ({ title }) => {
  return await axios.post(ADD_TODO, { title });
};
