import React, { Component } from 'react';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';

import CardBasic from '../../components/Cards/Basic';
import PageHeading from '../../components/PageHeading';

import axios from '../../services/axios';
import Swal from 'sweetalert2'
import PresenceListComponent from '../../components/PresenceList'

class PresenceList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			precenseList: [],
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
    handleEventChange = async (event) => {
        if(!this.state.selectedEvent){
            Swal.fire("Atenção", "Você deve selecionar um evento antes de filtrar", "warning")
            return
        }

			if(!this.state.selectedEvent){
				Swal.fire("Atenção", "Você deve selecionar um evento antes de filtrar", "warning")
				return
			}	
		
		axios.get('admin/presence-list?live_id='+this.state.selectedEvent).then(result => {
			this.setState({
				precenseList: result.data.logs
			})
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
								<PageHeading title="Lista de presença" subtitle="Lista de presença dos associados que entraram para ver a transmissão" />
								<div className="row">
									<div className="col-xl-12">
										<CardBasic title="Lista de presença">
										<form class="form-inline">
                                                <div class="form-group mx-sm-3 mb-2">
                                                    <label for="inputSelectLive" class="sr-only">Selecione o evento</label>
                                                    <select class="form-control" id="inputSelectLive" placeholder="Selecione o evento" onChange={(e) => this.setState({ selectedEvent: e.target.value })}>
                                                        <option>Selecione um evento para ver suas enquetes</option>
                                                        { this.state.lives.map(live => <option value={live.id}>{live.id} - {live.title}</option>) }
                                                    </select>
                                                </div>
                                                <button type="button" onClick={() => this.handleEventChange()} class="btn btn-primary mb-2">Procurar enquetes do evento</button>
                                            </form>
                                            <hr />
											<PresenceListComponent
												presences={this.state.precenseList}
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

export default PresenceList;