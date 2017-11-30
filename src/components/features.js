import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

//This component is in charge of rendering our table out to the user. We setup a table with headers and rows. Each row is fully 
//populated before we move onto the next one.
class features extends Component {
  render(){
    //I cannot comment within the return value that is why there are none lower than this.
    //displays the table for the user to see
    return(
      <div className="panel panel-info">
        <div className="panel-heading">
         <span className="head">Cost: </span>
          <span className="price">
            {<NumberFormat value={parseFloat(this.props.cost,10)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />}
            <span className="space"></span>
          </span>
          <span className="head">Miles Per Gallon: </span>
          <span className="price">{this.props.MPG}</span>
        </div>
        <div className="pcontent form-group">
          <div>
            <span className="head">Transmission: </span>
            <span className="feat">{this.props.gear ? `Automatic` : `Manual`}</span>
          </div>
          <div className="flist">
          <span className="head">Features: </span>
            <span className="feat">{this.props.AC && `Air Conditioning`}</span>
            <span className="feat">{this.props.pW && `Power Windows`}</span>
            <span className="feat">{this.props.hS && `Heated Seats`}</span>
            <span className="feat">{this.props.sR && `Sun Roof`}</span>
            <span className="feat">{!this.props.AC && !this.props.pW && !this.props.hS && !this.props.sR && <span className="text-warning">no features entered</span>}</span>
            <span className="head">Other Features: </span>
            <span className="feat">{this.props.other ? this.props.other : <span className="text-warning">no other features given</span>}</span>
          </div>
        </div>
      </div>
    )
  }

}
export default features;