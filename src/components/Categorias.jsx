import PropTypes from "prop-types";
import useQuiosco from "../hooks/useQuiosco";

function Categorias({ categoria }) {
  const { id, icono, nombre } = categoria;
  const { handleClickCategoria, categoriaActual } = useQuiosco();

  return (
    <div
      className={`${
        categoriaActual.id === id ? "bg-amber-400" : "bg-white"
      } flex items-center gap-4 w-full p-3 border hover:bg-amber-400 cursor-pointer`}
      onClick={() => handleClickCategoria(id)}
    >
      <img
        src={`img/icono_${icono}.svg`}
        alt="Imgaen de la categoria"
        className="w-10"
      />
      <button
        className="text-lg font-bold cursor-pointer truncate"
        type="button"
      >
        {nombre}
      </button>
    </div>
  );
}

Categorias.propTypes = {
  categoria: PropTypes.any.isRequired,
};

export default Categorias;
