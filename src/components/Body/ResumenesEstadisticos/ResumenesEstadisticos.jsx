import React from "react";
import LineChart from "./estadistica/lineChart";
import BarChart from "./estadistica/BarChart";
import PieChart from "./estadistica/PieChart";

import BarChartVendedoresCotizados from "./estadistica/BarChartVendedoresCotizados";
import ResumenUsuarios from "./estadistica/ResumenUsuarios";

const ResumenesEstadisticos = () => {
  return (
    <div>
      <div className="wrapper">
        {/*start page wrapper */}
        <div className="page-wrapper">
          <div className="page-content">
            {/*breadcrumb*/}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
              <div className="breadcrumb-title pe-3">Resumenes</div>
              <div className="ps-3">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 p-0">
                    <li className="breadcrumb-item">
                      <a href="javascript:;">
                        <i className="bx bx-home-alt" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Estadisticos
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="ms-auto">
                <div className="btn-group">
                  {/*Buscarle utilidad a esto */}
                  <button type="button" className="btn btn-primary">
                    Settings
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary split-bg-primary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                  >
                    {" "}
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
                    {" "}
                    <a className="dropdown-item" href="javascript:;">
                      Action
                    </a>
                    <a className="dropdown-item" href="javascript:;">
                      Another action
                    </a>
                    <a className="dropdown-item" href="javascript:;">
                      Something else here
                    </a>
                    <div className="dropdown-divider" />{" "}
                    <a className="dropdown-item" href="javascript:;">
                      Separated link
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/*end breadcrumb*/}

            {/*Start row 
                        Aca van las graficas 
                        */}
            <div className="row">
              <div className="col-xl-9 mx-auto">
                {/* Ingresos por Anuncios y Ventas por tienda en el mismo contenedor */}
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="mb-0 text-uppercase">
                          Ingresos por Anuncios
                        </h6>
                        <hr />
                        <div className="chart-container1">
                          <LineChart />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <h6 className="mb-0 text-uppercase">
                          Ventas por tienda
                        </h6>
                        <hr />
                        <div className="chart-container1">
                          <BarChart />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Productos más vendidos y Vendedores cotizados en el mismo contenedor */}
                <div className="card mt-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="mb-0 text-uppercase">
                          Productos más vendidos
                        </h6>
                        <hr />
                        <div className="chart-container1">
                          <PieChart />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <h6 className="mb-0 text-uppercase">
                          Vendedores cotizados
                        </h6>
                        <hr />
                        <div className="chart-container1">
                          <BarChartVendedoresCotizados />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />
                <div className="card mt-4">
                  <div className="card-body">
                    <h6 className="mb-2 text-uppercase">Resumen de Usuarios</h6>

                    <ResumenUsuarios />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay toggle-icon" />{" "}
        <a href="javaScript:;" className="back-to-top">
          <i className="bx bxs-up-arrow-alt" />
        </a>
      </div>
    </div>
  );
};

export default ResumenesEstadisticos;
