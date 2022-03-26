import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddButton = () => {
  return (
    <Link to="/add">
      <div className="add">
        <FontAwesomeIcon icon={faPlus} className="icon__fixed" />
      </div>
    </Link>
  );
};
export default AddButton;
