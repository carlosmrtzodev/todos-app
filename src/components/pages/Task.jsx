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
  const [submitted, setSubmitted] = useState(false);
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

    setSubmitted(true);
  };

  return (
    <Container>
      <div className="form">
        {currentTask ? (
          <div className="form__container">
            {submitted ? (
              <div className="form__container-message">
                <h4 className="subtitle">
                  Se ha actualizado la tarjeta exitosamente!
                </h4>

                <div className="form__container-buttons">
                  <Link to="/" className="button">
                    Volver
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="form__container-message">
                  <h1 className="title">Actualizar Tarjeta</h1>
                </div>

                <form className="form__container-form">
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

                <div className="form__container-buttons">
                  <button
                    type="submit"
                    className="button button__alt"
                    onClick={updateContent}
                  >
                    Actualizar
                  </button>

                  <Link to="/" className="button">
                    Volver
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="form__container">
            <div className="form__container-message">
              <h4 className="subtitle">Algo ha salido mal</h4>

              <div className="form__container-buttons">
                <Link to="/" className="button">
                  Volver
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Task;
