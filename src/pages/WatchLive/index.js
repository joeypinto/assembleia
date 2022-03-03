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

import firebaseApp from "../../services/firebase";

import {
    getDatabase,
    ref,
    onValue,
    set,
    remove,
    update,
    push,
    child,
  } from "firebase/database";

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
        
        const db = getDatabase();
        
        document.getElementsByTagName('body')[0].style.overflow = "hidden"
        document.getElementById('body').className = 'page-top'
        
        var userId = this.state.user.id

        window.addEventListener('resize', this.handleResize);
        this.setWindowDimensions(this.getWindowDimensions())

        const response = await axios.get(`/associate/live?user_id=${userId}`).catch(err => {
            console.log(err)

            Swal.fire('Erro', 'Um erro inesperado ocorreu enquanto abríamos a live, tente novamente mais tarde', 'error')
        })
        console.log(response)
        this.setState({
            live: response.data.live
        })

        // //Pooling para buscar a resposta do "Pedir para Participar"
        // var intervalId = setInterval(() => {
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
        // }, invitationInterval)

        //Pooling que recebe eventos, ex: novo questionário
        // var eventsIntervalId = setInterval(() => {
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
                        
                        // console.log("research data in foreach", data)

                    }

                    if(type === "finished_research") {
                        insertAnsweredResearchInStorage(data.research.id)
                    }

                    messages.push({
                        type: type,
                        data: data
                    })
                }

                // console.log("final messages", messages)
                this.setState({
                    messages: messages,
                    messagesOffset: messagesOffset
                })
            }
        }).finally(() => {
            var { messages } = this.state
            console.log(messages)
            const idsPa = messages.map(({data}) => data.type === "participation_accepted" ? data.id.toString() : null)
            const idsRk = messages.map(({data}) => data.type === "new_research" ? data.research.id.toString() : null)
            console.log(idsRk)
            console.log(idsPa)
            onValue(ref(db, `/lives/${response.data.live.id}/researches`), (snapshot) => {

                const data = snapshot.val();

                var rks = data ? Object.keys(data) : null
                if(!rks) return
                // if(!messages.length) return

                for(const rk of rks) {
                    if (idsRk.includes(rk)) {
                        continue    
                    }
                    console.log(data[rk])
                    if (data[rk].research.status.status) {
                        console.log("add pergunta na lista")
                        messages.push({
                            type: data[rk].research.status.status,
                            data: data[rk]
                        })
                    }
                }

                this.setState({
                    messages: messages
                })
            });

            onValue(ref(db, `/lives/${response.data.live.id}/invitation/${userId}`), (snapshot) => {
                const data = snapshot.val();
                var pas = data;
                if(!pas) return
                console.log(pas)
                console.log(idsPa)
                if (idsPa.length === 0) {
                    if (pas.link) {
                        messages.push({
                            type: "participation_accepted",
                            data: pas
                        })
                    }
                }
                this.setState({
                    messages: messages
                })
            });
        })

        // }, eventsInterval)

        // this.setState({
        //     intervalId: intervalId,
        //     eventsIntervalId: eventsIntervalId
        // })
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
        // clearInterval(this.state.intervalId)
        // clearInterval(this.state.eventsIntervalId)
    }

    renderLive() {
        if(this.state.live){

            var videoHeight = '100vh'

            // console.log("video changing window width", this.state.windowWidth)
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