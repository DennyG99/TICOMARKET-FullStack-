import React, { useState, useEffect } from "react";
import axios from 'axios';
import { success, error } from "./Alerts";

const endpoint = 'http://127.0.0.1:8000/api';

export function NuevoPlan(props) {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipoPlan, setTipoPlan] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  
  let message = "";

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleTipoPlanChange = (e) => {
    setTipoPlan(e.target.value);
  };

  const handlePrecioChange = (e) => {
    setPrecio(e.target.value);
  };

  const handleEstadoChange = (e) => {
    setEstadoSeleccionado(e.target.value);
  };

  const handleGuardarClick = () => {
    if (!nombre || !descripcion || !tipoPlan || !precio || !estadoSeleccionado) {
      error(message="Por favor llene todos los campos");
      return;
    }
  
    axios.post(`${endpoint}/planes/crear`, {
      nombre: nombre,
      descripcion: descripcion,
      tipoPlan: tipoPlan,
      precio: precio,
      idEstado: estadoSeleccionado
    })
      .then(response => {

        success(message="Plan creado exitosamente");
        
        setNombre("");
        setDescripcion("");
        setTipoPlan("");
        setPrecio("");
        setEstadoSeleccionado("");

        props.actualizarPlanes();

      })
      .catch(error => {
        console.error("Error al crear el plan:", error);
      });
  }

  useEffect(() => {
    axios.get(`${endpoint}/estado`)
      .then(response => {
        setEstado(response.data.data);
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#nuevoPlan"
      >
        Agregar Plan
      </button>

      <div
        className="modal fade"
        id="nuevoPlan"
        tabIndex="-1"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="myModalLabel">
                Agregar Plan
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>

                <div className="form-group">
                  <label htmlFor="nombre">Nombre del plan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Ingrese el nombre del plan"
                    value={nombre}
                    onChange={handleNombreChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="descripcion">Descripcion del plan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="descripcion"
                    placeholder="Ingrese la descripción del plan"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tipoPlan">Tipo del plan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tipoPlan"
                    placeholder="Ingrese el tipo del plan"
                    value={tipoPlan}
                    onChange={handleTipoPlanChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="precio">Precio del plan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="precio"
                    placeholder="Ingrese el precio del plan"
                    value={precio}
                    onChange={handlePrecioChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="estado">Estado del plan</label>
                  <select
                    className="form-control"
                    id="estado"
                    value={estadoSeleccionado}
                    onChange={handleEstadoChange}
                  >
                    <option value="" disabled>Selecciona un estado</option>
                    {estado.map(estado => (
                      <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                    ))}
                  </select>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleGuardarClick}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
