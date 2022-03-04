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
import { array } from 'prop-types';


class Research extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }

    columns = [
        {
            name: "#",
            selector: "id",
            sortable: true,
            hide: 1024,
        },
        {
            name: "Nome",
            selector: "name",
            sortable: true,
        },
        {
            name: 'Data e Hora',
            selector: 'created_at',
            sortable: true,
            cell: (row) => convertUTCDateTimeToBrazilianDateTime(row.created_at),
            hide: 1170,
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
            compact: true,
            cell: (row) => {
                return <button className="btn btn-primary btn-size" onClick={() => this.handleDetails(row)}>Visualizar</button>
            }
        },
        {
            name: 'Editar',
            compact: true,
            cell: (row) => {
                return <button className="btn btn-primary btn-size" onClick={() => this.handleUpdateRedirect(row.id)}>Editar</button>
            }
        },
        {
            name: 'Deletar',
            compact: true,
            cell: (row) => {
                return <button className="btn btn-danger btn-size" onClick={() => this.handleDelete(row)}>Deletar</button>
            }
        }
    ]

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

    handleDelete = (row) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: `Realmente quer deletar o usuario ${row.name}? Após deletado, não será possível reverter o processo.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim, deletar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/admin/users/${row.id}`).then(sucess => {
                    Swal.fire(
                        'Deletado!',
                        'O usuário foi deletado',
                        'success'
                    )

                    var users = this.state.users
                    const index = users.findIndex(user => user.id === row.id)
                    users.splice(index, 1)

                    this.setState({
                        users: users
                    })
                }).catch(e => {
                    console.log(e)

                    Swal.fire(
                        'Erro',
                        'Erro ao deletar o usuário',
                        'error'
                    )
                })
            }
        })
    }

    handleUpdateRedirect = (id) => {
        this.props.history.push(`/users/editar/${id}`)
    }

    redirectToNew = () => {
        this.props.history.push("/users/novo")
    }

    handleDetails(row) {
        this.props.history.push({
            pathname: `/users/${row.id}`,
            state: { user: row }
        })
    }

    render() {

        const { users } = this.state

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
                                        <CardBasic title="Listagem de Usuários">
                                            <button onClick={() => this.redirectToNew()} className="btn btn-success">Adicionar Usuário</button>
                                            <div class="table-content">
                                                <DataTable
                                                    columns={this.columns}
                                                    data={users}
                                                    pagination
                                                />
                                            </div>
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
                </a>
            </div>
        )
    }
}

export default withRouter(Research);