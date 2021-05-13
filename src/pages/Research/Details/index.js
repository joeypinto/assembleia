import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

//Navigation
import Sidebar from '../../../components/Navigation/Sidebar'
import Topbar from '../../../components/Navigation/Topbar'

import CardBasic from '../../../components/Cards/Basic'
import PageHeading from '../../../components/PageHeading'
import axios from '../../../services/axios';

class DetailResearch extends Component {
    constructor(props) {
        super(props)

        var research = this.props.location?.state?.research

        if(!research){
            research = {
                name: "",
                status: false,
                questions: [
                    {
                        type: "radio",
                        title: "",
                        text: "",
                        required: true,
                        options: ["", ""]
                    }
                ]
            }
        }

        this.state = {
            research: research,
            answers: {}
        }
    }

    componentDidMount() {
        document.getElementById('body').className = 'page-top'

        const { match: { params } } = this.props;

        axios.get(`/admin/research/results?id=${params.id}`).then(response => {
            var { research } = this.state
            response.data.alternatives?.forEach(question => {
                const questionIndex = research.questions.findIndex(e => e.id === question.research_question_id)

                research.questions[questionIndex].options = question.options
            })

            response.data.dissertation?.forEach(question => {
                const questionIndex = research.questions.findIndex(e => e.id === question.research_question_id)

                research.questions[questionIndex].dissertations = question.answers
            })

            console.log('research after manipulate', research)

            this.setState({
                answers: response.data,
                research: research
            })
        })
    }

    renderTypeName(type){
        switch (type){
            case("radio"):
                return "Múltipla Escolha"
            case("text"):
                return "Texto"
            case("checkbox"):
                return "Caixa de Checagem"
            default:
                return 
        }
    }

    renderQuestions() {
        var questionsBuffer = []
        this.state.research.questions.map((question, i) => {
            questionsBuffer.push(
                <div key={`question-${question.id}`}>
                    <h6 className="font-weight-bold text-primary">Questão {i+1}</h6>
                   
                    <div className="row">
                        <div className="col-md-12">
                            <strong>Título: </strong> { question.title }
                        </div>

                        <div className="col-md-12">
                            <strong>Tipo: </strong> { this.renderTypeName(question.type) }
                        </div>

                        <div className="col-md-12">
                            <strong>Texto complementar:</strong> <br />
                            { question.text }
                        </div>

                        <div className="col-md-12">
                            <strong>Questão obrigatória? </strong>{ question.required ? "Sim" : "Não" }
                        </div>
                    </div>
   
                    { this.renderOptions(question, i) }

                    <hr />
                </div>
            )

            return questionsBuffer
        })

        return questionsBuffer
    }

    renderOptions(question) {
        var optionsBuffer = []
        
        if(question.type === "radio" || question.type === "checkbox"){

            optionsBuffer.push(
                <h6 key="h6" className="font-weight-bold text-primary mt-2">Opções e Números de Votos</h6>
            )

            question.options.map(option => {
                return optionsBuffer.push(
                    <div  key={`option-${option.id}`}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-10">
                                    { option.text } { option.number_of_votes ? ` - ${option.number_of_votes} usuários escolheram essa opção` : '' }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            optionsBuffer.push(
                <h6 key="h6" className="font-weight-bold text-primary mt-2">Respostas Dissertativas</h6>
            )    

            if(question.dissertations){
                question.dissertations.map(dissertation => {
                    return optionsBuffer.push(
                        <div className="row">
                            <div className="col-md-10 mb-2">
                                <div className="received_msg">
                                    <p>
                                        { dissertation }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        }

        return optionsBuffer
    }

    handleBack() {
        this.props.history.push('/enquete')
    }

    render() {
        return (
            <div>
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar />
                            <div className="container-fluid">

                                <PageHeading title="Enquetes" subtitle="Gerencie e veja os resultados das enquetes adicionadas" />

                                <div className="row">
                                    <div className="col-xl-12">
                                        <CardBasic title="Adicionar de Enquete">
                                            <div>
                                                <h6 className="font-weight-bold text-primary">Informações Gerais</h6>

                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <strong>Título: </strong> {this.state.research.name}
                                                    </div>

                                                    <div className="col-md-2">
                                                        <strong>Status: </strong> {this.state.research.status ? "Ativo" : "Inativo"}
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            { this.renderQuestions() }

                                            <div className="form-group">
                                                <button className="btn btn-success" onClick={() => this.handleBack()}>Voltar</button>
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
                </a>
            </div>
        )
    }
}

export default withRouter(DetailResearch);