import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from '../../../services/axios'

//Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';

import CardBasic from '../../../components/Cards/Basic';
import PageHeading from '../../../components/PageHeading';
import Swal from 'sweetalert2';

const columns = [
    {
        name: "#",
        selector: "id",
        sortable: true
    },
    {
        name: "Título",
        selector: "name",
        sortable: true
    }
]

class Research extends Component {
    constructor(props) {
        super(props)

        this.state = {
            researches: []
        }
    }
    
    componentWillMount() {
        document.getElementById('body').className = 'page-top'

        axios.get('/admin/research').then(response => {
            this.setState({
                researches: response.data
            });
        }).catch(err => {
            console.log(err)

            Swal.fire('Erro', 'Erro ao listar as enquetes', 'error')
        })
    }

    componentDidMount() {
        //workaround, remove espaço em branco do title inexistente do plugin
        document.getElementsByClassName('rdt_TableHeader')[0].remove()
    }

    redirectToNew = () => {
        this.props.history.push("/enquete/novo")
    }

    render() {
        return (
            <div>
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar />
                            <div className="container-fluid">

                                <PageHeading title="Enquetes" subtitle="Gerencie e veja os resultados das enquetes adicionadas" />

                                <div className="row">
                                    <div className="col-xl-12">
                                        <CardBasic title="Listagem de Enquetes">
                                            <button onClick={() => this.redirectToNew()} className="btn btn-success">Adicionar Enquete</button>
                                            <DataTable
                                                columns={columns}
                                                data={this.state.researches}
                                                pagination
                                            />
                                        </CardBasic>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; Your Website 2019</span>
                                </div>
                            </div>
                        </footer>

                    </div>

                </div>
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a></div>
        )
    }
}

export default withRouter(Research);