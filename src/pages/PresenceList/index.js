import React, { Component } from 'react';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';

import CardBasic from '../../components/Cards/Basic';
import PageHeading from '../../components/PageHeading';

import axios from '../../services/axios';

import PresenceListComponent from '../../components/PresenceList'

class PresenceList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			precenseList: []
		}
	}

	componentDidMount() {
		document.getElementById('body').className = 'page-top'

		axios.get('admin/presence-list').then(result => {
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