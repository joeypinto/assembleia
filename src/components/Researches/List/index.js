import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'

import axios from '../../../services/axios';
import convertUTCDateTimeToBrazilianDateTime from '../../../services/converter'


class ResearchesListComponent extends Component {

    renderResearchesRow = () => {
        var researchesBuffer = []

        this.props.researches.map(research => {

            var statusButtonRow = null
            var statusLabel = null

            if(research.status === 0 && research.is_finished === 0){
                statusLabel = 'Desativado'
                statusButtonRow = <button className="btn btn-success"  onClick={() => this.handleUpdateResearchStatus(research.id, 1, 0)}>Ativar</button>
            }

            if(research.status === 1 && research.is_finished === 0) {
                statusLabel = 'Ativado'
                statusButtonRow = <button className="btn btn-danger" onClick={() => this.handleUpdateResearchStatus(research.id, 0, 1)}>Finalizar</button>
            }
            
            if(research.is_finished === 1){
                statusLabel = 'Finalizado'
                statusButtonRow = <button className="btn btn-default" disabled>Finalizada</button>
            }


            researchesBuffer.push(
                <tr key={research.id}>
                    <td>{research.id}</td>
                    <td>{research.name}</td>
                    <td>{convertUTCDateTimeToBrazilianDateTime(research.created_at)}</td>
                    <td>{statusLabel}</td>
                    <td>{statusButtonRow}</td>
                    <td><button className="btn btn-primary" onClick={() => this.handleResearchDetails(research)}>Visualizar</button></td>
                </tr>    
            )
        })
        
        return researchesBuffer
    }

    handleUpdateResearchStatus(researchId, status, isFinished) {

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
                var { liveId } = this.props
                axios.put('/admin/research', {
                    id: researchId,
                    status: status,
                    is_finished: isFinished,
                    live_id: liveId
                }).then(() => {
                    var { researches } = this.props
        
                    const index = researches.findIndex(e => e.id === researchId)
        
                    researches[index].status = status
                    researches[index].is_finished = isFinished
        
                    this.props.updateStateResearch(researches)
        
                    Swal.fire('Sucesso', 'O status foi alterado com sucesso', 'success')
                }).catch(() => {
                    Swal.fire('Erro', 'Erro ao alterar o status da enquete', 'error')
                })
            }
        })
    }

    handleResearchDetails(row) {
        console.log(row)

        this.props.history.push({
            pathname: `/enquete/${row.id}`,
            state: { research: row }
        })
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-bordered" width="100%" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Data e Hora</th>
                            <th>Status</th>
                            <th>Alterar Status</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Data e Hora</th>
                            <th>Status</th>
                            <th>Alterar Status</th>
                            <th>Visualizar</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        { this.renderResearchesRow() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(ResearchesListComponent)