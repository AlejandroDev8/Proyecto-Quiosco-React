import {Outlet} from 'react-router-dom'

function AuthLayout() {
  return (
    <main className='max-w-4xl m-auto mt-10 md:mt-18 flex flex-col md:flex-row items-center'>
      <img className='max-w-xs' src="../img/logo.svg" alt="Imagen-Logotipo" />
      <div className='p-10 w-full'>
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout