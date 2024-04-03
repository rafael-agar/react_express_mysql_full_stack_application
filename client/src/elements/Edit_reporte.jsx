import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit_reporte = () => {

  const [data, setData] = useState([]);
  const { id } = useParams();

  //obtener un reporte
  useEffect(() => {
    axios
      .get(`http://localhost:5500/get_reporte/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:5500/edit_reporte/${id}`, data[0])
      .then((res) => {
        navigate("/admin");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid w-50 vh-100">
      
      <div className="bg-light p-4">
      <h1 className="text-center">Usuario id: {id}</h1>
      <button onClick={() => navigate(-1)} className="btn btn-success">
        Volver
      </button>
      {data.map((report) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="hours_start">Hora de entrada</label>
              <input
                className="form-control"
                value={report.hours_start}
                type="time"
                name="hours_start"
                required
                onChange={(e) =>
                  setData([{ ...data[0], hours_start: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="hours_end">Hora de salida</label>
              <input
                className="form-control"
                value={report.hours_end}
                type="time"
                name="hours_end"
                required
                onChange={(e) =>
                  setData([{ ...data[0], hours_end: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="time_worked">Tiempo trabajdo</label>
              <input
                className="form-control"
                value={report.time_worked}
                type="num"
                name="time_worked"
                required
                onChange={(e) =>
                  setData([{ ...data[0], time_worked: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="overtime">Redoble</label>
              <input
                className="form-control"
                value={report.overtime}
                type="num"
                name="overtime"
                required
                onChange={(e) =>
                  setData([{ ...data[0], overtime: e.target.value }])
                }
              />
            </div>

            <div className="form-group my-3">
              <button type="submit" className="btn btn-primary mt-2 w-100">
                Guardar
              </button>
            </div>

          </form>
        );
      })}
      </div>
    </div>
  )
}

export default Edit_reporte