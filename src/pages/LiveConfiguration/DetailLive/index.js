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
import ResearchesListComponent from '../../../components/Researches/List';
import PresenceListComponent from '../../../components/PresenceList';


import Swal from 'sweetalert2'

class LiveConfiguration extends Component {

	constructor(props) {
		super(props)

		this.state = {
            id: null,
			url: '',
			title: '',
			description: '',
			status: 0,
			user_id: User.getData().id,
            researches: [],
            precenseList: []
		}
	}

	componentDidMount() {
		document.getElementById('body').className = 'page-top'

        const { match: { params } } = this.props;

        axios.get(`/admin/live?id=${params.id}`).then(response => {
            if(response.data?.lives[0]){
                const live = response.data.lives[0]
                this.setState({
                    id: live.id,
                    url: live.url,
                    description: live.description,
                    title: live.title,
                    status: live.status
                })
            } else {
                alert("Não encontrado")
            }
		})

        axios.get('/admin/research').then(response => {
            this.setState({
                researches: response.data
            });
        }).catch(err => {
            console.log(err)

            Swal.fire('Erro', 'Erro ao listar as enquetes', 'error')
        })

        axios.get('admin/presence-list').then(result => {
			this.setState({
				precenseList: result.data.logs
			})
		})
	}

	handleBack = () => {
		this.props.history.push("/eventos")
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

								<PageHeading title="Detalhar Evento" subtitle="Dados gerais sobre um evento específico." />

                                <div className="row">
                                    <div className="col-md-12">
                                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Evento</a>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Enquetes</a>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Lista de Presença</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="myTabContent">
                                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <CardBasic title="Evento">
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
                                                                    disabled
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
                                                                    disabled
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
                                                                    disabled
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
                                                                    disabled
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
                                                        </div>
                                                    </div>						
                                                </CardBasic>
                                            </div>
                                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                <CardBasic title="Enquetes">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <ResearchesListComponent
                                                                researches={this.state.researches}
                                                                updateStateResearch={ (newState) => { this.setState({ researches: newState }) } }
                                                            />
                                                        </div>

                                                        <div className="col-md-12">
                                                            <button onClick={() => this.handleBack()}  className="btn btn-default" type="submit">
                                                                Voltar
                                                            </button>
                                                        </div>
                                                    </div>						
                                                </CardBasic>
                                            </div>
                                            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                                <CardBasic title="Lista de Presença">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <PresenceListComponent
                                                                presences={this.state.precenseList}
                                                            />
                                                        </div>

                                                        <div className="col-md-12">
                                                            <button onClick={() => this.handleBack()}  className="btn btn-default" type="submit">
                                                                Voltar
                                                            </button>
                                                        </div>
                                                    </div>						
                                                </CardBasic>
                                            </div>
                                        </div>
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

export default withRouter(LiveConfiguration);