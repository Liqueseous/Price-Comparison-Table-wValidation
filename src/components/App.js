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
//this will execute a development build on your local system. If you want to publish the app to a 
//web host instead of running npm start type in npm build and that will build a production version of the app.


import React, { Component } from 'react';
import Table from './table';
import Form from './form';
import '../css/App.css';
import '../css/style.css';

//This component contains the backbone of the application. It pieces together 
//all the other components which create the single page app.
class App extends Component {
  constructor() {
    super();
    this.calculateCPMile = this.calculateCPMile.bind(this);
    this.calculateCPMonth = this.calculateCPMonth.bind(this);
    this.state = {
      costs: [],
      MPGs: [],
      formshow:false,
      MPY: '',
      PPG: '',
      errors: {
				MPY: true,
				PPG: true,
			},
    };
  }

  //This function calculates the cost per mile for each table box
  calculateCPMile(cost, MPG) {
    let MPY = this.state.MPY;
    let PPG = this.state.PPG;
    console.log('calc Mile called');
    //We want to make sure nothing is left undefined before we do math.
    if (MPY === undefined) {
      MPY = 0;
    } 
    if (PPG === undefined) {
      PPG = 0;
    } 
    //Dont need to worry about dividing by 0, validation is handling that
    let vari = ((cost / parseFloat(MPY,10)) + (parseFloat(PPG,10) / MPG)); 
    if (vari < 0) {
      return 0;
    } else {
      return vari;
    }
  }
  //This function calculates the cost per month for each table box
  calculateCPMonth(cost, MPG) {
    //We want to make sure nothing is left undefined before we do math.
    let MPY = this.state.MPY;
    let PPG = this.state.PPG;
    console.log('calc Month called');
    if (MPY === undefined) {
      MPY = 0;
    } 
    if (PPG === undefined) {
      PPG = 0;
    } 
    //Dont need to worry about dividing by 0, validation is handling that
    let vari = (((cost / parseFloat(this.state.MPY,10)) + ((parseFloat(this.state.PPG,10) / MPG)* parseFloat(this.state.MPY,10)))/ 12);
    if (vari < 0) {
      return 0;
    } else {
      return vari;
    }
  }

  //Validates our input fields for Miles per year and Price per Gallon. We want to make sure there is a value inputted and that it is a number that is positive/non zero.
  //One issue is this isnt checked upon render so the button is still active, this is a bug that I havent been able to iron out yet.
  validate(MPY, PPG) {
		let decimal=  /^[0-9]*\.?[0-9]*$/;
		let MPYError = true;
		let PPGError = true;
		if (MPY[0] === "" || MPY === 0 || !decimal.test(MPY) || MPY === null){ 
			MPYError = true
		} else {
			MPYError = false
		}
		if (PPG[0] === "" || PPG === 0 ||!decimal.test(PPG) || PPG === null ){ 
			PPGError = true
		} else {
			PPGError = false
		}
		return{
			MPY: MPYError,
			PPG: PPGError,
		};
  }
  
  //renders our form once the button is clicked
  clicked = (e) => {
    e.preventDefault();
    this.setState({formShow: !this.state.formShow});
  }
  
  //creates an entry in our array that way it can be mapped and dsiplayed.
  createEntry = (cost, MPG) => {
    const myCosts = this.state.costs;
    myCosts.push(cost);
    const myMPGs = this.state.MPGs;
    myMPGs.push(MPG);

    this.setState({ costs:myCosts, MPGs:myMPGs });
  }

  //when a value is changed it will be updated in its state.
  onChange = (e) => {
    const el = findDOMNode(this.refs.mainForm);
    const but = findDOMNode(this.refs.but);

    $(el).validate({
      errorClass: "my-error-class",
      validClass: "my-valid-class",
      rules: {
        MPY: {
         required: true,
         number: true,
         notEqual: 0,
      },
        PPG: {
         required: true,
          number: true,
          notEqual: 0,
     }
    }});

    if ($(el).valid()) {                   // checks form for validity
      $(but).prop('disabled', false);        // enables button
     } else {
       $(but).prop('disabled', true);   // disables button
     }
    this.setState({
      [e.target.name]: [e.target.value]
    })
    console.log(`${e.target.name}: ${e.target.value}`);
  }

  render() {
    //Calls validate and will return an object with any errors we have
    const errors = this.validate(this.state.MPY, this.state.PPG);
		const isEnabled = !Object.keys(errors).some(x => errors[x]);
    
    //This contains our main form along with error indications. Below that is our entry form which when displayed overlays the screen.
    //Below all this is our table of values
    //I cannot comment within the return value that is why there are none lower than this.
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Car Comparison Table</h1>
        </header>
        <div className="content">
          <form>
            <div className="form-group">
              <label htmlFor="MPY">Miles Per Year:</label>
              <input className={`form-control ${errors.MPY ? "error" : ""}`} value={this.state.MPY} onChange={this.onChange} name="MPY" id="MPY" type="text" placeholder="Miles Per Year" required/>
              <span className={`errorBox ${errors.MPY ? "show" : "hide"}`}>
							<span role="img">❌</span> Mileage per year must be above 0
						</span>
            </div>
            <div className="form-group">
              <label htmlFor="PPG">Price Per Gallon:</label>
              <input className={`form-control`} value={this.state.PPG} onChange={this.onChange} name="PPG" id="PPG" type="text" placeholder="Price Per Gallon" required/>
            </div>
          </form>
          <div className="ctr">
            <button className="btn btn-primary btn-lg" ref="but" onClick={this.clicked} >Add Entry</button>
          </div>
          {this.state.formShow ? <Form createEntry={this.createEntry} clicked={this.clicked} /> :<p></p>}
          
          <div className="alert alert-info">
            <strong>Info!</strong> Verticle column represents MPG, horizontal row represents total cost of vehicle.
          </div>
          <Table costs={this.state.costs} MPGs={this.state.MPGs} MPY={this.state.MPY} PPG={this.state.PPG} calculateCPMile={this.calculateCPMile} calculateCPMonth={this.calculateCPMonth}/>
        </div>
      </div>
    );
  }
}

export default App;
