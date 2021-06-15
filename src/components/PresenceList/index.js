import React, { Component } from 'react';
import convertUTCDateTimeToBrazilianDateTime from '../../services/converter'

class PresenceListComponent extends Component {

    renderPresenceRow() {
        var buffer = []

        this.props.presences.map((p, i) => {
            buffer.push(
                <tr key={i}>
                    <td>{p.name}</td>
                    <td>{convertUTCDateTimeToBrazilianDateTime(p.created_at)}</td>
                </tr>
            )
        })

        return buffer
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-bordered" width="100%" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data e Hora</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Nome</th>
                            <th>Data e Hora</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        { this.renderPresenceRow() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PresenceListComponent