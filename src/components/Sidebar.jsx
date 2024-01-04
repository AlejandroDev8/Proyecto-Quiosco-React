import useQuiosco from "../hooks/useQuiosco";
import Categorias from "./Categorias";
import { useAuth } from "../hooks/useAuth";

function Sidebar() {
  const { categorias } = useQuiosco();
  const { logout, user } = useAuth({ middleware: "auth" });

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img src="img/logo.svg" alt="Imagen de la tienda" className="w-40" />
      </div>
      <h2 className="text-2xl font-bold uppercase">Bienvenido</h2>
      <p className="text-gray-500">{user?.name}</p>
      <div className="mt-10">
        {categorias.map((categoria) => (
          <Categorias key={categoria.id} categoria={categoria} />
        ))}
      </div>
      <div className="my-5 py-5">
        <button
          type="button"
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate rounded-md hover:bg-red-600"
          onClick={() => logout()}
        >
          Cancelar Orden
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
