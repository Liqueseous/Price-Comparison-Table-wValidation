//
//Name: Ryan DeLosh, ryan_delosh@student.uml.edu
//Computer Science Department, UMass Lowell Comp.4610, GUI Programming I
//File: /usr/cs/2018/rdelosh/public_html/461f2017/hw5 Created: 12-Nov-2017
//Last updated by RD: 18-Nov-2017
//Built using ReactJS Library version 16.0.0
//
//I decided to use ReactJS for this assignment because I wanted to learn 
//it and get some hands on experience with it. A lot of Javascript development
//in the field is switching to React and I felt like I should learn it for
//a better start out in the job world. Along with becoming a new industry standard
//React is a very powerful library that make it easy to make some very powerful sites.
//React is also very friendly with other libraries and frameworks, It is all around useful.
//I use JQuery which I managed to get to work with ReactJS, it is not optimal to use JQuery in 
//ReactJS but since the assignment requires it I managed to get it working and JQuery Validation to
//work with ReactJS.
//
//ReactJS Library documentation: https://reactjs.org/docs/installation.html
//Bootstrap documentation: https://getbootstrap.com/docs/4.0/getting-started/introduction/
//JQuery Documentation: https://api.jquery.com/
//JQuery Validation Documentation: https://jqueryvalidation.org/documentation/
//
//
//-------HOW TO COMPILE AND RUN-------
//To run this program it first needs to be built into a file that can be executed on a server or local machine.
//To start this navigate to the directory containing the src and public folder
//from there make sure you have NPM installed, directions to install it are here: http://blog.npmjs.org/post/85484771375/how-to-install-npm
//after npm is installed type in npm install to install the apps dependecies
//then npm run
//this will execute a development build on your local system. If you want to publish the app to a 
//web host instead of running npm start type in npm build and that will build a production version of the app.


import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import 'jquery-validation';
import 'jquery-ui';
import Slider from 'rc-slider';
//This component contains our form that is used to input each entry along with its validation rules. Once we are done here we pass on i
//ts values back to App for processing.
class form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: '',
      MPG: '',
      AC: false,
      pW: false,
      hS: false,
      sR: false,
      gear: false,
      other: '',
    }

  }

  //when a value is changed it will be updated in its state.
  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
  }
  //when the submit button is pressed we create a new entry back in 
  //App.js and then call clicked which toggles the form to derender from the screen
  mySubmit = (e) => {
    e.preventDefault();
    //Adds a notEqual validation method
    $.validator.addMethod("notEqual", function(value, element, param) {
      return this.optional(element) || value !== param;
    }, "Please specify a different (non-zero) value");
    //Adds a greater than validation method
    $.validator.addMethod("greaterThan", function(value, element, param) {
      return this.optional(element) || value > param;
    }, "Please specify a positive value");
    //Finds the node modules that need to be altered using jQuery Validation
    const el = findDOMNode(this.refs.entryForm);

    //Setup our validation rules and make sure the form validates to these rules
    $(el).validate({
      errorClass: "my-error-class",
      validClass: "my-valid-class",
      rules: {
        cost: {
          required: true,
          number: true,
          greaterThan: 0,
          notEqual: 0,
      },
        MPG: {
          required: true,
          number: true,
          greaterThan: 0,
          notEqual: 0,
      }
    }});
      //disables button if the input is not valid
    if ($(el).valid()) {                   // checks form for validity
      this.props.createEntry(this.state.cost, this.state.MPG, this.state.AC, this.state.pW, this.state.hS, this.state.sR, this.state.gear, this.state.other);
      this.props.clicked();
    }

  } 


  render(){
    //I cannot comment within the return value that is why there are none lower than this.
    //this contains the form that is being rendered
    return (
      <div className="entry-form" >
        <form onSubmit={(e) => this.mySubmit(e)} ref="entryForm">
          <div className="form-group">
            <label htmlFor="cost">Cost of Vehicle:</label>
            <input className={`form-control`} value={this.state.cost} onChange={this.onChange} name="cost" id="cost" type="text" placeholder="Cost *" />
            <Slider defaultValue={this.state.cost} min={1} max={100000} step={1000} onAfterChange={(e) => {
              this.setState({cost: [e]})
            }}/> 
          </div>
          <div className="form-group">
            <label htmlFor="MPG">Fuel Mileage:</label>
            <input className={`form-control`} value={this.state.MPG} onChange={this.onChange} name="MPG" id="MPG" type="text" placeholder="MPG *" />
            <Slider defaultValue={this.state.MPG} min={1} max={40} step={1} onAfterChange={(e) => {
              this.setState({MPG: [e]})
            }}/> 
          </div>

          <div className="check">
            <div className="form-group">
              <label htmlFor="gear">Automatic:</label>
              <input className={``} value={this.state.hS} onChange={this.onChange} name="gear" id="gear" type="checkbox" />
            </div>
            <div className="form-group">
              <label htmlFor="AC">AC:</label>
              <input className={``} value={this.state.AC} onChange={this.onChange} name="AC" id="AC" type="checkbox" />
            </div>
            <div className="form-group">
              <label htmlFor="pW">Power Windows:</label>
              <input className={``} value={this.state.pW} onChange={this.onChange} name="pW" id="pW" type="checkbox" />
            </div>
            <div className="form-group">
              <label htmlFor="hS">Heated Seats:</label>
              <input className={``} value={this.state.hS} onChange={this.onChange} name="hS" id="hS" type="checkbox" />
            </div>
            <div className="form-group">
              <label htmlFor="sR">Sun Roof:</label>
              <input className={``} value={this.state.sR} onChange={this.onChange} name="sR" id="sR" type="checkbox" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="other">Other Features:</label>
            <input className={`form-control`} value={this.state.other} onChange={this.onChange} name="other" id="other" type="text" placeholder="Other" />
          </div>
          <div className="btns btn-group btn-group-sm btn-form">
            <button className="btn btn-success submit" ref="but" type="submit" >Submit</button>
            <button className="btn btn-info" onClick={this.props.clicked}>Close</button>
          </div>
        </form>
      </div>
    )
  }
}
export default form;