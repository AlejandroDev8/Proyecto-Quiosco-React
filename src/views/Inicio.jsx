import useSWR from "swr";
import clienteAxios from "../config/axios.js";
import Producto from "../components/Producto.jsx";
import useQuiosco from "../hooks/useQuiosco.js";
import Spinn from "../components/Spinn.jsx";

function Inicio() {
  const { categoriaActual } = useQuiosco();

  // Consulta SWR
  const fetcher = () =>
    clienteAxios("/api/productos").then((data) => data.data);
  const { data, isLoading } = useSWR("/api/productos", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return <Spinn />;

  const productos = data.data.filter(
    (producto) => producto.categoria_id === categoriaActual.id
  );

  return (
    <div className="p-3">
      <h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">
        Elije y personaliza tu pedido a continuación
      </p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => (
          <Producto key={producto.imagen} producto={producto} />
        ))}
      </div>
    </div>
  );
}

export default Inicio;
