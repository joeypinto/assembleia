import React, { Component } from 'react';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Navigation
import Topbar from '../../components/Navigation/Topbar';


import CardBasic from '../../components/Cards/Basic';
import VideoEmbed from '../../components/VideoEmbed';
import User from '../../services/user';
import axios from '../../services/axios';
import Swal from 'sweetalert2';

class WatchLive extends Component {

    constructor(props) {
        super(props)

        this.state = {
            live: null,
            user: User.getData(),
            messages: []
        }
    }

    componentWillMount() {
        document.getElementById('body').className = 'page-top'

        axios.get(`/associate/live?user_id=${this.state.user.id}`).then(response => {
            this.setState({
                live: response.data.live
            })
        }).catch(err => {
            console.log(err)

            Swal.fire('Erro', 'Um erro inesperado ocorreu enquanto abríamos a live, tente novamente mais tarde', 'error')
        })
    }

    componentDidMount() {
        document.getElementsByTagName('nav')[0].classList.remove('mb-4')

        var userId = this.state.user.id

        var intervalId = setInterval(() => {
            axios.get(`associate/invitation?user_id=${userId}`).then((response) => {
				if(response.data.participation){
                    var { messages } = this.state
                    
                    messages.push({
                        type: "participation_accepted",
                        data: response.data.participation
                    })

                    this.setState({
                        messages: messages
                    })
                }
			})
        }, 30000)

        this.setState({intervalId: intervalId})
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);   
    }

    handleRequest = () => {
        Swal.fire({
            title: 'Deseja solicitar participação?',
            text: 'Descreva suscintamente o motivo da sua solicitação',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            preConfirm: async (description) => {
                try{
                    return await axios.post('/associate/invitation', {
                        user_id: this.state.user.id,
                        description: description
                    })
                } catch(e) {
                    console.log('erro na request', e);
                    Swal.fire('Erro', 'Erro ao solicitar participação', 'error')
                    return false
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('OK', 'Sua solicitação foi enviada, aguarde o retorno', 'success')
            }
        })
    }

    renderLive() {
        if(this.state.live){
            return <VideoEmbed src={this.state.live.url} width="100%"/>
        }
        
        return null
    }

    renderMessages() {
        var messagesBuffer = []
        
        this.state.messages.map(message => {
            if(message.type === 'participation_accepted'){
                messagesBuffer.push(
                    <div>
                        <strong>Admin: </strong> <a href={message.data.link} target="blank">sua solicitação para participar da transmissão foi aceita, clique aqui para entrar</a>
                    </div>
                )
            }
        })
        
        return messagesBuffer
    }

    render() {
        return (
            <div>
                <div id="wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar />

                            <div className="row">
                                <div className="col-xl-9 col-lg-8" style={{paddingRight: 0}}>
                                    { this.renderLive() }
                                </div>

                                <div className="col-xl-3 col-lg-4" style={{paddingLeft: 0}}>
                                    <CardBasic title="Chat">
                                        <button className="btn btn-primary btn-block" onClick={() => this.handleRequest()}>Pedir para participar</button>

                                        <hr/>

                                        { this.renderMessages() }
                                    </CardBasic>
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

export default WatchLive