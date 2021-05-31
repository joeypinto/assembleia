import React, { Component } from 'react';

//Navigation
import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';

import CardInfo from '../../components/Cards/Info';
import ChartDonut from '../../components/Charts/Donut';
import ChartLine from '../../components/Charts/Line';
import PageHeading from '../../components/PageHeading';
import axios from '../../services/axios';

class Dashboard extends Component {

	constructor(props) {
		super(props)

		this.state = {
			users: '0',
			participations: '0',
			transmissoes: '0',
			researches: '0',
			answers: []
		}
	}

	componentDidMount() {
		document.getElementById('body').className = 'page-top'

		axios.get('admin/dashboard').then(response => {
			console.log('response data', response.data.users)
			this.setState({ 
				...response.data
			})
		})
	}

	renderBasicShapeForChart() {
		return (
			<div>Carregando informações</div>
		)
	}

  render() {
	const { users, participations, transmissoes, researches, answers } = this.state
    return (
		<div>
			<div id="wrapper">
				<Sidebar />
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<Topbar />
						<div className="container-fluid">
							<PageHeading title="Dashboard" />
							<div className="row">
								<CardInfo title="Usuários Ativos"
								icon="user"
								color="primary"
								value={users} />

								<CardInfo title="Transmissões Feitas"
								icon="video"
								color="info"
								value={transmissoes} />

								<CardInfo title="Pedidos de Participação"
								icon="user-friends"
								color="success"
								value={participations} />

								<CardInfo title="Enquetes"
								icon="user-friends"
								color="warning"
								value={researches} />
							</div>
							<div className="row">
								{/* <div className="col-xl-8 col-lg-6">
								<ChartLine />
								</div> */}
								<div className="col-xl-4 col-lg-6">
									{ answers[0] ? <ChartDonut questionData={answers[0]}/> : this.renderBasicShapeForChart() }
								</div>

								<div className="col-xl-4 col-lg-6">	
									{ answers[1] ? <ChartDonut questionData={answers[1]}/> : this.renderBasicShapeForChart() }
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