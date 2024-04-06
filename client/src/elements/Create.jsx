import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const apiURL = process.env.REACT_APP_API_URL;

function Create() {
    const [cargo, setCargo] = useState([]);
    const [values, setValues] = useState({
        name: '',
        usuario: '',
        password: '',
        fecha_contratacion: '',
        id_cargo: ''
    })

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        axios.post(`${apiURL}/add_trabajador`, values)
        .then((res)=>{
            
            navigate('/admin')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        axios
          .get(`${apiURL}/cargo`)
          .then((res) => {
            setCargo(res.data);
          })
          .catch((err) => console.log(err));
      },[])

  return (
    <div className='container-fluid w-50 vh-100'>
        <div className='row bg-light p-4'>
            <h3 className='text-center'>Add Trabajador</h3>
            <div className='d-flex justify-content-end'>
            <button onClick={() => navigate(-1)} className="btn btn-success">
              Volver
            </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-group my-3'>
                    <label htmlFor='name'>Name</label>
                    <input className="form-control" type='text' name='name' required onChange={(e)=> setValues({...values, name: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='usuario'>Usuario</label>
                    <input className="form-control" type='text' name='usuario' required onChange={(e)=> setValues({...values, usuario: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='Password'>Password</label>
                    <input className="form-control" type='password' name='Password' required onChange={(e)=> setValues({...values, password: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='fecha_contratacion'>Fecha Contratacion</label>
                    <input className="form-control" type='date' name='fecha_contratacion' required onChange={(e)=> setValues({...values, fecha_contratacion: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='id_cargo'>Cargo id</label>
                    <input className="form-control" type='text' name='id_cargo' required onChange={(e)=> setValues({...values, id_cargo: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <button type='submit' className='btn btn-primary mt-2 w-100'>Save</button>
                </div>
                <table>
            <thead>
              <tr>
                <th>Nombre del cargo</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {cargo.map((e, index) => (
                <tr key={index}>
                  <td>{e.Nombre_cargo}</td>
                  <td>{e.ID_cargo}</td>
                </tr>
              ))}
            </tbody>
          </table>
            </form>
        </div>
    </div>
  )
}

export default Create