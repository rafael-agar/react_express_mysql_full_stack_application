import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit_cargo() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  //obtener un cargo
  useEffect(() => {
    axios
      .get(`http://localhost:5500/get_cargo/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:5500/edit_cargo/${id}`, data[0])
      .then((res) => {
        navigate("/admin");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  console.log(data)

  return (
    <div className="container-fluid w-50 vh-100">
      
      <div className="bg-light p-4">
      <h1 className="text-center">Cargo {id}</h1>
      <button onClick={() => navigate(-1)} className="btn btn-success">
        Volver
      </button>
      {data.map((cargo) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="Nombre_cargo">Nombre del cargo</label>
              <input
                className="form-control"
                value={cargo.Nombre_cargo}
                type="text"
                name="Nombre_cargo"
                required
                onChange={(e) =>
                  setData([{ ...data[0], Nombre_cargo: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="Descripcion">Descripción</label>
              <input
                className="form-control"
                value={cargo.Descripcion}
                type="text"
                name="Descripcion"
                required
                onChange={(e) =>
                  setData([{ ...data[0], Descripcion: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="Salario_base">Salario base</label>
              <input
                className="form-control"
                value={cargo.Salario_base}
                type="text"
                name="Salario_base"
                required
                onChange={(e) =>
                  setData([{ ...data[0], Salario_base: e.target.value }])
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
  );
}

export default Edit_cargo;