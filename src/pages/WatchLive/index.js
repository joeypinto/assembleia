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

import { insertAnsweredResearchInStorage } from '../../services/research'

//Segundos convertidos em milisegundos
const invitationInterval = 10 * 1000
const eventsInterval = 10 * 1000

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

    async componentDidMount() {
        document.getElementsByTagName('body')[0].style.overflow = "hidden"
        document.getElementById('body').className = 'page-top'

        var userId = this.state.user.id

        window.addEventListener('resize', this.handleResize);
        this.setWindowDimensions(this.getWindowDimensions())

        const response = await axios.get(`/associate/live?user_id=${userId}`).catch(err => {
            console.log(err)

            Swal.fire('Erro', 'Um erro inesperado ocorreu enquanto abríamos a live, tente novamente mais tarde', 'error')
        })

        this.setState({
            live:response.data.live
        })

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
            axios.get(`associate/events?offset=${this.state.messagesOffset}&live_id=${this.state.live.id}`).then(async (response) => {
				var events = response.data.participations
                if(events.length > 0){
                    var { messages } = this.state

                    var eL = events.length
                    var messagesOffset = events[eL - 1].id
                    
                    for(var i = 0; i <= (eL-1); i++) {
                        var { type, data } = events[i]

                        if(type === "new_research") {
                            const research = await this.getResearch(data.research.id)
                            
                            data = {
                                event: events[i],
                                research: research
                            }
                            
                            console.log("research data in foreach", data)
                        }

                        if(type === "finished_research") {
                            insertAnsweredResearchInStorage(data.research.id)
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

    renderLive() {
        if(this.state.live){

            var videoHeight = '100vh'

            console.log("video changing window width", this.state.windowWidth)
            if(this.state.windowWidth <= 576 ){
                videoHeight = 200
            }

            if(this.state.windowWidth > 576 && this.state.windowWidth <= 992){
                videoHeight = 400
            }

            return <VideoEmbed src={this.state.live.url} width="100%" height={videoHeight}/>
        }
        
        return null
    }

    handleResize = () => {
        this.setWindowDimensions(this.getWindowDimensions())
    }

    setWindowDimensions = ({width, height}) => {
        this.setState({
            windowHeight: height,
            windowWidth: width
        })
    }

    getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    render() {
        return (
            <div>
                <div id="wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <div className="row">
                                <div className="col-xl-9 col-lg-8 col-sm-12" style={{paddingRight: 0}}>
                                    { this.renderLive() }
                                </div>

                                <div className="col-xl-3 col-lg-4 col-sm-12" style={{paddingLeft: 0}}>
                                    <ChatBox 
                                        messages={this.state.messages}
                                        userId={this.state.user.id}
                                        live={this.state.live}
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