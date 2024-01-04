import PropTypes from "prop-types";

function Alerta({ children }) {
  return (
    <div className="text-center my-2 bg-red-600 text-white font-bold p-3 uppercase">
      {children}
    </div>
  );
}

Alerta.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Alerta;
