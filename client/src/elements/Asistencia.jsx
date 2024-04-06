import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import myLogo from '../Logo.png'
const apiURL = process.env.REACT_APP_API_URL;

function Asistencia() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    //const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const [respuesta, setRespuesta] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post(`${apiURL}/login`, { usuario, password })
          console.log('Loginx successfullllll:', response.data);
          setRespuesta(response.data)
          setShowModal(true); // Mostrar el modal
            setTimeout(() => {
                setShowModal(false); // Cerrar el modal después de 3 segundos
                setUsuario('')
                setPassword('')
                navigate('/');
            }, 8000);
      } catch (error) {
          //setError('Invalid username or password');
          console.error('Login error:', error);
      }
  };


  return (
    <div className='d-flex flex-column'>
        <img alt='logo company' src={myLogo} width='230' className="mx-auto d-block mt-4 pt-4 mb-4"/>
        <div className='container-fluid d-flex justify-content-center align-items-center'>
          <form style={{width: '450px;'}} onSubmit={handleSubmit} className='px-4 py-3 bg-light'>
          <h2 className='text-center'>Control de Asistencia</h2>
            <div className='mb-3'>
              <label htmlFor='usuario' className='form-label'>Usuario</label>
              <input
                type='text'
                className='form-control'
                id='usuario'
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Password</label>
              <input
                type='password'
                className='form-control'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='btn btn-primary w-100'>Entrar / Salir</button>

          </form>
      </div>
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Datos del trabajador</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                      <p>Hola {usuario}</p>  
                      {respuesta.message}
                      <span className='text-primary"'> {respuesta.currentHour}</span>
                    </div>
                </div>
            </div>
        </div>
      )}
      <div className={showModal ? "modal-backdrop fade show" : ""}></div>
    </div>
  );
}

export default Asistencia;