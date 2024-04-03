import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [data, setData] = useState([]);
  const [cargo, setCargo] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5500/get_trabajador/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(()=>{
    axios
      .get(`http://localhost:5500/cargo`)
      .then((res) => {
        setCargo(res.data);
      })
      .catch((err) => console.log(err));
  },[])

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:5500/edit_trabajador/${id}`, data[0])
      .then((res) => {
        navigate("/admin");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid w-50 vh-100">
      
      <div className="bg-light p-4">
      <h1 className="text-center">User {id}</h1>
      <button onClick={() => navigate(-1)} className="btn btn-success">
        Volver
      </button>
      {data.map((trabajador) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                value={trabajador.name}
                type="text"
                name="name"
                required
                onChange={(e) =>
                  setData([{ ...data[0], name: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="usuario">usuario</label>
              <input
                className="form-control"
                value={trabajador.usuario}
                type="text"
                name="usuario"
                required
                onChange={(e) =>
                  setData([{ ...data[0], usuario: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="password">password</label>
              <input
                className="form-control"
                value={trabajador.password}
                type="password"
                name="password"
                required
                onChange={(e) =>
                  setData([{ ...data[0], password: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="fecha_contratacion">fecha_contratacion</label>
              <input
                className="form-control"
                value={trabajador.fecha_contratacion}
                type="date"
                name="fecha_contratacion"
                required
                onChange={(e) => setData([{ ...data[0], fecha_contratacion: e.target.value }])}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="cargo">cargo</label>
              <input
                className="form-control"
                value={trabajador.id_cargo}
                type="number"
                name="cargo"
                required
                onChange={(e) =>
                  setData([{ ...data[0], id_cargo: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <button type="submit" className="btn btn-primary mt-2 w-100">
                Guardar
              </button>
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
        );
      })}
      </div>
    </div>
  );
}

export default Edit;
