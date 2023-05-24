import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

const CreateTodo = ({ addTodo, loading }) => {
const [inputValue, setInputValue] = useState('');
const [todos, setTodos] = useState([]);

const handleInputChange = (e) => {
    setInputValue(e.target.value);
};

const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      addTodo(inputValue);
        setInputValue('');
    }
};

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
        label="What to do?"
        value={inputValue}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        />

        <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddTodo}
        style={{ marginLeft: '10px', fontSize: '0.9rem', width: '160px' }}
        size="small"
        >
        Add Todo
        </Button>
    </div>
  )
}

CreateTodo.propTypes = {
  addTodo: PropTypes.func,
  loading: PropTypes.bool,
}

export default CreateTodo;