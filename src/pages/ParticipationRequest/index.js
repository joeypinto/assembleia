import React, { Component } from 'react';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';

import CardBasic from '../../components/Cards/Basic';
import PageHeading from '../../components/PageHeading';
  
class Dashboard extends Component {
  componentWillMount() {
    document.getElementById('body').className = 'page-top'
  }

  render() {
    return (
      <div>
        {/* <!-- Page Wrapper --> */}
        <div id="wrapper">

          {/* <!-- Sidebar --> */}
          <Sidebar />
          {/* <!-- End of Sidebar --> */}

          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">

            {/* <!-- Main Content --> */}
            <div id="content">

              {/* <!-- Topbar --> */}
              <Topbar />
              {/* <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">

                {/* <!-- Page Heading --> */}

                <PageHeading title="Solicitações para participar" subtitle="Aceite ou recuse as solicitações para participar da transmissão por aqui" />

                {/* <!-- Content Row --> */}
                <div className="row">
                    <div className="col-xl-12">
                        <CardBasic title="Solicitações de Participação">
                          <div className="table-responsive">
                            <table className="table table-bordered" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Status</th>
                                        <th>Aceitar</th>
                                        <th>Rejeitar</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Status</th>
                                        <th>Aceitar</th>
                                        <th>Rejeitar</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                  <tr>
                                    <td>27</td>
                                    <td><b>Superteia</b> solicitou acesso</td>
                                    <td>Pendente</td>
                                    <td>
                                      <button className="btn btn-success btn-icon-split aceitar">
                                        <span className="icon text-white-50"><i className="fas fa-check"></i></span>
                                          <span className="text">Aceitar
                                        </span>
                                      </button>
                                    </td>
                                    <td>
                                      <button className="btn btn-danger btn-icon-split rejeitar"><span className="icon text-white-50">
                                        <i className="fas fa-trash"></i></span><span className="text">Rejeitar</span>
                                      </button>
                                    </td>
                                  </tr>
                                  <tr>
                                      <td>26</td>
                                      <td><b>Admin</b> solicitou acesso</td>
                                      <td style={{textAlign: 'center', color: '#1cc88a', fontWeight: 'bold'}}>Aprovado</td>
                                  </tr>
                                </tbody>
                            </table>
                          </div>
                        </CardBasic>
                    </div>
                </div>

              </div>
              {/* <!-- /.container-fluid --> */}

            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2019</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}

          </div>
          {/* <!-- End of Content Wrapper --> */}

        </div>
        {/* <!-- End of Page Wrapper --> */}

        {/* <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a></div>
    )
  }
}

export default Dashboard;