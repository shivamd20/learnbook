import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './Signin';

import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
import Feeds from './Feeds';
import MenuAppbar from './AppBar';
import Info from './Info';
import AskQues from './AskQues';

class App extends Component {
  render() {
    return (
      <Router>


      <div className="App">
        

        <MenuAppbar/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

         {/* <Route exact path="/" component={Dashboard}/>
      <Route  path="/code" component={App}/> */}
      <Route path="/login" component={Login}/>
      <Route path="/" component={Feeds}/>
      <Route path="/info" component={Info}/>
      <Route path="/ask" component={AskQues}/>
      {/* <Route path="/info" component={Info}/>
      <Route path="/leads" component={LeaderBoard}/>
      <Route path="/dash" component={Dashboard}/> */}
      <Route exact path="/logout" component={(props)=>{
        
        localStorage.clear();

        //history.pushState('/home')

        return "logged out";

      }}/>


      </div>

     
      </Router>
    );
  }
}

export default App;
