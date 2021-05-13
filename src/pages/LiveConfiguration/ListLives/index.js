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

import Swal from 'sweetalert2'

class ListLives extends Component {

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

								<PageHeading title="Listagem de Transmissões" subtitle="Listagem e histórico das transmissões já cadastradas" />

								<div className="row">
									<div className="col-xl-12">
										<CardBasic title="Listagem de Transmissões">
                                            <button onClick={() => this.redirectToNew()} className="btn btn-success mb-2">Adicionar Transmissão</button>
                                            <div className="table-responsive">
												<table className="table table-bordered" width="100%" cellSpacing="0">
													<thead>
														<tr>
                                                            <th width="200">Thumb</th>
															<th>Título</th>
															<th>Data e Hora</th>
															<th>Status</th>
															<th>Editar</th>
															<th>Desativar</th>
														</tr>
													</thead>
													<tfoot>
														<tr>
                                                        <th>Embed</th>
															<th>Título</th>
															<th>Data e Hora</th>
															<th>Status</th>
															<th>Editar</th>
															<th>Desativar</th>
														</tr>
													</tfoot>
													<tbody>
														<tr>
                                                            <td>
                                                                <img src={`https://img.youtube.com/vi/${this.state.actualTransmission.url ? this.state.actualTransmission.url.match(/[\w\-]{11,}/)[0] : ''}/hqdefault.jpg`} alt="YT Thumb" width="200" />
                                                            </td>
                                                            <td>
                                                                Live de teste
                                                            </td>
                                                            <td>13/05/2021 00:02</td>
                                                            <td>Ativa</td>
                                                            <td>Editar</td>
                                                            <td>Desativar</td>
                                                        </tr>
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

export default withRouter(ListLives);