import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Create_cargo() {
    const [values, setValues] = useState({
      Nombre_cargo: '',
      Descripcion: '',
      Salario_base: '',
    })

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        axios.post('http://localhost:5500/add_cargo', values)
        .then((res)=>{
            
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }

  return (
    <div className='container-fluid w-50 vh-100'>
      <div className='row bg-light p-4'>
          <h3 className='text-center'>Agregar nuevo cargo</h3>
          <div className='d-flex justify-content-end'>
          <button onClick={() => navigate(-1)} className="btn btn-success">
            Volver
        </button>
          </div>
          <form onSubmit={handleSubmit}>
              <div className='form-group my-3'>
                  <label htmlFor='Nombre_cargo'>Nombre del cargo</label>
                  <input className='form-control' type='text' name='Nombre_cargo' required onChange={(e)=> setValues({...values, Nombre_cargo: e.target.value})} />
              </div>
              <div className='form-group my-3'>
                  <label htmlFor='Descripcion'>Descripcion</label>
                  <input className='form-control' type='text' name='Descripcion' required onChange={(e)=> setValues({...values, Descripcion: e.target.value})} />
              </div>
              <div className='form-group my-3'>
                  <label htmlFor='Salario_base'>Salario base</label>
                  <input className='form-control' type='Salario_base' name='Salario_base' required onChange={(e)=> setValues({...values, Salario_base: e.target.value})} />
              </div>

              <div className='form-group my-3'>
                  <button type='submit' className='btn btn-primary mt-2 w-100'>Save</button>
              </div>
          </form>
      </div>
    </div>
  )
}

export default Create_cargo;