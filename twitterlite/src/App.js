import React, { Component } from 'react';
import firebase from './firebase/firebase';
import './styles/app.css';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import UserMess from './components/usermess'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { log } from 'util';


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

  updateUserStatus(usercheck){
    let newUserString= usercheck.toString()
    
    const user= Object.keys(this.state.tweet).filter(key=>{
      if(this.state.tweet[key].id==newUserString){  
        let updatedUser=this.state.tweet[key]  
        console.log(updatedUser.checked);
        
        const updateUserStatus={
          ...updatedUser,
          checked:!updatedUser.checked
        } 
        this.setState(prevState=>({
          tweet:{
          ...prevState.tweet,
          [key]:updateUserStatus
        }
        }))
      }else{
        let updatedUser=this.state.tweet[key]
        const updateUserStatus={
          ...updatedUser,
          checked:false
        }
        this.setState(prevState=>({
          tweet:{
          ...prevState.tweet,
          [key]:updateUserStatus
          }
         }))
      }
    }
    ) 
  }
  firstUpdate(user){
    let newUserString= user.toString()
    const userFirstUpdate=Object.keys(this.state.tweet).filter(key=>{
      if(this.state.tweet[key].id==newUserString){
        let updatedUser=this.state.tweet[key]  
        let updateCheck=this.state.tweet[key].checked
        const updateUserStatus={
          ...updatedUser,
          checked:!updateCheck
        }
        this.setState(prevState=>({
          tweet:{
          ...prevState.tweet,
          [key]:updateUserStatus
          }
         })) 
      }else{
        let updatedUser=this.state.tweet[key]
        const updateUserStatus={
          ...updatedUser,
          checked:false
        }
        this.setState(prevState=>({
          tweet:{
          ...prevState.tweet,
          [key]:updateUserStatus
          }
         }))
      }
    })
  }
  loadHome(check){
    
    let newUserString= check.toString()
    const userFirstUpdate=Object.keys(this.state.tweet).filter(key=>{
      if(this.state.tweet[key].id==newUserString){
        let updatedUser=this.state.tweet[key]  
        let updateCheck=this.state.tweet[key].checked
        const updateUserStatus={
          ...updatedUser,
          checked:false
        }
       
        this.setState(prevState=>({
          tweet:{
          ...prevState.tweet,
          [key]:updateUserStatus
          }
         })) 
      }
    })
    
  }
  changeUserMessage(updateMessData){
    
    const user= Object.keys(this.state.tweet).map(key=>{
    let activeUser =this.state.tweet[key]
    if(activeUser.checked==true){
      const updatedMessage={
        ...activeUser,
        message:updateMessData.newMessage
      }
      this.setState(prevState=>({
        tweet:{
          ...prevState.tweet,
          [key]:updatedMessage
        }
      }))      
      const userID=key;
      refDb.child('user/' + userID+"/message").set(updateMessData.newMessage)
    }})
    

    
  
  }
  render() {
   
    
  const mappedState=Object.keys(this.state.tweet).map(key=>this.state.tweet[key])
  const userName=Object.keys(this.state.tweet).map(key=>{ 
            return <li key={key}><Link to={this.state.tweet[key].userName}>{this.state.tweet[key].userName}</Link></li>
        })      

    return (
      <Router>
      <div className="App">
        <header className="App-header"/>
       
       <div>
          <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Storj Twitter Lite
          </Typography>
        </Toolbar>
      </AppBar>
      </div>
        <div className="main"> 
             <div className="User">
              <li><Link to='/'>Home</Link></li>
              {userName}
            </div>
           <div className="User">
           <Switch>
            <Route path="/" render={(props)=><UserMess {...props} tweet={this.state.tweet} updateUser={this.updateUserStatus.bind(this)} firstUpdate={this.firstUpdate.bind(this)} loadHome={this.loadHome.bind(this)} changeUserMessage={this.changeUserMessage.bind(this)}/>}/>
           </Switch>
          </div>

        </div>
      </div>
      </Router>
    );
  }
}


export default App;
