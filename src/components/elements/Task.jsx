import React from "react";
import moment from "moment";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Task = ({ description, date, status, index, current, task, method }) => {
  return (
    <div
      className={`tasks ${index === current ? "active" : ""}`}
      onClick={() => method(task, index)}
    >
      <div className="tasks__checkbox">
        <input type="checkbox" className="check" />
      </div>

      <div className="tasks__description">
        <h3 className="text">{description}</h3>
      </div>

      <div className="tasks__date">
        <p className="text">{date}</p>
      </div>

      {moment().format("DD/MM/YYYY").toString() <= date ? (
        <div className="tasks__icons">
          <FontAwesomeIcon icon={faClock} className="icon__timer" />
        </div>
      ) : status === "Completado" ? (
        <div className="tasks__icons">
          <FontAwesomeIcon icon={faClock} className="icon__completed" />
        </div>
      ) : (
        <div className="tasks__icons">
          <FontAwesomeIcon icon={faClock} className="icon__incompleted" />
        </div>
      )}
    </div>
  );
};
export default Task;
