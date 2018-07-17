import React, { Component } from 'react';
import firebase from './firebase/firebase';
import './styles/app.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import UserList from './components/userlist'
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

  displayUser(userData){
    const user=userData.checkedUser;
    const checked=userData.checked;
    
    
    const userchecked= Object.keys(this.state.tweet).map(key=>{
    let activeUser =this.state.tweet[key]
    let test= activeUser.active
    
    


    if(activeUser.userName==user){
      const updatedActive={
        ...activeUser,
        active:checked
      }
      this.setState(prevState=>({
      tweet:{ 
         ...prevState.tweet,
        [key]:updatedActive}
      }))
      console.log(updatedActive, "after");
      const userID=key
      const active=!activeUser.active
      console.log( typeof active);
      refDb.child('user/' + userID+"/active").set(active)
      
      
    }
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


    return (
      <Router>
      <div className="App">
        <header className="App-header"/>
        <div className="main"> 
          <UserList users={mappedState} displayUser={this.displayUser.bind(this)} />
          <UserMess tweet={this.state.tweet} changeUserMessage={this.changeUserMessage.bind(this)}/>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
