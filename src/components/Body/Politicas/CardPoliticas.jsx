import React from "react";
import { useEffect, useState } from "react";
import { NuevaPolitica } from "./NuevaPolitica";
import { EditarPolitica } from "./EditarPolitica";
import axios from "axios";
import Swal from "sweetalert2";

import jsPDF from "jspdf";
import "jspdf-autotable";

const exportarPDF = () => {
  const doc = new jsPDF();

  const accionesColumnIndex = 3; 
  const accionesColumn = $("#example").find("tr").find("td:eq(" + accionesColumnIndex + ")");
  accionesColumn.hide();

  const accionesHeader = $("#example").find("thead").find("tr").find("th:eq(" + accionesColumnIndex + ")");
  accionesHeader.hide();

  doc.autoTable({ html: "#example" });

  accionesColumn.show();

  accionesHeader.show();

  doc.save("POLÍTICAS-TICOMARKET.pdf");
};

const CardPoliticas = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [politicas, setPoliticas] = useState([]);
  const [estados, setEstados] = useState([]);
  const endpoint = "http://127.0.0.1:8000/api";


  useEffect(() => {
    axios
      .get(`${endpoint}/politicas`, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPoliticas(response.data);
        setDataLoaded(true);
        console.log(politicas);
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${endpoint}/estado`, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },)
      .then((response) => {
        setEstados(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      $("#example").DataTable();
    }
  }, [dataLoaded, politicas]);

  const actualizarPoliticas = () => {
    axios
      .get(`${endpoint}/politicas`, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },)
      .then((response) => {
        $("#example").DataTable().destroy();
        setPoliticas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de politicas:", error);
      });
  };

  const borrarPolitica = (id) => {
    Swal.fire({
      title: "Desea eliminar esta politica?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Se ha borrado la politica!.",
          icon: "success",
        });
        axios
          .delete(`${endpoint}/politicas/eliminar/${id}`, {
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },)
          .then((response) => {
            actualizarPoliticas();
            console.log("Datos borrados");
          })
          .catch((error) => {
            console.error("Error al obtener usuarios:", error);
          });
      }
    });
  };

  const obtenerNombreEstado = (idEstado) => {
    const estadoEncontrado = estados.find((e) => e.id === idEstado);
    return estadoEncontrado ? estadoEncontrado.nombre : "Estado no encontrado";
  };

  return (
    <div className="container-inPage">
      <div id="superAdminContainer" className="container">
        <div className="card" id="superAdminCard">
          <div className="card-body">
            <h3 className="mb-0 text-uppercase">Gestión de políticas</h3>
            <div className="mt-3 ">
              <NuevaPolitica
                actualizarPoliticas={actualizarPoliticas}
              ></NuevaPolitica>
              <button
          className="btn btn-danger m-2"
          onClick={exportarPDF}
        >
          Exportar a PDF
        </button>
            </div>
            <br />
            <div className="table-responsive">
              <table
                id="example"
                className="table table-striped table-bordered"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Estado</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {politicas.map((politica) => (
                      <tr key={politica.idPolitica }>
                        <td>{politica.nombre}</td>
                        <td>{politica.descripcion}</td>
                        <td>{obtenerNombreEstado(politica.idEstado)}</td>
                        <td>
                          <EditarPolitica
                            nombre={politica.nombre}
                            descripcion={politica.descripcion}
                            estado={politica.idEstado}
                            id={politica.idPolitica}
                            actualizarPoliticas={actualizarPoliticas}
                          ></EditarPolitica>
                          <button
                            className="btn btn-danger btn-sm m-1"
                            onClick={() => {
                              borrarPolitica(politica.idPolitica);
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPoliticas;
