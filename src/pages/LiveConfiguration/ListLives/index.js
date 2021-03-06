import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';

import CardBasic from '../../../components/Cards/Basic';
import PageHeading from '../../../components/PageHeading';
import axios from '../../../services/axios';

import convertUTCDateTimeToBrazilianDateTime from '../../../services/converter'

import Swal from 'sweetalert2'

//todo: trazer lista do server
class ListLives extends Component {

	constructor(props) {
		super(props)

		this.state = {
			lives: []
		}
	}

	componentDidMount() {
		document.getElementById('body').className = 'page-top'

		axios.get('/admin/live').then(response => {
			this.setState({
				lives: response.data.lives
			})
		})
	}

    redirectToNew = () => {
        this.props.history.push("/eventos/novo")
    }

	handleEdit(id) {
		this.props.history.push(`/eventos/${id}/editar`)
	}

	handleDetails(id) {
		this.props.history.push(`/eventos/${id}`)
	}

	renderRows() { 
		var livesBuffer = []
		if(this.state.lives){
			this.state.lives.map(live => {
				
				var liveUrl = live.url ? live.url.match(/[\w-]{11,}/) : ''
				liveUrl = liveUrl ? liveUrl[0] : ''

				return livesBuffer.push(
					<tr key={live.id}>
						<td>
							<img src={`https://img.youtube.com/vi/${liveUrl}/hqdefault.jpg`} alt="YT Thumb" width="200" />
						</td>
						<td>
							<strong>{live.title}</strong>
							<p style={{color: "rgba(0,0,0,0.4)"}}>
								{ live.description }
							</p>
						</td>
						<td>
							{ convertUTCDateTimeToBrazilianDateTime(live.created_at) }
						</td>
						<td>{ live.status ? "Ativa" : "Inativa" }</td>
						<td>
							<button className="btn btn-primary" onClick={() => this.handleDetails(live.id)}>
								Ver
							</button>
						</td>
						<td>
							<button className="btn btn-primary" onClick={() => this.handleEdit(live.id)}>
								Editar
							</button>
						</td>
						<td>
							<button className="btn btn-danger" onClick={() => Swal.fire("Ainda n??o implementado")}>
								Desativar
							</button>
						</td>
					</tr>
				)
			})
		}

		return livesBuffer
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

								<PageHeading title="Listagem de Eventos" subtitle="Listagem e hist??rico dos eventos j?? cadastrados" />

								<div className="row">
									<div className="col-xl-12">
										<CardBasic title="Listagem de Eventos">
                                            <button onClick={() => this.redirectToNew()} className="btn btn-success mb-2">Adicionar Evento</button>
                                            <div className="table-responsive">
												<table className="table table-bordered" width="100%" cellSpacing="0">
													<thead>
														<tr>
                                                            <th width="200">Thumb</th>
															<th width="600">T??tulo</th>
															<th>Data e Hora</th>
															<th>Status</th>
															<th>Ver</th>
															<th>Editar</th>
															<th>Desativar</th>
														</tr>
													</thead>
													<tfoot>
														<tr>
                                                        	<th>Thumb</th>
															<th>T??tulo</th>
															<th>Data e Hora</th>
															<th>Status</th>
															<th>Ver</th>
															<th>Editar</th>
															<th>Desativar</th>
														</tr>
													</tfoot>
													<tbody>
														{ this.renderRows() }
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
									<span>Copyright &copy; Sinpeem 2022</span>
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

export default withRouter(ListLives);