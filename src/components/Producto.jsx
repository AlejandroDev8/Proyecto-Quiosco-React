import PropTypes from 'prop-types';
import useQuiosco from '../hooks/useQuiosco';
import { formatearDinero } from '../helpers';

function Producto({producto}) {

  const {handleClickModal, handleSetProducto} = useQuiosco()

  const {imagen, nombre, precio} = producto

  return (
    <div className='border p-3 shadow bg-white'>
      <img
        src={`/img/${imagen}.jpg`}
        alt={`Imagen ${nombre}`}
        className='w-full' 
      />
      <div className='p-5'>
        <h3 className='text-2xl font-bold'>{nombre}</h3>
        <p className='font-black mt-5 text-4xl text-amber-500'>{formatearDinero(precio)}</p>
        <button
          type='button'
          className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold'
          onClick={() => {
            handleClickModal();
            handleSetProducto(producto);
        }}
        >
          agregar
        </button>
      </div>
    </div>
  )
}

Producto.propTypes = {
  producto: PropTypes.any.isRequired,
};

export default Producto