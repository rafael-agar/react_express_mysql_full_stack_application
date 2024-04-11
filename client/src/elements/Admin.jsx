import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from "../components/Menu"
const apiURL = process.env.REACT_APP_API_URL;

function Home() {
    const [data, setData] = useState([])
    const [cargos, setCargos] = useState([]);
    const [deleted, setDeleted] = useState(true)

    //trabajadores
    useEffect(()=>{
        if(deleted){
            setDeleted(false)
            axios.get(`${apiURL}/trabajador_details`)
            .then((res)=>{
                setData(res.data)
        })
        .catch((err)=>console.log(err))
    }
    }, [deleted])

    //cargos
    useEffect(()=>{
        if(deleted){
            setDeleted(false)
            axios.get(`${apiURL}/cargo`)
            .then((res)=>{
                setCargos(res.data)
            })
            .catch((err)=>console.log(err))
        }
    }, [deleted])

    //borrar trabajador
    function handleDelete(id){

        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar el  trabajador?")

        if(isConfirmed) {
            axios.delete(`${apiURL}/delete_trabajador/${id}`)
            .then((res)=>{
                setDeleted(true)
            })
            .catch((err)=> console.log(err))
        }
    }

    //borrar cargo
    function handleDeleteCargo(id) {
        // Mostrar cuadro de diálogo de confirmación
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este registro?");
    
        // Proceder solo si el usuario confirma
        if (isConfirmed) {
            axios.delete(`${apiURL}/delete_cargo/${id}`)
                .then((res) => {
                    setDeleted(true);
                    // Puedes agregar aquí cualquier otra lógica que necesites después de la eliminación exitosa
                })
                .catch((err) => console.log(err));
        }
    }

    //paginación
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPage = 10;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;
    const records = data.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(data.length / recordsPage);
    const numbers = [ ...Array(nPage+1).keys()].slice(1);

  return (
    <div className='container-fluid bg-light vh-100'>
        <h3 className='text-center p-4'>Trabajadores A&B Bookcafe</h3>
        <div className='d-flex flex-column container-lg'>

                <Menu />

            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success me-3' to='/create'>Add Trabajador</Link>
            </div>
            
            {/* //trabajadores lista */}
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th className='bg-black text-white'>Name</th>
                        <th className='bg-black text-white'>Usuario</th>
                        <th className='bg-black text-white'>Password</th>
                        <th className='bg-black text-white'>fecha_contratacion</th>
                        <th className='bg-black text-white'>Cargo</th>
                        <th className='bg-black text-white'>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map((trabajador)=>{
                            return (<tr>
                                {/* <td>{trabajador.id}</td> */}
                                <td>{trabajador.name}</td>
                                <td>{trabajador.usuario}</td>
                                <td>{trabajador.password}</td>
                                <td>{new Date (trabajador.fecha_contratacion).toLocaleDateString("es-GB")}</td>
                                <td>{trabajador.cargo_name}</td> {/* Print the cargo name */}
                                <td>
                                    {/* <Link className='btn mx-2 btn-primary' to={`/read/${trabajador.id}`}>Read</Link> */}
                                    <Link className='btn mx-2 btn-primary' to={`/edit/${trabajador.id}`}>Edit</Link>
                                    <button onClick={()=>handleDelete(trabajador.id)} className='btn mx-2 btn-danger'>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
            {/* paginación */}
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={prePage}>Anterior</a>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a className="page-link" href="#" onClick={()=> changeCPage(n)}>{n}</a>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={nextPage}>Siguiente</a>
                    </li>
                </ul>
            </nav>

            {/* cargos lista */}
            <h3 className='text-center m-4'>Lista de Cargos</h3>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success' to='/create_cargo'>Add Nuevo Cargo</Link>

            </div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th className='bg-black text-white'>Cargo</th>
                        <th className='bg-black text-white'>Descripción</th>
                        <th className='bg-black text-white'>Salario base</th>
                        <th className='bg-black text-white'>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cargos.map((cargo)=>{
                            return (<tr>
                                <td>{cargo.Nombre_cargo}</td>
                                <td>{cargo.Descripcion}</td>
                                <td>{cargo.Salario_base}</td>
                                <td><Link className='btn mx-2 btn-primary' to={`/edit_cargo/${cargo.ID_cargo}`}>Edit</Link>
                                <button onClick={()=>handleDeleteCargo(cargo.ID_cargo)} className='btn mx-2 btn-danger'>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )

  function prePage() {
    if(currentPage !== 1){
        setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id)
  }

  function nextPage() {
    if(currentPage !== nPage){
        setCurrentPage(currentPage + 1);
    }
  }
}

export default Home