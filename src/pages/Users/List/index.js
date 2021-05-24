import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from '../../../services/axios'

//Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';

import CardBasic from '../../../components/Cards/Basic';
import PageHeading from '../../../components/PageHeading';
import convertUTCDateTimeToBrazilianDateTime from '../../../services/converter'


class Research extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rowsChange: false,
            users: []
        }
    }

    columns = [
        {
            name: "#",
            selector: "id",
            sortable: true
        },
        {
            name: "Nome",
            selector: "name",
            sortable: true
        },
        {
            name: 'Data e Hora',
            selector: 'created_at',
            sortable: true,
            cell: (row) => convertUTCDateTimeToBrazilianDateTime(row.created_at)
        },
        {
            name: 'Tipo',
            selector: 'tipo',
            cell: (row) => {
                if(row.tipo === 2){
                    return 'Admin'
                }
    
                return 'Comum'
            }
        },
        {
            name: 'Visualizar',
            cell: (row) => {
                return <button className="btn btn-primary" onClick={() => this.handleDetails(row)}>Visualizar</button>
            }
        }
    ]

    handleDetails(row) {
        console.log(row)

        this.props.history.push({
            pathname: `/enquete/${row.id}`,
            state: { research: row }
        })
    }
    
    componentDidMount() {
        //workaround, remove espaço em branco do title inexistente do plugin
        document.getElementsByClassName('rdt_TableHeader')[0].remove()

        document.getElementById('body').className = 'page-top'

        axios.get('/admin/users').then(response => {
            this.setState({
                users: response.data.users
            });
        }).catch(err => {
            console.log(err)

            Swal.fire('Erro', 'Erro ao listar os usuários', 'error')
        })
    }

    redirectToNew = () => {
        this.props.history.push("/users/novo")
    }

    render() {

        const { users, rowsChange } = this.state

        return (
            <div>
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar />
                            <div className="container-fluid">

                                <PageHeading title="Usuários" subtitle="Gerencie os usuários do sistema." />

                                <div className="row">
                                    <div className="col-xl-12">
                                        <CardBasic title="Listagem de Enquetes">
                                            <button onClick={() => this.redirectToNew()} className="btn btn-success">Adicionar Usuário</button>
                                            <DataTable
                                                columns={this.columns}
                                                data={users}
                                                pagination

                                                onSelectedRowsChange={rowsChange}
                                                Selected={rowsChange}
                                                clearSelectedRows={rowsChange}
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