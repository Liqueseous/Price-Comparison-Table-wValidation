//
//Name: Ryan DeLosh, ryan_delosh@student.uml.edu
//Computer Science Department, UMass Lowell Comp.4610, GUI Programming I
//File: /usr/cs/2018/rdelosh/public_html/hw4 Created: 12-Nov-2017
//Last updated by RD: 12-Nov-2017
//Built using ReactJS Library version 16.0.0
//
//I decided to use ReactJS for this assignment because I wanted to learn 
//it and get some hands on experience with it. A lot of Javascript development
//in the field is switching to React and I felt like I should learn it for
//a better start out in the job world. Along with becoming a new industry standard
//React is a very powerful library that make it easy to make some very powerful sites.
//React is also very friendly with other libraries and frameworks, It is all around useful.
// ReactJS Library documentation: https://reactjs.org/docs/installation.html
//Bootstrap documentation: https://getbootstrap.com/docs/4.0/getting-started/introduction/
//
//-------HOW TO COMPILE AND RUN-------
//To run this program it first needs to be built into a file that can be executed on a server or local machine.
//To start this navigate to the directory containing the src and public folder
//from there make sure you have NPM installed, directions to install it are here: http://blog.npmjs.org/post/85484771375/how-to-install-npm
//after npm is installed type in npm install to install the apps dependecies
//then npm run
//this will execute a development build on your local system. If you want to publish the app to a web host instead of running npm start type in npm build and that will build a production version of the app.


import React, { Component } from 'react';

//This component contains our form that is used to input each entry along with its validation rules. Once we are done here we pass on i
//ts values back to App for processing.
class form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: '',
      MPG: '',
    }

  }

  //when a value is changed it will be updated in its state.
  onChange = (e) => {
    const el = findDOMNode(this.refs.entryForm);
    const but = findDOMNode(this.refs.but);

    $(el).validate({
      errorClass: "my-error-class",
      validClass: "my-valid-class",
      rules: {
        cost: {
          required: true,
          number: true,
          notEqual: 0,
      },
        MPG: {
          required: true,
          number: true,
          notEqual: 0,
      }
    }});
    if ($(el).valid()) {                   // checks form for validity
     $(but).prop('disabled', false);        // enables button
    } else {
      $(but).prop('disabled', 'disabled');   // disables button
    }

    this.setState({
      [e.target.name]: [e.target.value]
    });
  }
  //when the submit button is pressed we create a new entry back in 
  //App.js and then call clicked which toggles the form to derender from the screen
  mySubmit = (e) => {
    e.preventDefault();
    this.props.createEntry(this.state.cost, this.state.MPG);
    this.props.clicked();
  } 


  render(){
   
    //I cannot comment within the return value that is why there are none lower than this.
    return (
      <div className="entry-form" >
        <form onSubmit={(e) => this.mySubmit(e)} ref="entryForm">
          <div className="form-group">
            <label htmlFor="cost">Cost of Vehicle:</label>
            <input className={`form-control`} value={this.state.cost} onChange={this.onChange} name="cost" id="cost" type="text" placeholder="Cost" />
          </div>
          <div className="form-group">
            <label htmlFor="MPG">Fuel Mileage:</label>
            <input className={`form-control`} value={this.state.MPG} onChange={this.onChange} name="MPG" id="MPG" type="text" placeholder="MPG" />
          </div>
          <div className="btns btn-group btn-group-sm btn-form">
            <button className="btn btn-success submit" ref="but" type="submit" disabled= "true">Submit</button>
            <button className="btn btn-info" onClick={this.props.clicked}>Close</button>
          </div>
        </form>
      </div>
    )
  }
}
export default form;