import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import User from '../../services/user';
import { unAuthenticatedAxiosInstance as axios } from './../../services/axios'

class SignIn extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cpf: "",
			rf: ""
		}
	}

	componentWillMount() {
		document.getElementById('body').className = 'bg-gradient-primary'
	}

	handleLogin = () => {
		axios.post("login", { ...this.state }).then(response => {
			console.log("login response is", response);
			localStorage.setItem('authenticationToken', response.data.token)

			let redirectRoute = "/watch"

			if(User.resolveToken(response.data.token).tipo === 2) {
				redirectRoute = "/dashboard"
			}

			this.props.history.push(redirectRoute)
			
		}).catch(err => {
			console.error("error login", err)
		});
	}

	render() {
		const { rf, cpf } = this.state;

		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-xl-6 col-lg-6 col-md-9">
						<div className="card o-hidden border-0 shadow-lg my-5">
							<div className="card-body p-0">
								<div className="row">
									<div className="col-lg-12">
										<div className="p-5">
											<hr />
											<div className="text-center">
												<h1 className="h4 text-gray-900 mb-4">Bem vindo!</h1>
											</div>
											<form onSubmit={this.handleSignIn} className="user">
												<div className="form-group">
													<input
														type="text"
														className="form-control form-control-user"
														id="inputRF"
														placeholder="RF"
														value={rf}
														onChange={(e) => this.setState({ rf: e.target.value })}
													/>
												</div>
												<div className="form-group">
													<input
														type="text"
														className="form-control form-control-user"
														id="inputCPF"
														placeholder="CPF"
														value={cpf}
														onChange={(e) => this.setState({ cpf: e.target.value })}
													/>
												</div>
												<button onClick={() => this.handleLogin()} type="button" className="btn btn-primary btn-user btn-block">
													Entrar
                            					</button>
												<hr />
											</form>
											<div className="text-center">
												<a className="small" href="forgot-password.html">Problemas para acessar? Clique aqui</a>
											</div>
											{/* <div className="text-center">
												<Link className="small" to="/signup">Create an Account!</Link>
											</div> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(SignIn);