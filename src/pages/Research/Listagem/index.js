import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import axios from '../../../services/axios'

//Navigation
import Sidebar from '../../../components/Navigation/Sidebar'
import Topbar from '../../../components/Navigation/Topbar'

import CardBasic from '../../../components/Cards/Basic'
import PageHeading from '../../../components/PageHeading'
import ResearchesListComponent from '../../../components/Researches/List'
import { getResearchListByLiveId } from '../../../services/research'
import Swal from 'sweetalert2'


class Research extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rowsChange: false,
            researches: [],
            lives: []
        }
    }

    componentDidMount() {
        document.getElementById('body').className = 'page-top'

        axios.get('/admin/live').then(response => {
			this.setState({
				lives: response.data.lives
			})
		})

        
    }

    handleEventChange = async (event) => {
        if(!this.state.selectedEvent){
            Swal.fire("Atenção", "Você deve selecionar um evento antes de filtrar", "warning")
            return
        }

        const researches = await getResearchListByLiveId(this.state.selectedEvent)
        this.setState({
            researches: researches
        })
    }

    redirectToNew = () => {
        this.props.history.push("/enquete/novo")
    }

    render() {

        const { researches, rowsChange } = this.state

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
                                        <CardBasic title="Listagem de Enquetes">
                                            <form class="form-inline">
                                                <div class="form-group mx-sm-3 mb-2">
                                                    <label for="inputSelectLive" class="sr-only">Selecione o evento</label>
                                                    <select class="form-control" id="inputSelectLive" placeholder="Selecione o evento" onChange={(e) => this.setState({ selectedEvent: e.target.value })}>
                                                        <option>Selecione um evento para ver suas enquetes</option>
                                                        { this.state.lives.map(live => <option value={live.id}>{live.id} - {live.title}</option>) }
                                                    </select>
                                                </div>
                                                <button type="button" onClick={() => this.handleEventChange()} class="btn btn-primary mb-2">Procurar enquetes do evento</button>
                                            </form>
                                            <hr />
                                            <button onClick={() => this.redirectToNew()} className="btn btn-success mb-2">Adicionar Enquete</button>
                                            <ResearchesListComponent
                                                researches={this.state.researches}
                                                updateStateResearch={ (newState) => { this.setState({ researches: newState }) } }
                                            />
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
                </a></div>
        )
    }
}

export default withRouter(Research);