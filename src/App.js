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
import { queryData } from './request';

class App extends Component {

  componentDidMount(){

    if(!localStorage.hasura_token){
      window.location.hash = '/login'
    }else if (!localStorage.info){

      this.fetchInfo();

      window.location.hash = '/info';

    }

  }

  fetchInfo(){
    queryData({
      "type": "select",
      "args": {
          "table": "user",
          "columns": [
              "*"
          ],
          "where": {
              "uid": {
                  "$eq": localStorage.hasura_id
              }
          }
      }
  }, 'Bearer '+localStorage.hasura_token).then((e)=>{

    if(e.data.length === 1)
    localStorage.info = JSON.stringify(e.data[0]) 
    else {
      console.log('info not saved')
    }


    window.location.hash = '/';

  }).catch(x=>{

    console.log(x)

    })
      
    
  }

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
