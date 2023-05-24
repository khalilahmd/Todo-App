import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography } from '@material-ui/core';
import CreateTodo from '../Todos/Create/index';

const HomePage = ({
  loading,
  createTodo,
}) => {

  const handleAddTodo = async (title) => {
    await createTodo({ title });
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo App
      </Typography>
      <CreateTodo loading={loading} addTodo={handleAddTodo} />
    </Container>
  );
};

HomePage.propTypes = {
  loading: PropTypes.bool,
  createTodo: PropTypes.func,
};

export default HomePage;
