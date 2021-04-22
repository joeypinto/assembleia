import React, { Component } from 'react'
import Swal from 'sweetalert2'

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import axios from './../../services/axios'

//Navigation
import Sidebar from '../../components/Navigation/Sidebar'
import Topbar from '../../components/Navigation/Topbar'

import CardBasic from '../../components/Cards/Basic'
import PageHeading from '../../components/PageHeading'

class Dashboard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			requests: []
		}
	}

	componentWillMount() {
		document.getElementById('body').className = 'page-top'
	}

	componentDidMount() {
		axios.get('admin/list-invitations?min=0').then((response) => {
			this.setState({
				requests: response.data.participations
			})
		})
	}

	renderRow(data) {
		console.log(data);
		let status = null

		if(data.status === 1 && data.link != null) {
			status = <td colSpan={3} style={{ textAlign: 'center', color: '#1cc88a', fontWeight: 'bold' }}>Aprovado</td>
		} else if (data.status === 1 && data.link == null) {
			status = <>
				<td>Pendente</td>
				<td>
					<button onClick={() => this.handleAcceptStatus(data)} className="btn btn-success btn-icon-split">
						<span className="icon text-white-50">
							<i className="fas fa-check"></i>
						</span>
						<span className="text">Aceitar</span>
					</button>
				</td>
				<td>
					<button onClick={() => this.handleRejectStatus(data)} className="btn btn-danger btn-icon-split">
						<span className="icon text-white-50">
							<i className="fas fa-trash"></i>
						</span>
						<span className="text">Rejeitar</span>
					</button>
				</td>
			</>
			
		} else {
			status = <td colSpan={3} style={{ textAlign: 'center', color: '#e74a3b', fontWeight: 'bold' }}>Reprovado</td>
		}

		return (
			<tr key={data.participationId}>
				<td>{ data.participationId }</td>
				<td>{ data.name }</td>
				<td>{ data.description }</td>
				{ status }
			</tr>
		)
	}

	handleAcceptStatus = async (data) => {
		const { value: url } = await Swal.fire({
			input: 'url',
			inputLabel: `Digite o link da live para o associado ${data.name}`,
			inputPlaceholder: 'Link',
			validationMessage: 'O link digitado está incorreto'
		})

		if (url) {
			axios.post('admin/change-invitation-status', {
				link: url,
				status: 1,
				id: data.participationId
			}).then(() => {
				this.updateRequestsState(data.participationId, 1, url)
			}).catch(err => {
				console.log(err);

				Swal.fire("Erro", "Erro ao alterar status", "error")
			})
		}
	}

	handleRejectStatus = (data) => {
		axios.post('admin/change-invitation-status', {
			link: null,
			status: 0,
			id: data.participationId
		}).then(() => {
			this.updateRequestsState(data.participationId)
		}).catch(err => {
			console.log(err);

			Swal.fire("Erro", "Erro ao alterar status", "error")
		})
	}

	updateRequestsState = (participationId, status = 0, url = null) => {
		var { requests } = this.state
		var index = requests.findIndex(e => e.participationId === participationId)
		requests[index].link = url
		requests[index].status = status

		this.setState({
			requests: requests
		})
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
								<PageHeading title="Solicitações para participar" subtitle="Aceite ou recuse as solicitações para participar da transmissão por aqui" />
								<div className="row">
									<div className="col-xl-12">
										<CardBasic title="Solicitações de Participação">
											<div className="table-responsive">
												<table className="table table-bordered" width="100%" cellSpacing="0">
													<thead>
														<tr>
															<th>#</th>
															<th>Nome</th>
															<th>Motivo</th>
															<th>Status</th>
															<th>Aceitar</th>
															<th>Rejeitar</th>
														</tr>
													</thead>
													<tfoot>
														<tr>
															<th>#</th>
															<th>Nome</th>
															<th>Motivo</th>
															<th>Status</th>
															<th>Aceitar</th>
															<th>Rejeitar</th>
														</tr>
													</tfoot>
													<tbody>
														{ this.state.requests.map(request => this.renderRow(request) ) }
													</tbody>
												</table>
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

export default Dashboard;