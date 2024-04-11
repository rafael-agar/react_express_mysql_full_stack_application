import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Menu from "../components/Menu"
import Modal from "../components/Modal"
const apiURL = process.env.REACT_APP_API_URL;

const Reporte = () => {

    const [data, setData] = useState([])
    const [deleted, setDeleted] = useState(true)
    const [showModal, setShowModal] = useState(false);

    //trabajadores
    useEffect(()=>{
        if(deleted){
            setDeleted(false)
            axios.get(`${apiURL}/reporte`)
            .then((res)=>{
                setData(res.data)
        })
        .catch((err)=>console.log(err))
    }
    }, [deleted])

    function handleDelete(id){

        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este registro del reporte?")

        if(isConfirmed){
            axios.delete(`${apiURL}/delete_reporte/${id}`)
            .then((res)=>{
                setDeleted(true)
            })
            .catch((err)=> console.log(err))
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
        <h3 className='text-center p-4'>Reporte de Asistencia A&B Bookcafe</h3>
        <div className='d-flex flex-column container-lg'>
            
                <Menu />
                <button 
                    type="button" 
                    className="btn btn-success" 
                    data-bs-toggle="modal" 
                    data-bs-target="#staticBackdrop"
                    onClick={() => setShowModal(true)}
                >
                Exportar como csv
                </button>
            
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
                        <th className='bg-black text-white fs-6'>Asistencia</th>
                        <th className='bg-black text-white'>Acción</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map((reporte)=>{
                            console.log(reporte)
                            return (<tr>
                                {/* <td>{trabajador.id}</td> */}
                                <td>{reporte.name}</td>
                                <td>{reporte.date.slice(0, 10)}</td>
                                <td>{reporte.hours_start}</td>
                                <td>{reporte.hours_end}</td> {/* Print the cargo name */}
                                <td>{reporte.time_worked}</td>
                                <td>{reporte.overtime}</td>
                                <td>{reporte.asistencia}</td>
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

            {/* <!-- Scrollable modal --> */}
            {showModal &&  (
                <Modal data={data} modal={setShowModal} />              
            )}
            <div className={showModal ? "modal-backdrop fade show" : ""}></div>
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

export default Reporte