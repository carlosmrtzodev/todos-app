import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "../containers/Container";
import { createTask } from "../../actions/tasks";

const AddTask = () => {
  const initialTaskState = {
    id: null,
    description: "",
    date: "",
    creation: "",
  };
  const [task, setTask] = useState(initialTaskState);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  console.log(initialTaskState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const saveTask = () => {
    const { description, date } = task;
    const creation = moment().format("DD/MM/YYYY");

    dispatch(createTask(description, date, creation))
      .then((data) => {
        setTask({
          id: data.id,
          description: data.description,
          date: data.date,
          creation: data.creation,
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTask = () => {
    setTask(initialTaskState);
    setSubmitted(false);
  };

  return (
    <Container>
      <div className="form">
        <div className="form__container">
          {submitted ? (
            <>
              <div className="form__container-message">
                <h4 className="subtitle">
                  Se ha creado la tarjeta exitosamente!
                </h4>
              </div>

              <div className="form__container-buttons">
                <button onClick={newTask} className="button button__alt">
                  Crear otra
                </button>

                <Link to="/" className="button">
                  Volver
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="form__container-message">
                <h1 className="title">Crear Tarjeta</h1>
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
                    required
                    value={task.description}
                    onChange={handleInputChange}
                    name="description"
                  />
                </div>

                <div className="form__container-group">
                  <label htmlFor="date" className="label">
                    Fecha de Vencimiento
                  </label>

                  <input
                    type="text"
                    className="input__text"
                    id="date"
                    required
                    value={task.date}
                    onChange={handleInputChange}
                    name="date"
                  />
                </div>
              </form>

              <div className="form__container-buttons">
                <button onClick={saveTask} className="button button__alt">
                  Crear
                </button>

                <Link to="/" className="button">
                  Volver
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
export default AddTask;
