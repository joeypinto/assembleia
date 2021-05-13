import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';

class Sidebar extends Component {

	render() {
		const { clickMenuOpen, toggled } = this.props;
		return (
			<ul className={toggled ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled' : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'} id="accordionSidebar">

				{/* <!-- Sidebar - Brand --> */}
				<a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
					<div className="sidebar-brand-icon rotate-n-15">
						<i className="fas fa-laugh-wink"></i>
					</div>
					<div className="sidebar-brand-text mx-3">Admin</div>
				</a>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider my-0" />

				{/* <!-- Nav Item - Dashboard --> */}
				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">
						<i className="fas fa-fw fa-tachometer-alt"></i>
						<span>Dashboard</span>
					</Link>
				</li>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider" />

				{/* <!-- Heading --> */}
				<div className="sidebar-heading">
					Interações
        		</div>

				{/* <!-- Nav Item - Pages Collapse Menu --> */}
				<li className="nav-item">
					<Link className='nav-link' to="/participacoes">
						<i className="fas fa-fw fa-user-friends"></i>
						<span>Participações</span>
					</Link>
				</li>

				<li className="nav-item">
					<Link className='nav-link' to="/enquete">
						<i className="fas fa-fw fa-user-friends"></i>
						<span>Enquetes</span>
					</Link>
				</li>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider" />

				{/* <!-- Heading --> */}
				<div className="sidebar-heading">
					Configurações
        		</div>

				{/* <!-- Nav Item - Charts --> */}
				<li className="nav-item">
					<Link className="nav-link" to="/lives">
						<i className="fas fa-fw fa-video"></i>
						<span>Configurações da Live</span>
					</Link>
				</li>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider" />

				{/* <!-- Heading --> */}
				<div className="sidebar-heading">
					Registros
        		</div>

				{/* <!-- Nav Item - Charts --> */}
				<li className="nav-item">
					<Link className="nav-link" to="/logs">
						<i className="fas fa-fw fa-chart-area"></i>
						<span>Logs</span>
					</Link>
				</li>

				{/* <!-- Nav Item - Tables --> */}
				<li className="nav-item">
					<a className="nav-link" href="/lista-de-presenca">
						<i className="fas fa-fw fa-table"></i>
						<span>Lista de Presença</span>
					</a>
				</li>

				{/* <!-- Divider --> */}
				<hr className="sidebar-divider d-none d-md-block" />

				{/* <!-- Sidebar Toggler (Sidebar) --> */}
				<div className="text-center d-none d-md-inline">
					<button onClick={() => { clickMenuOpen() }} className="rounded-circle border-0" id="sidebarToggle"></button>
				</div>

			</ul>
		)
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = store => ({
	toggled: store.menuState.menuOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);