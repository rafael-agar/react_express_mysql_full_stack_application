import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ContextoApp } from '../contextos/ContextoApp';

const Login = () => {

  const {setApp} = useContext(ContextoApp)

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //const [values, setValues] = useState(null)

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
      const response = await axios.post('http://localhost:5500/login', { usuario, password });
      console.log('Login successful:', response.data);
      setApp({usuario})
      console.log(usuario)
      } catch (error) {
      setError('Invalid username or password');
      console.error('Login error:', error);
      }
  };

  return (
    <div>
        <img src='./../Logo.png' />
        <div className='container-fluid h-100 d-flex justify-content-center align-items-center'>
      <form onSubmit={handleSubmit} className='px-4 py-3 bg-light'>
      <h2 className='text-center'>Ingreso Admin</h2>
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
        <button type='submit' className='btn btn-primary w-100'>Sign in</button>
      </form>
    </div>
    </div>
  );
}

export default Login