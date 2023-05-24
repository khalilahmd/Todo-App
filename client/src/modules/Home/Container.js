import React, { useState } from 'react';
import HomePage from './Home';
import {
  getTodos,
  addTodo,
  updateTodo,
  addSubtask,
  updateSubtask,
  updateAllSubtasks,
} from './source';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  // Method to create new todo
  const createTodo = async ({ title }) => {
    setLoading(true);
    try {
      await addTodo({ title });
    } catch (error) {
      setLoading(false);
    }
  };

  // Method to get al todo list
  const getTodoList = async () => {
    setLoading(true);
    try {
      const result = await getTodos();
      setTodos(result?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Method to update todo
  const handleUpdateTodo = async ({ id, status }) => {
    setLoading(true);
    try {
      await updateTodo({ id, status });
    } catch (error) {
      setLoading(false);
    }
  };

  // Method to create new subtask
  const createSubtask = async ({ title, todo_id }) => {
    setLoading(true);
    try {
      await addSubtask({ title, todo_id });
    } catch (error) {
      setLoading(false);
    }
  };

  // Method to update subtask
  const handleUpdateSubtask = async ({ id, status }) => {
    setLoading(true);
    try {
      await updateSubtask({ id, status });
    } catch (error) {
      setLoading(false);
    }
  };

  // Method to update all subtask based on a specific todo_id
  const updateAllTasks = async ({ todo_id, status }) => {
    setLoading(true);
    try {
      await updateAllSubtasks({ todo_id, status });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <HomePage
      todos={todos}
      loading={loading}
      getTodoList={getTodoList}
      handleUpdateTodo={handleUpdateTodo}
      handleUpdateSubtask={handleUpdateSubtask}
      updateAllTasks={updateAllTasks}
      createTodo={createTodo}
      createSubtask={createSubtask}
    />
  );
};

export default Home;
