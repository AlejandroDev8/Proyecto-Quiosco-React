import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  // Hooks de estado

  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [modal, setModal] = useState(false);
  const [producto, setProducto] = useState({});
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);

  // Hooks de efecto

  useEffect(() => {
    const total = pedido.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
    setTotal(total);
  }, [pedido]);

  // Funciones

  const obtenerCategorias = async () => {
    try {
      const { data } = await clienteAxios("/api/categorias");
      setCategorias(data.data);
      setCategoriaActual(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  // Función para cambiar la categoría actual

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((categoria) => categoria.id === id)[0];
    setCategoriaActual(categoria);
  };

  // Función para abrir y cerrar el modal

  const handleClickModal = () => {
    setModal(!modal);
  };

  // Función para establecer el producto seleccionado

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  // Función para agregar un producto al pedido

  const handleAgregarPedido = ({ categoria_id, ...producto }) => {
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((pedidoState) =>
        pedidoState.id === producto.id ? producto : pedidoState
      );
      setPedido(pedidoActualizado);
      toast.success("Producto actualizado en el pedido");
    } else {
      setPedido([...pedido, producto]);
      toast.success("Producto agregado al pedido");
    }
  };

  // Función para editar la cantidad de un producto en el pedido

  const handleEditarCantidad = (id) => {
    const productoActualizar = pedido.filter(
      (producto) => producto.id === id
    )[0];
    setProducto(productoActualizar);
    setModal(!modal);
  };

  // Función para eliminar un producto del pedido

  const handeleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
    toast.error("Producto eliminado del pedido");
  };

  const handleSubmitNuevaOrden = async (logout) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
      const { data } = await clienteAxios.post(
        "/api/pedidos",
        {
          total,
          productos: pedido.map((producto) => {
            return {
              id: producto.id,
              cantidad: producto.cantidad,
            };
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setTimeout(() => {
        setPedido([]);
      }, 1000);

      // Cerrar la sesión del usuario

      setTimeout(() => {
        localStorage.removeItem("AUTH_TOKEN");
        logout();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCompletarPedido = async (id) => {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
      await clienteAxios.put(`/api/pedidos/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuioscoContext.Provider
      value={{
        // Aquí van los valores que se van a compartir
        categorias,
        categoriaActual,
        handleClickCategoria,
        modal,
        handleClickModal,
        producto,
        handleSetProducto,
        pedido,
        handleAgregarPedido,
        handleEditarCantidad,
        handeleEliminarProducto,
        total,
        handleSubmitNuevaOrden,
        handleClickCompletarPedido,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

QuioscoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { QuioscoProvider };

export default QuioscoContext;
