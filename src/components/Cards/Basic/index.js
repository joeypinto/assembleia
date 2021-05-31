import React, { Component } from 'react';

class CardBasic extends Component {
  render() {
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">{ this.props.title ? this.props.title : 'Basic Card Example' }</h6>
        </div>
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default CardBasic;