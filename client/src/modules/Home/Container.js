import React, { useState } from 'react';
import HomePage from './Home';
import { addTodo } from './source';

const Home = () => {
  const [loading, setLoading] = useState(false);


  const createTodo = async ({title}) => {
    setLoading(true);
    try {
      await addTodo({title});
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <HomePage
      createTodo={createTodo}
      loading={loading}
    />
  );
};

export default Home;
