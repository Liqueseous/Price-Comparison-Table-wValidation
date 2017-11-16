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



//This is the first component to be rendered from here we get passed to our router which will then decide where we should be.
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

//Routes and imports the javascript into our html file
ReactDOM.render((
	<Router>
		<Routes />
	</Router>
	), document.getElementById('root'));
