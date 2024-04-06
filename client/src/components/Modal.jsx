import React, { useState } from 'react';
import { CSVLink } from "react-csv";

const Modal = ({ data, modal }) => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const datosFiltrados = data.filter(reporte => {
    const fecha = new Date(reporte.date);
    const inicio = fechaInicio ? new Date(fechaInicio) : new Date('1970-01-01'); // Fecha muy anterior
    const fin = fechaFin ? new Date(fechaFin) : new Date('2999-12-31'); // Fecha muy futura
    return fecha >= inicio && fecha <= fin;
  });
  

  return (
    <div className="modal modal-lg modal-dialog-scrollable show d-block" id='staticBackdrop' tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between">
            <div>
              <button type="button" className="btn-close" onClick={() => modal(false)}></button>
            </div>
            <div>

            <input pattern="\d{4}:\d{2}:\d{2}" className='me-2' type='date' value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            <input  pattern="\d{4}:\d{2}:\d{2}" type='date' value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
              
            </div>
            <div>
              <CSVLink className='btn btn-success' data={datosFiltrados}>Exportar</CSVLink>
            </div>
          </div>
          
          <div className="modal-body">
            <table className='table table-hover'>
              <thead className='w-100'>
                <tr>
                  <th className='bg-black text-white fs-6'>Nombre</th>
                  <th className='bg-black text-white fs-6'>Fecha</th>
                  <th className='bg-black text-white fs-6'>Hora Entrada</th>
                  <th className='bg-black text-white fs-6'>Hora Salida</th>
                  <th className='bg-black text-white fs-6'>Tiempo Trabajado</th>
                  <th className='bg-black text-white fs-6'>Redoble</th>
                </tr>
              </thead>
              <tbody>
                {
                  datosFiltrados.map((reporte) => (
                    <tr key={reporte.id}> {/* Asegúrate de tener una 'key' única para cada fila */}
                      <td className='fs-6'>{reporte.name}</td>
                      <td className='fs-6'>{reporte.date.slice(5, 10)}</td>
                      <td className='fs-6'>{reporte.hours_start}</td>
                      <td className='fs-6'>{reporte.hours_end}</td>
                      <td className='fs-6'>{reporte.time_worked}</td>
                      <td className='fs-6'>{reporte.overtime}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table> 
          </div>

        </div>
      </div>
    </div>
  )
}

export default Modal;
