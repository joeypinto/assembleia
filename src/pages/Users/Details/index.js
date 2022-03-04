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

class DetailUser extends Component {

	constructor(props) {
		super(props)

		this.state = {
            id: null,
			name: '',
			email: '',
			rf: '',
			cpf: '',
			tipo: 1
		}
	}

	componentDidMount() {
		document.getElementById('body').className = 'page-top'

        const userData = this.state

        const { match: { params } } = this.props;

		axios.get(`admin/users/${params.id}`, userData).then(response => {
            this.setState({ ...response.data.user[0] })
        })
	}

	render() {
		const { name, email, rf, cpf, tipo } = this.state
		return (
			<div>
				<div id="wrapper">
					<Sidebar />
					<div id="content-wrapper" className="d-flex flex-column">
						<div id="content">
							<Topbar />
							<div className="container-fluid">

								<PageHeading title="Usuários" subtitle="Gerencie os usuários do sistema." />

								<div className="row">
									<div className="col-xl-12">
										<CardBasic title="Detalhar Usuário">
                                            <div className="form-group">
                                                <label htmlFor="name">Nome</label>
                                                <input 
                                                    id="name" name="name" 
                                                    type="text" 
                                                    value={name}
                                                    onChange={(e) => this.setState({ name: e.target.value })}
                                                    required={true}
                                                    className="form-control bg-light border-0 small"
                                                    readOnly
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="name">Email</label>
                                                <input 
                                                    id="email" name="email" 
                                                    type="email" 
                                                    value={email}
                                                    onChange={(e) => this.setState({ email: e.target.value })}
                                                    required={true}
                                                    className="form-control bg-light border-0 small"
                                                    readOnly
                                                />
                                            </div>
                                                
                                            <div className="form-group">
                                                <label htmlFor="rf">RF</label>
                                                <input 
                                                    id="rf" name="rf" 
                                                    type="text" 
                                                    value={rf}
                                                    onChange={(e) => this.setState({ rf: e.target.value })}
                                                    required={true}
                                                    className="form-control bg-light border-0 small"
                                                    readOnly
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="cpf">CPF</label>
                                                <input 
                                                    id="cpf" name="cpf" 
                                                    type="text" 
                                                    value={cpf}
                                                    onChange={(e) => this.setState({ cpf: e.target.value })}
                                                    required={true}
                                                    className="form-control bg-light border-0 small"
                                                    readOnly
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="tipo">Tipo</label>
                                                <select
                                                    id="tipo" name="tipo" 
                                                    value={tipo}
                                                    onChange={(e) => this.setState({ tipo: e.target.value })}
                                                    required="" 
                                                    className="form-control bg-light border-0 small"
                                                    disabled
                                                >
                                                    <option value="1">Comum</option>
                                                    <option value="2">Admin</option>
                                                </select>
                                            </div>

                                            <div>
                                                <button onClick={() => this.props.history.push("/users")}  className="btn btn-default" type="submit">
                                                    Voltar
                                                </button>
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
				</a></div>
		)
	}
}

export default withRouter(DetailUser);