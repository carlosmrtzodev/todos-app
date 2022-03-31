import Task from "./elements/Task";
import Header from "./elements/Header";
import Actions from "./elements/Actions";
import AddButton from "./elements/AddButton";
import Container from "./containers/Container";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasks } from "../actions/tasks";

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    dispatch(getTasks());
  }, []);
  console.log(tasks);

  const refreshData = () => {
    setCurrentTask(null);
    setCurrentIndex(-1);
  };

  const setActiveTask = (task, index) => {
    setCurrentTask(task);
    setCurrentIndex(index);
  };

  const removeTask = () => {
    dispatch(deleteTask(currentTask.id))
      .then(() => {
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Header />

      {tasks &&
        tasks.map((task, index) => (
          <Task
            key={index}
            description={task.description}
            date={task.date}
            status={task.status}
            index={index}
            current={currentIndex}
            task={task}
            method={setActiveTask}
          />
        ))}

      {currentTask ? (
        <Actions
          id={currentTask.id}
          remove={removeTask}
          refresh={refreshData}
        />
      ) : null}

      <AddButton />
    </Container>
  );
};
export default Tasks;
