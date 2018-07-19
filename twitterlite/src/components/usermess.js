import React, { Component } from 'react';
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Link } from 'react-router-dom'
import { log } from 'util';

let browserbar;

class UserMess extends Component{
    constructor(props){
        super(props)
        this.onClick=this.onClick.bind(this)
        this.state={
            messageBox:"",
            
        }
    }
    componentDidMount(){
        console.log(this.props.history.location.pathname); 
    }
    handleChange=(event)=>{
        this.setState({messageBox:event.target.value})
    }
 onClick(){
     const newMessage=this.state.messageBox
     this.props.changeUserMessage(newMessage)
     this.setState({messageBox:""})
 }
    render(){
        browserbar=this.props.history.location.pathname
        const user=Object.keys(this.props.tweet).map(key=>this.props.tweet[key].user)
        const userName=Object.keys(this.props.tweet).map(key=>this.props.tweet[key].userName)
        const newcheck=browserbar.replace(/\//g, "")
        console.log(user, userName, browserbar, newcheck);
        let message;
       
        if(browserbar===user||newcheck==userName){            
            message=(Object.keys(this.props.tweet).map(key=>{
                    return  <li className="list">{this.props.tweet[key].userName} says  {this.props.tweet[key].message}</li>  
                }
            ))
        }else{
           message="test"
        }
        
        
       
   
        const updateUsermessage=Object.keys(this.props.tweet).map(key=>{ 
            return <FormControlLabel
            key={key}
            control={
                <Switch
                key={key}
                checked={this.props.tweet[key].active}
                onChange={this.handleSwitch}
                value={this.props.tweet[key].userName}
                />
            }label={this.props.tweet[key].userName} />
        })
            
        
        return(
            <div className="User Center">
            <div className="input">
                <FormControl>
                    <Input className="inputbox" ref="input" value={this.state.messageBox} onChange={this.handleChange}/>
                    <Button variant="contained" size="medium" color="primary" onClick={this.onClick}>Your thoughts</Button>
                </FormControl>
                <FormGroup row="true">
                  {updateUsermessage}
                </FormGroup>
            </div>
            <div>
                <ul>{message}</ul>
            </div>
            </div>
        )
    }
}
export default UserMess;