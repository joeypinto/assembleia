import React, { Component } from 'react';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Navigation
// import Topbar from '../../components/Navigation/Topbar';


// import CardBasic from '../../components/Cards/Basic';
import VideoEmbed from '../../components/VideoEmbed';
import User from '../../services/user';
import axios from '../../services/axios';
import Swal from 'sweetalert2';
import ChatBox from '../../components/ChatBox';

const invitationInterval = 60000
const eventsInterval = 5000

class WatchLive extends Component {

    constructor(props) {
        super(props)

        this.state = {
            live: null,
            user: User.getData(),
            messages: [],
            messagesOffset: 0
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
        document.getElementsByTagName('body')[0].style.overflow = "hidden"

        var userId = this.state.user.id

        //Pooling para buscar a resposta do "Pedir para Participar"
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
        }, invitationInterval)

        //Pooling que recebe eventos, ex: novo questionário
        var eventsIntervalId = setInterval(() => {
            axios.get(`associate/events?offset=${this.state.messagesOffset}`).then(async (response) => {
				var events = response.data.participations
                if(events.length > 0){
                    var { messages } = this.state

                    var eL = events.length
                    var messagesOffset = events[eL - 1].id
                    
                    for(var i = 0; i <= (eL-1); i++) {
                        var { type, data } = events[i]

                        if(type === "new_research") {
                            data = await this.getResearch(data.research.id)
                            console.log("research data in foreach", data)
                        }

                        messages.push({
                            type: type,
                            data: data
                        })
                    }

                    console.log("final messages", messages)
                    this.setState({
                        messages: messages,
                        messagesOffset: messagesOffset
                    })
                }
			})
        }, eventsInterval)

        this.setState({
            intervalId: intervalId,
            eventsIntervalId: eventsIntervalId
        })
    }

    getResearch = async (id) => {
        try {
            var research = await axios.get(`/associate/research?id=${id}`)
        } catch(e) {
            console.log(e)

            research = null
        }

        return new Promise((resolve, reject) => {
            if(research === null) {
                reject(null)
            }

            resolve(research.data[0])
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
        clearInterval(this.state.eventsIntervalId)
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
            return <VideoEmbed src={this.state.live.url} width="100%" height="100vh"/>
        }
        
        return null
    }

    render() {
        return (
            <div>
                <div id="wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <div className="row">
                                <div className="col-xl-9 col-lg-8" style={{paddingRight: 0}}>
                                    { this.renderLive() }
                                </div>

                                <div className="col-xl-3 col-lg-4" style={{paddingLeft: 0}}>
                                    <ChatBox 
                                        messages={this.state.messages}
                                        userId={this.state.user.id}
                                    />
                                </div>     
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default WatchLive