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
            researches: []
        }
    }

    columns = [
        {
            name: "#",
            selector: "id",
            sortable: true
        },
        {
            name: "Título",
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
            name: 'Status',
            selector: 'status',
            cell: (row) => {
                if(row.status === 1){
                    return 'Ativado'
                }
    
                return 'Desativado'
            }
        },
        {
            name: 'Alterar Status',
            cell: (row) => {
                console.log(row)
                if(row.status === 0 && row.is_finished === 0){
                    return <button className="btn btn-success"  onClick={() => this.handleUpdateStatus(row.id, 1, 0)}>Ativar</button>
                }
    
                if(row.status === 1 && row.is_finished === 0) {
                    return <button className="btn btn-danger" onClick={() => this.handleUpdateStatus(row.id, 0, 1)}>Finalizar</button>
                }
                
                if(row.is_finished === 1){
                    return <button className="btn btn-default" disabled>Finalizada</button>
                }
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
    
    handleUpdateStatus(researchId, status, isFinished) {

        Swal.fire({
            title: 'Você tem certeza?',
            text: `Você realmente quer alterar o status desta enquete?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim, alterar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put('/admin/research', {
                    id: researchId,
                    status: status,
                    is_finished: isFinished
                }).then(() => {
                    var { researches } = this.state
        
                    const index = researches.findIndex(e => e.id === researchId)
        
                    researches[index].status = status
        
                    this.setState({
                        rowsChange: !this.state.rowsChange,
                        researches: researches
                    })
        
                    Swal.fire('Sucesso', 'O status foi alterado com sucesso', 'success')
                }).catch(() => {
                    Swal.fire('Erro', 'Erro ao alterar o status da enquete', 'error')
                })
            }
        })
    }

    componentDidMount() {
        //workaround, remove espaço em branco do title inexistente do plugin
        document.getElementsByClassName('rdt_TableHeader')[0].remove()

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

    redirectToNew = () => {
        this.props.history.push("/enquete/novo")
    }

    render() {

        const { researches, rowsChange } = this.state

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
                                                columns={this.columns}
                                                data={researches}
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