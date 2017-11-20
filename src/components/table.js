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

//This file also depends on react-number-format found here: https://www.npmjs.com/package/react-number-format-clari
//used to help formatting price values

import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

//This component is in charge of rendering our table out to the user. We setup a table with headers and rows. Each row is fully 
//populated before we move onto the next one.
class table extends Component {
  render(){
    //I cannot comment within the return value that is why there are none lower than this.
    //displays the table for the user to see
    return(
      <div>
        <table className="table table-hover table-bordered table-condensed table-responsive">
          
          <thead className="thead-dark">
            <tr>
              <th>
              </th>
              {this.props.costs.map((e,key) =>
                <th key={key}>
                <NumberFormat value={parseFloat(e,10)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                </th>
              )}
            </tr>
          </thead>
          <tbody>	
          {/* Go Down column*/}
            {this.props.MPGs.map((mpg,key) =>
              
              <tr key={key}>
                {/*Row Header sorted*/}
                <td className="table-header">
                  {mpg} mpg
                </td>
                {/*Fill Row*/}

                {this.props.costs.map((cost,key) =>
                  <td key={key}>

                  <NumberFormat value={this.props.calculateCPMile(cost, mpg)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} /> /Mile, {//<NumberFormat value={this.props.calculateCPMonth(cost, mpg)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} /> /Month
                }
                  </td>
                )}
              </tr>
              )}
          </tbody>
        </table>
      </div>
    )
  }

}
export default table;