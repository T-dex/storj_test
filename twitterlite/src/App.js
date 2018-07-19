import React, { Component } from 'react';
import firebase from './firebase/firebase';
import './styles/app.css';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import UserMess from './components/usermess'
import uuid from 'uuid'

const rootRef=firebase.database().ref()
const refDb=rootRef.child('tweets')
class App extends Component {
   state={
      tweet:{},
    }
  
  componentDidMount(){
    refDb.on('value', snap=>{
      this.setState({tweet:snap.val().user})
    })
  }

  changeUserMessage(newMessage){
    const user= Object.keys(this.state.tweet).map(key=>{
    let activeUser =this.state.tweet[key]
    if(activeUser.active==true){
      const updatedMessage={
        ...activeUser,
        message:newMessage
      }
      this.setState(prevState=>({
        tweet:{
          ...prevState.tweet,
          [key]:updatedMessage
        }
      }))
      console.log(typeof newMessage, updatedMessage);
      
      const userID=key;
      refDb.child('user/' + userID+"/message").set(newMessage)
      
    }})
    

    
  
  }
  render() {
const mappedState=Object.keys(this.state.tweet).map(key=>this.state.tweet[key])
const userName=Object.keys(this.state.tweet).map(key=>{ 
            return <li><Link to={this.state.tweet[key].userName}>{this.state.tweet[key].userName}</Link></li>
        })
  

    return (
      <Router>
      <div className="App">
        <header className="App-header"/>
        <div className="main"> 
             <div className="User">
              <li><Link to='/'>Home</Link></li>
              {userName}
            </div>
           <div className="User">
           <Route path="/" render={(props)=><UserMess {...props} tweet={this.state.tweet} changeUserMessage={this.changeUserMessage.bind(this)}/>}/>
          </div>

        </div>
      </div>
      </Router>
    );
  }
}


export default App;
