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
import User from '../../../services/user';

import Swal from 'sweetalert2'

class LiveConfiguration extends Component {

	

	constructor(props) {
		super(props)

		this.state = {
			url: '',
			title: '',
			description: '',
			status: 0,
			user_id: User.getData().id
		}
	}

	componentDidMount() {
		document.getElementById('body').className = 'page-top'
	}

	handleBack = () => {
		this.props.history.push("/eventos")
	}

	handleCreateLive = async () => {
		const { url, title, status, description, user_id } = this.state

		axios.post('admin/live', { 
			url: url, 
			title: title,
			description: description, 
			status: status,
			user_id: user_id
		}).then(success => {
			Swal.fire({
				icon: 'success',
				title: 'Sucesso',
				text: 'Link da transmissão alterado com sucesso',
			  })

			  this.props.history.push("/eventos")
		}).catch(error => {
			console.log(error)
			console.log(error.message)
			
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Erro ao alterar o link da live'
			})
		})
		
	}

	render() {
		const { url, title, status, description } = this.state
		return (
			<div>
				<div id="wrapper">
					<Sidebar />
					<div id="content-wrapper" className="d-flex flex-column">
						<div id="content">
							<Topbar />
							<div className="container-fluid">

								<PageHeading title="Configurações de Eventos" subtitle="Altere por aqui o código de incorporação de transmissão no site." />

								<div className="row">
									<div className="col-xl-12">
										<CardBasic title="Configurações de Eventos">
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label htmlFor="url">Link</label>
														<input 
															id="url" name="url" 
															type="text" 
															value={url}
															onChange={(e) => this.setState({ url: e.target.value })}
															required="" 
															className="form-control bg-light border-0 small" 
															placeholder="Cole aqui o link da transmissão do youtube, exemplo: https://www.youtube.com/embed/dQw4w9WgXcQ"
														/>
													</div>
												</div>

												<div className="col-md-12">
													<div className="form-group">
														<label htmlFor="title">Título</label>
														<input 
															id="title" name="title" 
															type="text" 
															value={title}
															onChange={(e) => this.setState({ title: e.target.value })}
															required="" 
															className="form-control bg-light border-0 small" 
															placeholder="Escreva o título do seu evento"
														/>
													</div>
												</div>

												<div className="col-md-12">
													<div className="form-group">
														<label htmlFor="description">Descrição</label>
														<input 
															id="description" name="description" 
															type="text" 
															value={description}
															onChange={(e) => this.setState({ description: e.target.value })}
															required="" 
															className="form-control bg-light border-0 small" 
															placeholder="Descrição, ou texto complementar ao título do evento"
														/>
													</div>
												</div>

												<div className="col-md-12">
													<div className="form-group">
														<label htmlFor="status">Status</label>
														<select
															id="status" name="status" 
															value={status}
															onChange={(e) => this.setState({ status: e.target.value })}
															required="" 
															className="form-control bg-light border-0 small"
														>
															<option value="0">Inativa</option>
															<option value="1">Ativa</option>
														</select>
													</div>
												</div>

												<div className="col-md-12">
													<button onClick={() => this.handleBack()}  className="btn btn-default" type="submit">
														Voltar
													</button>
													<button onClick={() => this.handleCreateLive()}  className="btn btn-primary" type="submit">
														Salvar
													</button>
												</div>
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
				</a></div>
		)
	}
}

export default withRouter(LiveConfiguration);