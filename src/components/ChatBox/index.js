import React, { Component } from 'react';
import Swal from 'sweetalert2';
import $ from 'jquery';

import axios from '../../services/axios';
import convertUTCDateTimeToBrazilianDateTime from '../../services/converter'


class ChatBox extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: this.props.messages
        }
    }

    renderMessages() {
        var messagesBuffer = []

        this.state.messages.forEach((message, i) => {
            console.log('renderMessages loop', message)
            if(message.type === 'participation_accepted'){
                messagesBuffer.push(
                    <div key={i} class="received_msg">
                        <p>
                            <a href={message.data.link} target="blank">Sua solicitação para participar da transmissão foi aceita, clique aqui para entrar</a>
                        </p>
                        <span>Mediador às {convertUTCDateTimeToBrazilianDateTime(message.data.created_at).split(" ")[1]}</span>
                    </div>
                )
            }

            if(message.type === 'new_research'){
                console.log("event data", message.data)
                const research = message.data.research

                if(research) {
                    var answeredResearches = localStorage.getItem("answeredResearches")
                    answeredResearches = answeredResearches ? JSON.parse(answeredResearches) : []
                    var researchInStorage = answeredResearches.find(e => e === research.id)

                    if(researchInStorage){
                        messagesBuffer.push(
                            <div className="received_form">
                                <form id={research.id} key={i}>
                                    <h5>{ research.name }</h5>

                                    Você respondeu a este questionário
                                </form>
                                <span>Mediador às {convertUTCDateTimeToBrazilianDateTime(message.data.event?.created_at).split(" ")[1]}</span>
                            </div>
                        )
                    } else {
                        const userId = this.props.userId
                        
                        var questionsBuffer = []
                        research.questions.forEach((question, i) => {
                        
                            //answers types ifs and renders
                            var answersBuffer = []
                            if(question.type === "text") {
                                answersBuffer.push(
                                    <div className="form-group">
                                        <textarea className="form-control" name={`text[${i}]`}required={question.required}></textarea>
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
                            <div className="received_form">
                                <form id={research.id} key={i}>
                                    <h5>{ research.name }</h5>

                                    { questionsBuffer }

                                    <button className="btn btn-primary" type="submit" onClick={ (e) => this.handleFormSubmit(e, research) }>Enviar Respostas</button>
                                </form>
                                <span>Mediador às {convertUTCDateTimeToBrazilianDateTime(message.data.event?.created_at).split(" ")[1]}</span>
                            </div>
                        )
                    }
                }
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
            //descobre o index que fica dentro do []
            var index = item.name.match(/(?<=\[).*?(?=\])/g)

            if(!answersArray[index]){
                answersArray[index] = {}
            }

            //remove [X] do nome
            var itemName = item.name.replace(/(?<=\[).*?(?=\])/gi, "").replace("[]", "")
            var itemValue = item.value

            //se for um checkbox de multipla escolha, ele vai agrupar todos valores research_question_option_id dentro de um array, tipo [36, 37].
            // Se não agrupar, rola um bug de sobreposição onde o ultimo valor sobrepõe o primeiro (para testar o que ocorre, basta comentar este bloco inteiro)
            if(itemName === 'research_question_option_id') {
                var checkedBoxes = $(`#${research.id} input[data-index="${index}"]:checked`)
        
                //se não tiver mais que um checkbox/radio daquele index, não será necessário nenhuma ação pois o bug nao ocorrerá
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

        //esse loop normaliza os dados para enviar pro servidor, removendo os arrays de research_question_option_id, e inserindo cada um como novo objeto dentro do answersArray
        answersArray.forEach((answer, i) => {
            if(Array.isArray(answer.research_question_option_id)) {

                answer.research_question_option_id.forEach(option => {
                    answersArray.push({ ...answer, research_question_option_id: option })
                })

                answersArray[i] = null
            }
        })

        //durante o processo acima, removemos o objeto de índice antigo trocando-o para nulo, aqui efetivamos a remoção
        var filtered = answersArray.filter(function (el) {
            return el != null;
        });

        axios.post('/associate/research', JSON.stringify(filtered)).then(() => {

            var answeredResearches = localStorage.getItem("answeredResearches")
            answeredResearches = answeredResearches ? JSON.parse(answeredResearches) : []
            answeredResearches.push(research.id)
            localStorage.setItem("answeredResearches", JSON.stringify(answeredResearches))

            this.setState({
                messages: this.state.messages
            })

            Swal.fire('OK', 'As respostas da enquete foram enviadas com sucesso', 'success')
        }).catch(err => {
            console.log(err)

            Swal.fire('Erro', 'Erro ao responder a enquete, verifique os campos e tente novamente', 'error')
        })
    }

    handleDisconnect() {
        //todo: disparar log de saída aqui
        
        localStorage.removeItem("authenticationToken")

        window.location = "/"
    }

    render() {
        return  <div className="card">
            <div className="card-header py-3" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h6 className="m-0 font-weight-bold text-primary">Chat</h6>

                <button onClick={() => this.handleDisconnect()} class="btn btn-light btn-icon-split">
                    <span class="icon text-gray-600">
                        <i class="fas fa-sign-out-alt"></i>
                    </span>
                    <span class="text">Desconectar</span>
                </button>
            </div>
            <div className="card-body" style={{height: "95vh", overflowY: "auto"}}>
                <button className="btn btn-primary btn-block" onClick={() => this.handleRequest()}>Pedir para participar</button>

                <hr/>
                
                <div class="received_msg">
                    <p>Mensagem de teste que será removida em breve</p>
                    <span>Moderador às { convertUTCDateTimeToBrazilianDateTime("2021-05-03T02:50:13.000Z").split(" ")[1] }</span>
                </div>

                { this.renderMessages() }
            </div>
        </div>
    }
}

export default ChatBox