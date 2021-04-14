import React, { Component } from 'react';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';

import CardBasic from '../../components/Cards/Basic';
import PageHeading from '../../components/PageHeading';
import VideoEmbed from '../../components/VideoEmbed';
import axios from '../../services/axios';

class LiveConfiguration extends Component {

	constructor(props) {
		super(props)

		this.state = {
			actualTransmission: {
				url: null
			},
			url: '',
			user_id: 2
		}
	}

	componentWillMount() {
		document.getElementById('body').className = 'page-top'

		axios.get('/admin/live').then(response => {
			this.setState({
				actualTransmission: response.data.live
			})
		})
	}

	handleCreateLive = () => {
		axios.post('admin/live', { url: this.state.url, user_id: this.state.user_id}).then(success => {
			alert('Live configurada com sucesso');

			this.setState({
				actualTransmission: {
					url: this.state.url
				},
				url: ''
			})
		}).catch(error => {
			console.log(error)
			console.log(error.message)
			alert('Erro ao configurar a live')
		})
		
	}

	render() {
		const { url } = this.state
		return (
			<div>
				<div id="wrapper">
					<Sidebar />
					<div id="content-wrapper" className="d-flex flex-column">
						<div id="content">
							<Topbar />
							<div className="container-fluid">

								<PageHeading title="Configurações da Transmissão" subtitle="Altere por aqui o código de incorporação de transmissão no site." />

								<div className="row">
									<div className="col-xl-12">
										<CardBasic title="Configurações da Transmissão">
											<div className="input-group">
												<input 
													id="url" name="url" 
													type="text" 
													value={url}
													onChange={(e) => this.setState({ url: e.target.value })}
													required="" 
													className="form-control bg-light border-0 small" 
													placeholder="Cole aqui o link da transmissão do youtube, exemplo: https://www.youtube.com/embed/dQw4w9WgXcQ" 
													aria-label="Cole aqui o link de transmissão do youtube" 
												/>
												<div className="input-group-append">
													<button onClick={() => this.handleCreateLive()}  className="btn btn-primary" type="submit">
														Salvar
                                  					</button>
												</div>
											</div>
										</CardBasic>

										<CardBasic title="Transmissão atual">
											<VideoEmbed src={this.state.actualTransmission.url} width="100%"/>
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

export default LiveConfiguration;