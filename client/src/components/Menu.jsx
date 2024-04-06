import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <Link className='link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover pe-4' to='/asistencia'>Asistencia</Link>
            <Link className='link-primary pe-4 link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' to='/admin'>Admin</Link>
            <Link className='link-primary pe-4 link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' to='/reporte'>Reporte</Link>
            </div>    
          </div>

        </div>
      </nav>
    </>
  )
}

export default Menu