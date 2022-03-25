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
        {submitted ? (
          <div className="form__success">
            <h4 className="subtitle">You submitted successfully!</h4>

            <div className="form__succes-buttons">
              <button className="button" onClick={newTask}>
                Agregar Otra
              </button>

              <Link to="/">
                <button className="button button__update">Volver</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="form__container">
            <div className="form__container-title">
              <h1 className="title">Crear Tarea</h1>
            </div>

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
                Fecha
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

            <button onClick={saveTask} className="button">
              Enviar
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};
export default AddTask;
