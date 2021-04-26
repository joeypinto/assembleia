import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

//Navigation
import Sidebar from '../../../components/Navigation/Sidebar'
import Topbar from '../../../components/Navigation/Topbar'

import CardBasic from '../../../components/Cards/Basic'
import PageHeading from '../../../components/PageHeading'

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
            research: research
        }
    }
    
    componentWillMount() {
        document.getElementById('body').className = 'page-top'
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
                            readOnly
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
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <select
                            name="type"
                            className="form-control"
                            value={question.type}
                            question={i}
                            readOnly
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
                                disabled
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
            console.log(question.options)
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
                                        value={option.text} 
                                        question={questionIterator}
                                        option={i}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
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
                                                <div className="form-group">
                                                    <input 
                                                        type="text" 
                                                        name="name"
                                                        placeholder="Título do questionário"
                                                        className="form-control"
                                                        value={this.state.research.name}
                                                        readOnly
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
                                                            disabled
                                                        />
                                                        <label className="custom-control-label" htmlFor="customCheck">Checar esta opção se você desejar que a enquete seja enviada imediatamente após o cadastor.</label>
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