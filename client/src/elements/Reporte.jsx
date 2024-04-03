import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Menu from "../components/Menu"

const Reporte = () => {

    const [data, setData] = useState([])
    const [deleted, setDeleted] = useState(true)

    //trabajadores
    useEffect(()=>{
        if(deleted){
            setDeleted(false)
            axios.get('http://localhost:5500/reporte')
            .then((res)=>{
                setData(res.data)
        })
        .catch((err)=>console.log(err))
    }
    }, [deleted])

    function handleDelete(id){

        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este registro del reporte?")

        if(isConfirmed){
            axios.delete(`http://localhost:5500/delete_reporte/${id}`)
            .then((res)=>{
                setDeleted(true)
            })
            .catch((err)=> console.log(err))
        }
    }

  return (
    <div className='container-fluid bg-light vh-100'>
        <h3 className='text-center p-4'>Reporte de Asistencia A&B Bookcafe</h3>
        <div className='d-flex flex-column container-lg'>
            
                <Menu />
            
            {/* //trabajadores lista */}
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th className='bg-black text-white'>Nombre</th>
                        <th className='bg-black text-white'>Fecha</th>
                        <th className='bg-black text-white'>Hora Entrada</th>
                        <th className='bg-black text-white'>Hora Salida</th>
                        <th className='bg-black text-white'>Tiempo Trabajado</th>
                        <th className='bg-black text-white'>Redoble</th>
                        <th className='bg-black text-white'>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((reporte)=>{
                            console.log(reporte)
                            return (<tr>
                                {/* <td>{trabajador.id}</td> */}
                                <td>{reporte.name}</td>
                                <td>{reporte.date.slice(0, 10)}</td>
                                <td>{reporte.hours_start}</td>
                                <td>{reporte.hours_end}</td> {/* Print the cargo name */}
                                <td>{reporte.time_worked}</td>
                                <td>{reporte.overtime}</td>
                                <td>
                                    {/* <Link className='btn mx-2 btn-primary' to={`/read/${reporte.id}`}>Read</Link> */}
                                    <Link className='btn mx-2 btn-primary' to={`/edit_reporte/${reporte.id}`}>Edit</Link>
                                    <button onClick={()=>handleDelete(reporte.id)} className='btn mx-2 btn-danger'>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Reporte