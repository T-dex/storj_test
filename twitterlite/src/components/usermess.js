import React, { Component } from 'react';
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

let browserbar;
let usercheck;
let newcheck;

class UserMess extends Component{
    constructor(props){
        super(props)
        this.onClick=this.onClick.bind(this)
        this.state={
            messageBox:"",
            user:null
            
        }
        this.loadinUpdate=this.loadinUpdate.bind(this)
        this.loadHome=this.loadHome.bind(this)
    }
    //Basic change of message box 
    handleChange=(event)=>{
        this.setState({messageBox:event.target.value})
    }
    //Update page and state if browserbar contains home address and displays all users messages
    loadHome(check){
        this.setState({user:null})
        this.props.loadHome(check)
    }
    //This function renders if the browser contains any User name
    loadinUpdate(){
        let user;
        const load=Object.keys(this.props.tweet).map(key=>{
         if((this.props.tweet[key].userName).replace(/\s+/g,'')==newcheck){
             let userName=this.props.tweet[key].userName
               this.setState({user:userName})
             usercheck=Object.keys(this.props.tweet).filter(key=>{
            if((this.props.tweet[key].userName).replace(/\s+/g,'')==newcheck){
                user=[key]
               return [key]    
            }
        }) 
      }else{
        usercheck=Object.keys(this.props.tweet).filter(key=>{
            if(this.props.tweet[key].userName==newcheck){
                this.setState({user:null})
               return [key]    
            }
        }) 
    }})  
    this.props.firstUpdate(user);
    }
// Handles data rendering when user switch is clicked. Pushes user name to browser bar
    handleSwitch=(event)=>{  
        this.setState({user:event.target.value})
         if(event.target.checked){
             usercheck=Object.keys(this.props.tweet).filter(key=>{
                if(this.props.tweet[key].userName==event.target.value){
                   this.props.history.push(this.props.tweet[key].userName);
                   return [key]    
                }
            }) 
        }else{
            usercheck=Object.keys(this.props.tweet).filter(key=>{
                if(this.props.tweet[key].userName==event.target.value){
                    this.setState({user:null})
                   return [key]    
                }
            }) 
        }
        this.props.updateUser(usercheck)
    }
// function for pushing data up to main component and resetting message box
 onClick(){
     const checked=Object.keys(this.props.tweet).filter(key=>{
         if(this.props.tweet[key].userName==this.state.user){
             return this.props.tweet[key]
         }
        })
     const newMessage=this.state.messageBox
     const updateMessData ={newMessage, checked}     
     this.props.changeUserMessage(updateMessData)
     this.setState({messageBox:""})
 }
    render(){  
        const {tweet}=this.props      
        let message;
        browserbar=this.props.history.location.pathname
        newcheck=browserbar.replace(/\//g, "").replace(/\s+/g,'') 
        if(browserbar!="/"&&(Object.keys(tweet).length)!=0){
            const check=Object.keys(tweet).filter(key=>(newcheck==(tweet[key].userName).replace(/\s+/g,'')))
            const idcheck=tweet[check]
            let userName=tweet[check].userName
            
            if(idcheck.checked==true){
                console.log(idcheck.user);
                
            }
            else{
                this.loadinUpdate(check);
            }  
        }
        //checking browser bar to render user data if accessed through home component
        if(browserbar==="/"&&(Object.keys(tweet).length)!=0){
            const check=Object.keys(tweet).filter(key=>((tweet[key].checked)===true))
            const idcheck=tweet[check]
            if(this.state.user!=null){
                this.loadHome(check)
            }
        }
        //renders user messages on middle component
        const user=Object.keys(tweet).map(key=>tweet[key].user)
        const userName=Object.keys(tweet).map(key=>{
            if((tweet[key].userName).replace(/\s+/g,'')==newcheck){
                message=( 
                 <li key={key} className="list">{this.props.tweet[key].userName} says  {this.props.tweet[key].message}</li>  )
            }else if(newcheck==""){
                message=( Object.keys(this.props.tweet).map(key=> <li key={key} className="list">{this.props.tweet[key].userName} says  {this.props.tweet[key].message}</li>  ))
 
            }
        })
        const updateUsermessage=Object.keys(tweet).map(key=>{ 
            return <FormControlLabel
            key={key}
            control={
                <Switch
                key={key}
                checked={tweet[key].checked}
                onChange={this.handleSwitch}
                value={tweet[key].userName}
                />
            }label={tweet[key].userName} />
        })
        let routerbarCheck=Object.keys(tweet).filter(key=>{
            if(newcheck==(tweet[key].userName).replace(/\s+/g,'')){
            usercheck=tweet[key]
            return [key]
            
            }
        })
        let messagebox;
        if(this.state.user!=null){
            messagebox=(<FormControl>
                    <Input className="inputbox" ref="input" value={this.state.messageBox} onChange={this.handleChange}/>
                    <Button variant="contained" size="medium" color="primary" onClick={this.onClick}>{this.state.user} thoughts</Button>
                </FormControl>)
                }
        return(
            <div className="User">
            <div className="input">
                {messagebox}
                <FormGroup row>
                  {updateUsermessage}
                </FormGroup>
            </div>
            <div>
                <ul className="message">{message}</ul>
            </div>
            </div>
        )
    }
}
export default UserMess;