import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, CircularProgress } from '@material-ui/core';
import CreateTodo from '../Todos/Create/index';
import Todos from '../Todos/List/index';

const HomePage = ({
  todos,
  loading,
  getTodoList,
  createTodo,
  handleUpdateTodo,
  createSubtask,
  handleUpdateSubtask,
  updateAllTasks,
}) => {
  // Get Todos at first load
  useEffect(() => {
    getTodoList();
  }, []);

  // Create new Todo
  const handleAddTodo = async (title) => {
    await createTodo({ title });
    getTodoList();
  };

  // Create new Subtask
  const handleAddSubtask = async (title, todo_id) => {
    await createSubtask({ title, todo_id });
    getTodoList();
  };

  // Handle Toggle Subtask
  const handleSubtaskToggle = async (subtask, todo) => {
    let updateTodo = true;
    if (subtask.status === 'completed') {
      const id = todo.id;
      const status = 'pending';
      subtask.status = status;
      await handleUpdateTodo({ id, status });
    } else {
      subtask.status = 'completed';

      // Check if we have to set todo completed or pending
      todo?.subtasks?.forEach((task) => {
        if (task.id !== subtask.id && task.status === 'pending') {
          return (updateTodo = false);
        }
      });
      if (updateTodo) {
        const id = todo.id;
        const status = 'completed';
        subtask.status = status;
        await handleUpdateTodo({ id, status });
      } else {
        subtask.status = 'completed';
      }
    }
    const { id, status } = subtask;

    // Update subtask status
    await handleUpdateSubtask({ id, status });
    getTodoList();
  };

  // Handle Toggle Todo
  const handleTodoToggle = async (todo) => {
    if (todo.status === 'completed') {
      todo.status = 'pending';
    } else {
      todo.status = 'completed';
    }
    const { id, status } = todo;
    await handleUpdateTodo({ id, status });

    // Check if there are any subtasks then update them
    if (todo.subtasks.length > 0) {
      const todo_id = id;
      await updateAllTasks({ todo_id, status });
    }
    getTodoList();
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo App
      </Typography>
      <CreateTodo loading={loading} addTodo={handleAddTodo} />
      {loading ? (
        <CircularProgress
          style={{ marginTop: '50px', width: '100px', height: '100px' }}
        />
      ) : (
        <Todos
          todos={todos}
          handleAddSubtask={handleAddSubtask}
          handleSubtaskToggle={handleSubtaskToggle}
          handleTodoToggle={handleTodoToggle}
        />
      )}
    </Container>
  );
};

HomePage.propTypes = {
  todos: PropTypes.array,
  loading: PropTypes.bool,
  getTodoList: PropTypes.func,
  createTodo: PropTypes.func,
  handleUpdateTodo: PropTypes.func,
  createSubtask: PropTypes.func,
  handleUpdateSubtask: PropTypes.func,
  updateAllTasks: PropTypes.func,
};

export default HomePage;
