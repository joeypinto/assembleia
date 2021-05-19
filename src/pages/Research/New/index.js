import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from '../../../services/axios'

//Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';

import CardBasic from '../../../components/Cards/Basic';
import PageHeading from '../../../components/PageHeading';
import Swal from 'sweetalert2';

class NewResearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            research: {
                name: "",
                live_id: "",
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
            },
            lives: []
        }
    }
    
    componentWillMount() {
        document.getElementById('body').className = 'page-top'
    }

    componentDidMount() {
        axios.get('/admin/live').then(response => {
			this.setState({
				lives: response.data.lives
			})
		})
    }

    handleResearchInput(event) {
        const target = event.target
        var attribute = target.name

        var research = this.state.research

        research[attribute] = target.type === 'checkbox' ? target.checked : target.value

        this.setState({
            research: research
        })
    }

    renderQuestions() {
        var questionsBuffer = []
        this.state.research.questions.map((question, i) => {
            questionsBuffer.push(
                <div key={i}>
                    <h6 className="font-weight-bold text-primary">Questão {i+1}</h6>

                    <div className="form-group">
                        <input 
                            type="text" 
                            name="title"
                            className="form-control"
                            placeholder="Título da pergunta"
                            value={question.title} 
                            question={i}
                            onChange={(event) => this.handleQuestionInput(event)}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="text" 
                            name="text"
                            className="form-control"
                            placeholder="Descrição opcional"
                            value={question.text} 
                            question={i}
                            onChange={(event) => this.handleQuestionInput(event)}
                        />
                    </div>

                    <div className="form-group">
                        <select
                            name="type"
                            className="form-control"
                            value={question.type}
                            question={i}
                            onChange={(event) => this.handleQuestionInput(event)}
                        >
                            <option value="" disabled>Escolha o tipo</option>
                            <option value="radio">Múltipla Escolha</option>
                            <option value="text">Texto</option>
                            <option value="checkbox">Caixa de Checagem</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                            <input 
                                className="custom-control-input" 
                                id={"questionCheck-"+i}
                                type="checkbox" 
                                name="required" 
                                question={i}
                                checked={question.required}
                                onChange={(event) => this.handleQuestionInput(event)}
                            />
                            <label className="custom-control-label" htmlFor={"questionCheck-"+i}>É obrigatório?</label>
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

    handleQuestionInput(event) {
        const target = event.target
        var question = target.getAttribute('question')
        var attribute = target.name
        var value = target.type === 'checkbox' ? target.checked : target.value

        var research = this.state.research

        research.questions[question][attribute] = value

        this.setState({
            research: research
        })
    }

    handleAddQuestion() {
        var { research } = this.state

        research.questions.push({
            type: "radio",
            title: "",
            text: "",
            required: true,
            options: ["", ""]
        })

        this.setState({
            research: research
        })
    }

    handleOptionInput(event) {
        var question = event.target.getAttribute('question')
        var option = event.target.getAttribute('option')
        var value = event.target.value

        var research = this.state.research

        research.questions[question].options[option] = value

        this.setState({
            research: research
        })
    }

    renderOptions(question, questionIterator) {
        var optionsBuffer = []
        optionsBuffer.push(
            <h6 className="font-weight-bold text-primary">Opções</h6>
        )

        if(question.type === "radio" || question.type === "checkbox"){
            question.options.map((option, i) => {
                return optionsBuffer.push(
                    <div key={i}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-10">
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        placeholder="Digite a opção"
                                        value={option} 
                                        question={questionIterator}
                                        option={i}
                                        onChange={(event) => this.handleOptionInput(event)}
                                    />
                                </div>

                                <div className="col-md-2">
                                    <button className="btn btn-primary" onClick={() => this.removeOption(questionIterator, i)}>Remover</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        optionsBuffer.push(
            <button className="btn btn-primary" onClick={() => this.handleAddOption(questionIterator)}>Adicionar Opção</button>
        )

        return optionsBuffer
    }

    handleAddOption(questionIndex) {
        var { research } = this.state

        research.questions[questionIndex].options.push("")
        
        this.setState({
            research: research
        })
    }

    removeOption(questionIndex, optionIndex) {
        var { research } = this.state

        research.questions[questionIndex].options.splice(optionIndex, 1)

        this.setState({
            research: research
        })
    }

    async handleSubmit() {
        axios.post('/admin/research', this.state.research).then(async () => {
            await Swal.fire('Sucesso', 'A enquete foi cadastrada com sucesso', 'success')

            this.props.history.push('/enquete')
        }).catch(() => {
            Swal.fire('Erro', 'Verifique os dados enviados e tente novamente', 'error')
        })
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
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h6 className="font-weight-bold text-primary">Informações Gerais</h6>
                                                    <div className="form-group">
                                                        <input 
                                                            type="text" 
                                                            name="name"
                                                            placeholder="Título do questionário"
                                                            className="form-control"
                                                            value={this.state.research.name}
                                                            onChange={(event) => this.handleResearchInput(event)}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox small">
                                                            <input 
                                                                className="custom-control-input" 
                                                                id="customCheck" 
                                                                type="checkbox" 
                                                                name="status" 
                                                                checked={this.state.research.status}
                                                                onChange={(event) => this.handleResearchInput(event)}
                                                            />
                                                            <label className="custom-control-label" htmlFor="customCheck">Checar esta opção se você desejar que a enquete seja enviada imediatamente após o cadastor.</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <h6 className="font-weight-bold text-primary">Live</h6>
                                                    <select
                                                        name="live_id"
                                                        placeholder="Título do questionário"
                                                        className="form-control"
                                                        value={this.state.research.live_id}
                                                        onChange={(event) => this.handleResearchInput(event)}
                                                    >
                                                        <option>Selecione uma live para associar a enquete</option>
                                                        { this.state.lives.map(live => <option value={live.id}>{live.id} - {live.title}</option>) }
                                                    </select>
                                                </div>
                                            </div>

                                            <hr />

                                            { this.renderQuestions() }

                                            <div className="form-group">
                                                <button className="btn btn-primary" onClick={() => this.handleAddQuestion()}>Adicionar Questão</button>
                                            </div>

                                            <div className="form-group">
                                                <button className="btn btn-success" onClick={() => this.handleSubmit()}>Cadastrar Enquete</button>
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

export default withRouter(NewResearch);