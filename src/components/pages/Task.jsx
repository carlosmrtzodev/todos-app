import { useDispatch } from "react-redux";
import TasksService from "../../services/task";
import Container from "../containers/Container";
import { updateTask } from "../../actions/tasks";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Task = (props) => {
  const initialTaskState = {
    id: null,
    description: "",
    date: "",
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [currentTask, setCurrentTask] = useState(initialTaskState);

  const getTask = (id) => {
    TasksService.get(id)
      .then((response) => {
        setCurrentTask(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTask(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const updateContent = () => {
    dispatch(updateTask(currentTask.id, currentTask))
      .then((response) => {
        console.log(response);

        setMessage("La Tarea se Actualizo correctamente!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <div className="edit">
        {currentTask ? (
          <div className="edit__container">
            <h1 className="title">Editar Tarea</h1>

            <p className="text">{message}</p>

            <form className="edit__container-form">
              <div className="form__container-group">
                <label htmlFor="description" className="label">
                  Descripción
                </label>

                <input
                  type="text"
                  className="input__text"
                  id="description"
                  name="description"
                  value={currentTask.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form__container-group">
                <label htmlFor="date" className="label">
                  Fecha
                </label>

                <input
                  type="text"
                  className="input__text"
                  id="date"
                  name="date"
                  value={currentTask.date}
                  onChange={handleInputChange}
                />
              </div>
            </form>

            <button
              type="submit"
              className="button button__update"
              onClick={updateContent}
            >
              Actualizar
            </button>

            {message && (
              <Link to="/" className="button">
                Volver
              </Link>
            )}
          </div>
        ) : (
          <div className="error">
            <p className="text">Algo ha salido mal</p>

            <Link to="/" className="button button__delete">
              Volver
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Task;
