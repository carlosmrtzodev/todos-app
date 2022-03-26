import { Link } from "react-router-dom";
import {
  faArrowLeftLong,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Actions = ({ id, remove, refresh }) => {
  return (
    <div className="actions">
      <button onClick={remove} className="actions__buttons">
        <FontAwesomeIcon icon={faTrash} className="icon__fixed" />
      </button>

      <Link to={"/Tasks/" + id} className="actions__buttons">
        <FontAwesomeIcon icon={faEdit} className="icon__fixed" />
      </Link>

      <button onClick={refresh} className="actions__buttons">
        <FontAwesomeIcon icon={faArrowLeftLong} className="icon__fixed" />
      </button>
    </div>
  );
};
export default Actions;
