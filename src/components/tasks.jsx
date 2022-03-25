import moment from "moment";
import { Link } from "react-router-dom";
import { deleteTask, getTasks } from "../actions/tasks";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "./containers/Container";
import task from "../services/task";

const tasks = () => {
  const [currentTask, setCurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const refreshData = () => {
    setCurrentTask(null);
    setCurrentIndex(-1);
  };

  const setActiveTask = (task, index) => {
    setCurrentTask(task);
    setCurrentIndex(index);
  };

  const removeTutorial = () => {
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
      <header className="header">
        <div className="header__titles">
          <h1>Cosas por hacer</h1>

          <h4>Hoy: {moment().format("MM/DD/YYYY")}</h4>
        </div>

        <div className="header__actions">
          <button>Liberar Seleccionados</button>

          <select>
            <option>Ordenar</option>
          </select>
        </div>
      </header>

      {tasks &&
        tasks.map((task, index) => (
          <div
            className={"tasks " + (index === currentIndex ? "active" : "")}
            onClick={() => setActiveTask(task, index)}
            key={index}
          >
            <input type="checkbox" />
            <p>{task.description}</p>
            <p>{task.date}</p>
            <p>icon</p>
          </div>
        ))}

      <div className="col-md-6">
        {currentTask ? (
          <div>
            <h4>Tasks</h4>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTask.description}
            </div>
            <div>
              <label>
                <strong>Date:</strong>
              </label>{" "}
              {currentTask.date}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {/* {currentTask.published ? "Published" : "Pending"} */}
            </div>

            <button onClick={removeTutorial}>Eliminar</button>

            <Link
              to={"/Tasks/" + currentTask.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default tasks;
