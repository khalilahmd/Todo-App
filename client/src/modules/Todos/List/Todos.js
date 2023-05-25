import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

const Todos = ({
  todos,
  handleAddSubtask,
  handleSubtaskToggle,
  handleTodoToggle,
}) => {
  const [subtaskField, setSubtaskField] = useState('');

  // Method to update the subtask field value when triggered
  const handleSubtaskField = (e) => {
    setSubtaskField(e.target.value);
  };

  // Method to add new subtask
  const addSubtask = (todo) => {
    if (subtaskField.trim() !== '') {
      handleAddSubtask(subtaskField, todo);
      setSubtaskField('');
    }
  };

  return (
    <List>
      {todos?.map((todo, todoIndex) => (
        <Accordion key={todoIndex}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '350px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Checkbox
                  checked={todo.status === 'completed'}
                  color="primary"
                  onChange={() => handleTodoToggle(todo)}
                />
                <Typography
                  style={{
                    textDecoration:
                      todo.status === 'completed' ? 'line-through' : 'none',
                    color: todo.status === 'completed' ? 'grey' : 'inherit',
                  }}
                >
                  {todo?.title}
                </Typography>
              </div>
              <Typography style={{ marginRight: '5px' }}>
                {todo?.completedSubtasks} of {todo?.totalSubtasks} completed
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails style={{ width: '400px', margin: 'auto' }}>
            <List disablePadding>
              {todo.subtasks &&
                todo?.subtasks?.map((subtask, subtaskIndex) => (
                  <ListItem key={subtaskIndex} disableGutters>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={subtask.status === 'completed'}
                          color="primary"
                          onChange={() => handleSubtaskToggle(subtask, todo)}
                        />
                      }
                      label={
                        <Typography
                          style={{
                            textDecoration:
                              subtask.status === 'completed'
                                ? 'line-through'
                                : 'none',
                            color:
                              subtask.status === 'completed'
                                ? 'grey'
                                : 'inherit',
                          }}
                        >
                          {subtask?.title}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}

              {/* Uncomment this line of code if you want to hide the add new Step field on task completed */}
              {/* {todo.status !== 'completed' && ( */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  value={subtaskField}
                  onChange={(e) => handleSubtaskField(e)}
                  fullWidth
                  margin="dense"
                  placeholder="What are the steps?"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    marginLeft: '10px',
                    fontSize: '0.6rem',
                    width: '140px',
                  }}
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => addSubtask(todo)}
                >
                  New Step
                </Button>
              </div>
              {/* )} */}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </List>
  );
};

Todos.propTypes = {
  todos: PropTypes.array,
  handleAddSubtask: PropTypes.func,
  handleSubtaskToggle: PropTypes.func,
  handleTodoToggle: PropTypes.func,
};

export default Todos;
