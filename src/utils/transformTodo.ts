// Method to transform todos into desired format
export const transformTodo = (tasks) => {
  return tasks.map((task) => {
    let completedSubtasks = 0;
    let updatedTask: any = {};
    updatedTask.id = task._id;
    updatedTask.title = task.title;
    updatedTask.status = task.status;
    updatedTask.created_at = task.created_at;

    task?.subtasks?.forEach((subtask) => {
      if (subtask.status === 'completed') {
        completedSubtasks++;
      }
    });
    updatedTask.completedSubtasks = completedSubtasks;
    updatedTask.totalSubtasks = task?.subtasks?.length;

    if (task.subtasks) {
      updatedTask.subtasks = transformTodo(task.subtasks);
    }

    return updatedTask;
  });
};
