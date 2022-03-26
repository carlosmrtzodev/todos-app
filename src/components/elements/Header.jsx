import moment from "moment";

const Header = () => {
  return (
    <header className="header">
      <div className="header__titles">
        <h1 className="title">Cosas por hacer</h1>

        <h2 className="subtitle">Hoy: {moment().format("DD/MM/YYYY")}</h2>
      </div>

      <nav className="header__nav">
        <ul className="header__nav-actions">
          <li className="header__nav-actions_button">
            <button className="button">Liberar Seleccionados</button>
          </li>

          <li className="header__nav-actions_select">
            <select className="select">
              <option className="select__options" value={0}>
                Fecha de Creación
              </option>

              <option className="select__options" value={1}>
                Fecha de Vencimiento
              </option>

              <option className="select__options" value={2}>
                Estado de la Tarjeta
              </option>
            </select>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
