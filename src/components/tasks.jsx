import moment from "moment";
import { Link } from "react-router-dom";
import {
  faCheckCircle,
  faCircleXmark,
  faClock,
  faFilter,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Container from "./containers/Container";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasks } from "../actions/tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const tasks = () => {
  const [currentTask, setCurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [sort, setSort] = useState(0);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const myData = [].concat(tasks);
  myData.sort((a, b) => (a.creation > b.creation ? 1 : -1));

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

  const removeTask = () => {
    dispatch(deleteTask(currentTask.id))
      .then(() => {
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sortTasks = (e) => {
    console.log(e.target.value);
    setSort(Number(e.target.value));
  };

  return (
    <Container>
      <header className="header">
        <div className="header__titles">
          <h1 className="title">Cosas por hacer</h1>

          <h2 className="subtitle">Hoy: {moment().format("DD/MM/YYYY")}</h2>
        </div>

        <nav className="header__nav">
          <ul className="header__nav-actions">
            <li className="header__nav-actions_button">
              <button className="button" onClick={sortTasks}>
                Liberar Seleccionados
              </button>
            </li>

            <li className="header__nav-actions_inputs">
              <FontAwesomeIcon icon={faFilter} className="icon icon__select" />

              <select className="select" onChange={sortTasks}>
                <option className="select__options">Ordenar</option>
                <option className="select__options" value={1}>
                  Creación
                </option>
                <option className="select__options" value={2}>
                  Vencimiento
                </option>
                <option className="select__options">Estado</option>
              </select>
            </li>
          </ul>
        </nav>
      </header>

      {tasks && sort === 1
        ? tasks
            .sort((a, b) => (a.creation > b.creation ? -1 : -1))
            .map((task, index) => (
              <div
                className={"tasks " + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveTask(task, index)}
                key={index}
              >
                <div className="tasks__checkbox">
                  <input type="checkbox" className="check" />
                </div>

                <div className="tasks__description">
                  <h3 className="text">{task.description}</h3>
                </div>

                <div className="tasks__date">
                  <p className="text">F.C {task.creation}</p>
                  <p className="text">F.V {task.date}</p>
                </div>

                {moment().format("DD/MM/YYYY").toString() <= task.date ? (
                  <div className="tasks__icons">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="icon icon__timer"
                    />
                  </div>
                ) : task.status === "Completado" ? (
                  <div className="tasks__icons">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="icon icon__completed"
                    />
                  </div>
                ) : (
                  <div className="tasks__icons">
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="icon icon__incompleted"
                    />
                  </div>
                )}
              </div>
            ))
        : sort === 2
        ? tasks
            .sort((a, b) => (a.date > b.date ? 1 : -1))
            .map((task, index) => (
              <div
                className={"tasks " + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveTask(task, index)}
                key={index}
              >
                <div className="tasks__checkbox">
                  <input type="checkbox" className="check" />
                </div>

                <div className="tasks__description">
                  <h3 className="text">{task.description}</h3>
                </div>

                <div className="tasks__date">
                  <p className="text">{task.date}</p>
                </div>

                {moment().format("DD/MM/YYYY").toString() <= task.date ? (
                  <div className="tasks__icons">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="icon icon__timer"
                    />
                  </div>
                ) : task.status === "Completado" ? (
                  <div className="tasks__icons">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="icon icon__completed"
                    />
                  </div>
                ) : (
                  <div className="tasks__icons">
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="icon icon__incompleted"
                    />
                  </div>
                )}
              </div>
            ))
        : null}

      {currentTask ? (
        <div className="actions">
          <div className="actions__container">
            <button onClick={removeTask} className="button button__delete">
              Eliminar
            </button>

            <Link
              to={"/Tasks/" + currentTask.id}
              className="button button__update"
            >
              Editar
            </Link>
          </div>

          <button onClick={refreshData} className="button">
            Cancelar
          </button>
        </div>
      ) : (
        <Link to="/add">
          <div className="add">
            <FontAwesomeIcon icon={faPlus} className="icon icon__add" />
          </div>
        </Link>
      )}
    </Container>
  );
};

export default tasks;
