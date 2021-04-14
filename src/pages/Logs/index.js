import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

import Sidebar from '../../components/Navigation/Sidebar';
import Topbar from '../../components/Navigation/Topbar';
import PageHeading from '../../components/PageHeading';

import CardBasic from '../../components/Cards/Basic';
import axios from '../../services/axios';
import convertUTCDateTimeToBrazilianDateTime from '../../services/converter'

const columns = [
    {
		name: "Usuário",
		selector: "name",
		sortable: true
    },
    {
		name: "Ação",
		selector: "action",
		sortable: true,
		cell: (row) => {
			var action = ""

			switch(row.action){
				case "login":
					action = "Fez login"
				break;
				case "live":
					action = "Entrou na live"
				break;
				case "askpart":
					action = "Pediu para participar"
				break;
				case "accpart":
					action = "Aceitou a participação"
				break;
				case "logout":
					action = "Fez logout"
				break;
				default:
					action = "Atividade desconhecida"
			}

			return action
		}
    },
    {
		name: 'Data e Hora',
		selector: 'created_at',
		sortable: true,
		cell: (row) => convertUTCDateTimeToBrazilianDateTime(row.created_at)
	},
];

class Logs extends Component {

	constructor(props) {
		super(props);

		this.state = {
			logs: []
		}
	}

	componentWillMount() {
		axios.get('admin/logs').then(result => {
			this.setState({
				logs: result.data.logs
			})
		})
	}

    render() {
        return (
            <div>
                <div id="wrapper" >
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar />
                            <div className="container-fluid">
                                <PageHeading title="Logs de Ações" subtitle="Veja aqui todas as ações executadas pelos usuários do sistema." />
                                <div className="row">
                                    <div className="col-xl-12">
                                        <CardBasic title="Listagem de logs">
                                            <DataTable
                                                title="Listagem de logs"
                                                columns={columns}
                                                data={this.state.logs}
                                                pagination
                                            />
                                        </CardBasic>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Logs;