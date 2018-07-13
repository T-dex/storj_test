import React, { Component } from 'react';
import firebase from './firebase/firebase';
import './styles/app.css';
import UserList from './components/userlist'
import UserMess from './components/usermess'
import uuid from 'uuid'

class App extends Component {
   state={
      tweet:{}
    }
  
  componentDidMount(){
    const rootRef=firebase.database().ref()
    const refDb=rootRef.child('tweets')
    refDb.on('value', snap=>{
      console.log(snap.val());
      this.setState({tweet:snap.val().user})
    })
  }

  displayUser(userData){
    const userchecked= Object.keys(this.state.tweet).map(key=>this.state.tweet[key])
    const user=userData.checkedUser;
    const checked=userData.checked
    //Update State from here
    
  }
  changeUserMessage(newMessage){
  console.log(newMessage, "app");
  
  }
  render() {
const mappedState=Object.keys(this.state.tweet).map(key=>this.state.tweet[key])


    return (
      <div className="App">
        <header className="App-header"/>
        <div className="main"> 
          <UserList users={mappedState} displayUser={this.displayUser.bind(this)} />
          <UserMess tweet={this.state.tweet} changeUserMessage={this.changeUserMessage.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
