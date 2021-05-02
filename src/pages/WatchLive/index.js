import React, { Component } from 'react';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import $ from 'jquery';

//Navigation
import Topbar from '../../components/Navigation/Topbar';


import CardBasic from '../../components/Cards/Basic';
import VideoEmbed from '../../components/VideoEmbed';
import User from '../../services/user';
import axios from '../../services/axios';
import Swal from 'sweetalert2';

const invitationInterval = 60000

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
        }, invitationInterval)

        this.addResearchMock()

        this.setState({intervalId: intervalId})
    }

    addResearchMock() {
        var mock = {
            "id": 67,
            "name": "Pesquisa de Satisfação",
            "status": 1,
            "created_at": "2021-03-25T21:37:47.000Z",
            "questions": [
                {
                    "id": 105,
                    "type": "radio",
                    "title": "Baseado nas suas experiências escolha",
                    "text": "aqui pode textão",
                    "required": 1,
                    "options": [
                        {
                            "id": 33,
                            "text": "A"
                        },
                        {
                            "id": 34,
                            "text": "B"
                        },
                        {
                            "id": 35,
                            "text": "C"
                        },
                        {
                            "id": 36,
                            "text": "D"
                        }
                    ]
                },
                {
                    "id": 106,
                    "type": "text",
                    "title": "Descreva com palavras",
                    "text": "",
                    "required": 1
                },
                {
                    "id": 107,
                    "type": "checkbox",
                    "title": "Escolha mais de uma opção a seu desejo",
                    "text": "",
                    "required": 0,
                    "options": [
                        {
                            "id": 37,
                            "text": "A"
                        },
                        {
                            "id": 38,
                            "text": "B"
                        },
                        {
                            "id": 39,
                            "text": "C"
                        },
                        {
                            "id": 40,
                            "text": "D"
                        }
                    ]
                }
            ]
        }

        var { messages } = this.state

        messages.push({
            type: "new_research",
            data: mock
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
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
        
        this.state.messages.forEach((message, i) => {
            if(message.type === 'participation_accepted'){
                messagesBuffer.push(
                    <div key={i}>
                        <strong>Admin: </strong> <a href={message.data.link} target="blank">sua solicitação para participar da transmissão foi aceita, clique aqui para entrar</a>
                    </div>
                )
            }

            if(message.type === 'new_research'){
                const research = message.data
                const userId = this.state.user.id
                
                var questionsBuffer = []
                research.questions.forEach((question, i) => {
                
                    //answers types ifs and renders
                    var answersBuffer = []
                    if(question.type === "text") {
                        answersBuffer.push(
                            <div>
                                <textarea name={`text[${i}]`}required={question.required}></textarea>
                            </div>
                        )
                    } else if(question.type === "radio") {
                        question.options.forEach(option => {
                            answersBuffer.push(
                                <div key={option.id}>
                                    <label>
                                        <input name={`research_question_option_id[${i}]`} data-index={i} type="radio" value={ option.id } required={question.required} /> { option.text }
                                    </label>
                                </div>
                            )
                        })
                    } else if (question.type === "checkbox") {
                        question.options.forEach(option => {
                            answersBuffer.push(
                                <div key={option.id}>
                                    <label>
                                        <input name={`research_question_option_id[${i}]`} data-index={i} type="checkbox" value={ option.id } /> { option.text }
                                    </label>
                                </div>
                            )
                        })
                    }

                    //questions render block
                    questionsBuffer.push(
                        <div key={question.id}>
                            <strong>{ i + 1 }</strong>. { question.title }
                            <p>{ question.text }</p>

                            { answersBuffer }
                            <input type="hidden" name={`research_id[${i}]`} value={research.id} />
                            <input type="hidden" name={`user_id[${i}]`} value={userId} />
                            <input type="hidden" name={`research_question_id[${i}]`} value={question.id} />
                        </div>
                    )
                })

                //research block render
                messagesBuffer.push(
                    <form id={research.id} key={i}>
                        <h1>{ research.name }</h1>

                        { questionsBuffer }

                        <button type="submit" onClick={ (e) => this.handleFormSubmit(e, research) }>Go</button>
                        <hr />
                    </form>
                )
            }
        })
        
        return messagesBuffer
    }

    handleFormSubmit(e, research){
        e.preventDefault()

        var form = document.getElementById(research.id);
        var formStatus = form.checkValidity();
        form.reportValidity()

        if(!formStatus){
            //Swal.fire("Informação Pendentes", "Preencha corretamente as informações do formulário antes de prosseguir", "warning")
            
            return
        }

        var answersArray = []

        $(`#${research.id}`).serializeArray().forEach(item => {
            //discover the index of the question
            var index = item.name.match(/(?<=\[).*?(?=\])/g)

            //if not created, create the index in the answersArray array
            if(!answersArray[index]){
                answersArray[index] = {}
            }

            //remove [?] from the name
            var itemName = item.name.replace(/(?<=\[).*?(?=\])/gi, "").replace("[]", "")
            var itemValue = item.value

            if(itemName === 'research_question_option_id') {
                var checkedBoxes = $('input[data-index="'+index+'"]:checked')
        
                if(checkedBoxes.length > 1){
                    var values = []
                    
                    checkedBoxes.each(function(){                    
                        values.push($(this).val())
                    })

                    itemValue = values
                }
            }

            answersArray[index][itemName] = itemValue
        })

        console.log("answers is", answersArray)

        var filtered = answersArray.filter(function (el) {
            return el != null;
        });

    //     console.log("stgringified and filtered now", filtered, JSON.stringify(filtered))
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